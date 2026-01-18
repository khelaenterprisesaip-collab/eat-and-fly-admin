import { useEffect, useRef, useCallback } from 'react';
import useNetworkStatus from './useNetwork';
import {
    getPendingInvoices,
    removePendingInvoice,
    updatePendingInvoice,
    PendingInvoice,
} from '../utils/offlineInvoiceStorage';
import { createInvoice } from '../services/invoice';
import { openSnackbar } from '../api/snackbar';

const MAX_SYNC_ATTEMPTS = 3;
const SYNC_DELAY_MS = 1000; // Delay between syncing each invoice

/**
 * Hook that monitors network status and automatically syncs pending invoices
 * when the connection is restored.
 */
const useOfflineSync = () => {
    const { isOnline } = useNetworkStatus();
    const isSyncingRef = useRef(false);
    const wasOfflineRef = useRef(false);

    const syncPendingInvoices = useCallback(async () => {
        // Prevent concurrent syncs
        if (isSyncingRef.current) return;

        const pendingInvoices = getPendingInvoices();
        if (pendingInvoices.length === 0) return;

        isSyncingRef.current = true;

        // Show syncing notification
        openSnackbar({
            open: true,
            message: `Syncing ${pendingInvoices.length} offline invoice(s)...`,
            variant: 'alert',
            alert: { color: 'info' },
        } as any);

        let successCount = 0;
        let failCount = 0;

        for (const invoice of pendingInvoices) {
            // Skip invoices that have exceeded max attempts
            if (invoice.syncAttempts >= MAX_SYNC_ATTEMPTS) {
                failCount++;
                continue;
            }

            try {
                // Sync to backend
                await createInvoice({ body: invoice.payload });

                // Remove from pending on success
                removePendingInvoice(invoice.id);
                successCount++;

                // Small delay between syncs to not overwhelm the server
                await new Promise((resolve) => setTimeout(resolve, SYNC_DELAY_MS));
            } catch (error: any) {
                // Update sync attempts and error
                updatePendingInvoice(invoice.id, {
                    syncAttempts: invoice.syncAttempts + 1,
                    lastError: error?.data?.message || 'Sync failed',
                });
                failCount++;
            }
        }

        isSyncingRef.current = false;

        // Show result notification
        if (successCount > 0) {
            openSnackbar({
                open: true,
                message: `${successCount} invoice(s) synced successfully!`,
                variant: 'alert',
                alert: { color: 'success' },
            } as any);
        }

        if (failCount > 0) {
            openSnackbar({
                open: true,
                message: `${failCount} invoice(s) failed to sync. Will retry later.`,
                variant: 'alert',
                alert: { color: 'warning' },
            } as any);
        }
    }, []);

    useEffect(() => {
        // Track offline state
        if (!isOnline) {
            wasOfflineRef.current = true;
        }

        // Sync when coming back online
        if (isOnline && wasOfflineRef.current) {
            wasOfflineRef.current = false;
            // Small delay to ensure the network is stable
            const timeoutId = setTimeout(() => {
                syncPendingInvoices();
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [isOnline, syncPendingInvoices]);

    // Also try to sync on initial load if online and there are pending invoices
    useEffect(() => {
        if (isOnline) {
            const pendingInvoices = getPendingInvoices();
            if (pendingInvoices.length > 0) {
                // Delay to let the app fully load
                const timeoutId = setTimeout(() => {
                    syncPendingInvoices();
                }, 3000);

                return () => clearTimeout(timeoutId);
            }
        }
    }, []); // Only on mount

    return {
        isOnline,
        syncPendingInvoices, // Expose for manual sync if needed
    };
};

export default useOfflineSync;
