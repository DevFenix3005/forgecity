import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import AppBar from '../../components/appbar/appbar.component';
import MessageView from '../../components/messagesview/messageview.component';
import SendMessage from '../../components/sendmessage/sendmessage.component';

export default function ChatRoom() {

    return <Container fixed>
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: 'whitesmoke',
                px: 1
            }}
        >
            <AppBar />
            <MessageView />
            <SendMessage />
        </Box>
    </Container>

}