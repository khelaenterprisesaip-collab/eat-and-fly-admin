import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Stack } from '@mui/material';

export default function NotFound({ title }: any) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        // minHeight: '100vh',
        bgcolor: 'background.default',
        px: 2,
        py: 1.5,
        borderRadius: 2
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          width: '100%',
          textAlign: 'center'
        }}
      >
        {/* SVG Illustration */}
        <Box
          component="svg"
          sx={{
            width: { xs: 250, sm: 350, md: 400 },
            mx: 'auto'
          }}
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="160" fill="#EBF3FF" />
          <g transform="translate(80, 140)">
            <rect x="0" y="0" width="200" height="50" rx="8" fill="white" stroke="#4B7BF5" strokeWidth="2" />
            <circle cx="25" cy="25" r="12" fill="#4B7BF5" />
            <rect x="50" y="20" width="120" height="10" rx="2" fill="#4B7BF5" opacity="0.3" />
            <rect x="10" y="60" width="200" height="50" rx="8" fill="white" stroke="#4B7BF5" strokeWidth="2" />
            <circle cx="35" cy="85" r="12" fill="#4B7BF5" />
            <rect x="60" y="80" width="120" height="10" rx="2" fill="#4B7BF5" opacity="0.3" />
          </g>
          <g transform="translate(180, 120)">
            <circle cx="60" cy="60" r="40" stroke="#1E40AF" strokeWidth="12" fill="none" />
            <line x1="90" y1="90" x2="120" y2="120" stroke="#1E40AF" strokeWidth="12" strokeLinecap="round" />
            <rect x="110" y="110" width="20" height="12" fill="#FED7AA" transform="rotate(45 110 110)" />
          </g>
        </Box>

        {/* Main Message */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '1.3rem' }}>
          {` The ${title}  you're  looking for was not found!`}
        </Typography>

        {/* Explanation List */}
        <Stack
          sx={{
            py: 2,
            px: 3,
            borderRadius: 2,
            backgroundColor: 'transparent'
          }}
        >
          <Stack spacing={1}>
            <List disablePadding>
              <Typography variant="body1" textAlign={'left'} sx={{ py: 1, color: 'text.secondary', fontSize: '1rem' }}>
                This may mean:
              </Typography>

              <Stack ml={2}>
                <ListItem
                  disableGutters
                  sx={{
                    display: 'list-item',
                    listStyleType: 'disc',
                    pl: 2,

                    fontSize: '1rem',
                    color: 'text.primary'
                  }}
                >
                  <ListItemText
                    primary={`The ${title} was deleted`}
                    primaryTypographyProps={{ variant: 'body2', sx: { fontSize: '1rem', lineHeight: 0.5 } }}
                  />
                </ListItem>
                <ListItem
                  disableGutters
                  sx={{
                    display: 'list-item',
                    listStyleType: 'disc',
                    pl: 2,

                    fontSize: '1rem',
                    color: 'text.primary'
                  }}
                >
                  <ListItemText
                    primary="You're no longer working with the associated student"
                    primaryTypographyProps={{ variant: 'body2', sx: { fontSize: '1rem', lineHeight: 0.5 } }}
                  />
                </ListItem>
                <ListItem
                  disableGutters
                  sx={{
                    display: 'list-item',
                    listStyleType: 'disc',
                    pl: 2,
                    mb: 0.5,
                    fontSize: '1rem',
                    color: 'text.primary'
                  }}
                >
                  <ListItemText
                    primary={`You do not have permission to view the ${title}`}
                    primaryTypographyProps={{ variant: 'body2', sx: { fontSize: '1rem' } }}
                  />
                </ListItem>
              </Stack>
            </List>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
