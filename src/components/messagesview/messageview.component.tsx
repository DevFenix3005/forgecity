import * as React from 'react';
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader';

import Message from '../message/message.component';

import { useAppSelector } from '../../redux/hooks';
import { selectMessages, selectScrollBlock } from '../../redux/messages/messagesSlice';

export default function MessageView() {

    const chatBoxRef = React.createRef<HTMLObjectElement>();
    const messages = useAppSelector(selectMessages);
    const scrollBlock = useAppSelector(selectScrollBlock);

    React.useEffect(() => {
        function chatScroll2Bottom() {
            if (chatBoxRef && scrollBlock) {
                let chatBoxHtml = chatBoxRef.current;
                if (chatBoxHtml) {
                    chatBoxHtml.scrollTop = chatBoxHtml?.scrollHeight
                }
            }
        }
        chatScroll2Bottom();
    }, [chatBoxRef, messages, scrollBlock]);

    return <Box ref={chatBoxRef}
        sx={{
            pt: 1,
            overflowY: 'auto',
            height: '80vh',
        }}>
        {
            (<List>
                {messages.length > 0
                    ? messages.map(message => <Message key={message.id} {...message} />)
                    : <ListSubheader>{"No hay mensajes"}</ListSubheader>}
            </List >)
        }
    </Box>

}


