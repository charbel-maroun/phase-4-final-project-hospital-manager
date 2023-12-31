import * as React from 'react';

import { AppBar, Box, Toolbar, Typography, Link } from '@mui/material';

// import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ my: 2 }}>Grey Sloan Memorial Hospital</Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block', flexGrow: 1 } }} marginLeft={3}>
                        <Link href='/' sx={{marginLeft: 3, color: '#fff' }}>Home</Link>
                        <Link href='/doctors' sx={{marginLeft: 3, color: '#fff' }}>Our Doctors</Link>
                        <Link href='/patients/login' sx={{marginLeft: 3, color: '#fff' }}>Patient Portal</Link>
                        <Link href='/doctors/login' sx={{marginLeft: 3, color: '#fff' }}>Doctor Portal</Link>

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavigationBar;