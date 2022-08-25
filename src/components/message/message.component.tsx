import React from 'react';
import { formatDistanceToNow, parse } from 'date-fns';
import es from 'date-fns/locale/es';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { MessageProps } from '../../models/message.data';

export default function Message(props: MessageProps) {

    const date2ElapsedString = () => {
        let messageDate: Date;
        let createAt = props.createAt;
        if (createAt instanceof Date) {
            messageDate = createAt as Date
        } else {
            let tempDateText = createAt as string
            messageDate = parse(tempDateText, 'yyyy-MM-dd HH:mm', new Date())
        }
        return formatDistanceToNow(messageDate, {
            locale: es
        });
    }

    return <Card sx={{ backgroundColor: props.color, mb: 1, maxWidth: props.kindOfMessage === 'image' ? 350 : 'xl' }}>
        <CardHeader sx={{ backgroundColor: 'white', m: 1, borderRadius: 1 }}
            avatar={<Avatar sx={{ bgcolor: props.color }} alt={props.userName} src={props.userPicUrl} imgProps={{ referrerPolicy: "no-referrer" }} />
            }
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
            title={
                <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        variant='subtitle2'
                        component="span"
                        color="text.primary"
                    >{props.thisIsMyMsg ? 'Tu dices' : (`${props.userName} dice`)}</Typography>
                    <Typography
                        sx={{ display: 'inline' }}
                        variant='caption'
                        component="span"
                        color="text.secondary"
                    > {` — ${date2ElapsedString()}`}</Typography>
                </React.Fragment>
            }
            subheader={
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {props.content}
                </Typography>
            }
        />
        {props.kindOfMessage === 'image' &&
            <CardMedia
                component="img"
                height="100%"
                image={props?.imgUrl}
                alt="Paella dish"
            />
        }
    </Card>






}