import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import MuiAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import People from '@mui/icons-material/People';
import Logout from '@mui/icons-material/Logout';
import Skeleton from '@mui/material/Skeleton';

import { useAuth } from '../../utils/auth';

import { showBackdrop, hideBackdrop } from '../../services/snackbar.service';

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectUsersInSession, selectQuantityUsersInChat, } from "../../redux/users/userDetailSlice";
import { selectScrollBlock, toggleBlock } from '../../redux/messages/messagesSlice';
import { toggleUserDialog } from '../../redux/info/infoSlice';


export default function AppBar() {

    const auth = useAuth();
    const dispatch = useAppDispatch();
    const userInSession = useAppSelector(selectUsersInSession);
    const scrollBlock = useAppSelector(selectScrollBlock);
    const quantityUsersInChat = useAppSelector(selectQuantityUsersInChat);

    const navigate = useNavigate();

    const toongleScroll = () => {
        dispatch(toggleBlock());
    }

    const userLogoutHandler = () => {
        showBackdrop();
        auth?.signout(() => {
            navigate("/login/signin");
            hideBackdrop();
        });
    }

    const openUsersDialog = () => {
        dispatch(toggleUserDialog());
    }

    const createAvatar = () => {
        if (userInSession) {
            let userName: string = userInSession.username;
            return userInSession.picUrl
                ? <Avatar src={userInSession?.picUrl} imgProps={{ referrerPolicy: "no-referrer" }} alt={userName + '_image'} />
                : <Avatar>{userName.charAt(0).toUpperCase()}</Avatar>
        } else return <Skeleton variant="circular"><Avatar /></Skeleton>
    }

    return (
        <Box>
            <MuiAppBar position="static">
                <Toolbar>
                    <Box sx={{ display: { xs: 'flex' } }}>
                        <Stack direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={2}>
                            {createAvatar()}
                            <Typography variant='h5'>{userInSession?.username}</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={toongleScroll}>
                            {scrollBlock ? <Lock /> : <LockOpen />}
                        </IconButton>
                        <IconButton size="large" aria-label="show users" color="inherit" onClick={openUsersDialog}>
                            <Badge color='error' badgeContent={quantityUsersInChat < 100 ? "" + quantityUsersInChat : "+99"}>
                                <People />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" color="inherit" onClick={userLogoutHandler}>
                            <Logout />
                        </IconButton>
                    </Box>
                </Toolbar>
            </MuiAppBar>
        </Box>
    );
}
