import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { deepPurple } from "@mui/material/colors";

import Copyright from '../../components/copyright/copy.component';
import SignInUpHeader from '../../components/signinup-header/signinup-header.component';

export default function Login() {
    const navigate = useNavigate();

    React.useEffect(() => {
        let loginState = localStorage.getItem("login");
        if (loginState) {
            navigate("/", { replace: true })
        }
    });

    return (
        <Grid container component="main"
            sx={{
                minHeight: '100vh',
            }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(/assets/img/bg02.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </Grid>
            <Grid item container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                xs={12} sm={8} md={5}
                component={Paper} elevation={6} square sx={{ bgcolor: deepPurple[50] }}>
                <Grid item >
                    <Box
                        sx={{
                            my: 1,
                            mx: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <SignInUpHeader />
                        <Outlet />
                    </Box>
                </Grid>
                <Grid item>
                    <Box component="footer"
                        sx={{
                            py: 3,
                            px: 2,
                            mt: 'auto',
                        }}>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}