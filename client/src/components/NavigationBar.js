import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';

const NavigationBar = () => {
    const navItems = ['Home', 'About', 'Contact'];
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ my: 2 }}>Grey Sloan Memorial Hospital</Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block',  flexGrow: 1  } }} marginLeft={3}>
                        <Button sx={{ color: '#fff' }}>Home</Button>
                        <Button sx={{ color: '#fff' }}>Our Doctors</Button>
                        <Button sx={{ color: '#fff' }}>About Us</Button>
                        <Button sx={{ color: '#fff' }}>Doctor Portal</Button>
                        <Button sx={{ color: '#fff' }}>Admin Portal</Button>
                    </Box>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavigationBar;