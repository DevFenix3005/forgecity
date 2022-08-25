import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { blue } from '@mui/material/colors';

import { RootState } from '../../redux/store';
import { toggleUserDialog, selectInfoDialogState } from '../../redux/info/infoSlice';
import { selectUsersInChat } from '../../redux/users/userDetailSlice';

const mapStateToProps = (state: RootState) => {
    let { open } = selectInfoDialogState(state);
    let users = selectUsersInChat(state);
    return {
        open,
        users
    };
}

const mapDispatchToProps = {
    onCloseDialog: () => (toggleUserDialog())
}

const connector2UserDialog = connect(mapStateToProps, mapDispatchToProps);

type MyUserDialogProps = ConnectedProps<typeof connector2UserDialog>


function UserView(props: MyUserDialogProps) {
    const { users, open, onCloseDialog } = props;

    const handleClose = () => {
        onCloseDialog();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='md'>
            <DialogTitle>Usuarios en el chat</DialogTitle>
            <DialogContent>
                <List sx={{ pt: 0 }}>
                    {users.map(({ username, picUrl, color, uid }) => (
                        <ListItem key={uid}>
                            <ListItemAvatar>
                                {picUrl
                                    ? <Avatar sx={{ bgcolor: blue[100], color: color }} src={picUrl} />
                                    : <Avatar sx={{ bgcolor: blue[100], color: color }} >
                                        {username.charAt(0).toUpperCase()}
                                    </Avatar>
                                }
                            </ListItemAvatar>
                            <ListItemText primary={username} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default connector2UserDialog(UserView);