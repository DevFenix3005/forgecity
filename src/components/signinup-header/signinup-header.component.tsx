import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Chat from '@mui/icons-material/Chat';

import { deepPurple } from '@mui/material/colors';

export default function SignInIpHeader() {
    return <React.Fragment>
        <Avatar sx={{ m: 1, bgcolor: deepPurple[500], width: 75, height: 75 }}>
            <Chat />
        </Avatar>
        <Typography variant="h5" sx={{ color: deepPurple['500'] }} >
            ForgeCity
        </Typography>

    </React.Fragment>
}