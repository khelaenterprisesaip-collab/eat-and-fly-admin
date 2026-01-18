/**
 * Offline Invoice Storage Utility
 * Manages pending invoices that were created while offline
 */

const PENDING_INVOICES_KEY = 'pendingInvoices';

export interface PendingInvoice {
    id: string; // Temporary ID with offline_ prefix
    payload: {
        airport: string;
        dateTime: number;
        subTotal: number;
        cgstPercentage: number;
        igstPercentage: number;
        discountPercentage: number;
        discountAmount: number;
        totalAmount: number;
        status: string;
        items: Array<{
            name: string;
            quantity: number;
            perUnitPrice: number;
            totalPrice: number;
        }>;
        paymentMethod: string;
    };
    createdAt: number; // Timestamp when created offline
    syncAttempts: number; // Number of sync attempts
    lastError?: string; // Last error message if sync failed
}

/**
 * Get all pending invoices from localStorage
 */
export const getPendingInvoices = (): PendingInvoice[] => {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(PENDING_INVOICES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading pending invoices:', error);
        return [];
    }
};

/**
 * Add a new pending invoice to localStorage
 */
export const addPendingInvoice = (payload: PendingInvoice['payload']): PendingInvoice => {
    const invoices = getPendingInvoices();

    const newInvoice: PendingInvoice = {
        id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        payload,
        createdAt: Date.now(),
        syncAttempts: 0,
    };

    invoices.push(newInvoice);

    try {
        localStorage.setItem(PENDING_INVOICES_KEY, JSON.stringify(invoices));
    } catch (error) {
        console.error('Error saving pending invoice:', error);
    }

    return newInvoice;
};

/**
 * Remove a pending invoice by ID (after successful sync)
 */
export const removePendingInvoice = (id: string): void => {
    const invoices = getPendingInvoices();
    const filtered = invoices.filter((inv) => inv.id !== id);

    try {
        localStorage.setItem(PENDING_INVOICES_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Error removing pending invoice:', error);
    }
};

/**
 * Update a pending invoice (e.g., increment sync attempts, add error)
 */
export const updatePendingInvoice = (
    id: string,
    updates: Partial<Pick<PendingInvoice, 'syncAttempts' | 'lastError'>>
): void => {
    const invoices = getPendingInvoices();
    const index = invoices.findIndex((inv) => inv.id === id);

    if (index !== -1) {
        invoices[index] = { ...invoices[index], ...updates };
        try {
            localStorage.setItem(PENDING_INVOICES_KEY, JSON.stringify(invoices));
        } catch (error) {
            console.error('Error updating pending invoice:', error);
        }
    }
};

/**
 * Clear all pending invoices
 */
export const clearPendingInvoices = (): void => {
    try {
        localStorage.removeItem(PENDING_INVOICES_KEY);
    } catch (error) {
        console.error('Error clearing pending invoices:', error);
    }
};

/**
 * Get count of pending invoices
 */
export const getPendingInvoiceCount = (): number => {
    return getPendingInvoices().length;
};
