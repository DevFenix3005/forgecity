import React from "react";
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import Picker from 'emoji-picker-react';

import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';


import { sendSchema } from "../../utils/shcemas";
import { SendMessageForm } from '../../models/sendmessage.data';
import { sendInfo2Toast } from "../../services/snackbar.service";
import { changeBackdropState } from "../../redux/info/infoSlice";

import { uploadFile, getFileUrl } from "../../services/my-firabase-storage.service";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createMessageInChat } from '../../redux/messages/messagesSlice';
import { selectUsersInSession } from "../../redux/users/userDetailSlice";
import { MessageBasic } from "../../models/message.data";

const defaultValues: SendMessageForm = {
    content: ''
}

export default function SendMessage() {

    const [showEmoji, setShowEmoji] = React.useState(false);
    const [inputState, setInputState] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
    const { handleSubmit, reset, control, setValue, getValues } = useForm<SendMessageForm>({
        defaultValues,
        resolver: yupResolver(sendSchema)
    });
    const dispatch = useAppDispatch();
    let userInSession = useAppSelector(selectUsersInSession);

    const sendMessage2Chat: SubmitHandler<SendMessageForm> = async (data) => {
        let { content } = data;
        if (userInSession) {
            setInputState(true);
            let msg: MessageBasic = {
                content,
                userName: userInSession.username,
                userId: userInSession.uid,
                color: userInSession.color,
                userPicUrl: userInSession.picUrl
            }
            if (selectedImage) {
                dispatch(changeBackdropState({ open: true }));
                let snap = await uploadFile(`img/${userInSession.uid}/${selectedImage.name}`, selectedImage);
                msg.imgUrl = await getFileUrl(snap.ref.fullPath);
                setSelectedImage(null);
                dispatch(changeBackdropState({ open: false }));
            }

            dispatch(createMessageInChat(msg))
            reset(defaultValues);
            setInputState(false);
        }
    }

    const onInvalidForm: SubmitErrorHandler<SendMessageForm> = (data) => {
        sendInfo2Toast("Tu mensaje no se puede enviar vacio", "warning");
    }

    const onEmojiClick = (event: any, emojiObject: any) => {
        let content = getValues().content;
        let emoji = emojiObject.emoji;
        setValue('content', content + emoji);
    };

    const showEmojiPicket = () => {
        setShowEmoji(!showEmoji);
    }

    const uploadImage = async (event: any) => {
        const target = event.target as HTMLInputElement;
        if (target && target.files) {
            let file = target.files[0];
            setSelectedImage(file);
        }
    }

    return <Box sx={{
        height: '10vh'
    }}>
        <Box component="form"
            onSubmit={handleSubmit(sendMessage2Chat, onInvalidForm)}
            autoComplete="off">
            <Controller
                name="content"
                control={control}
                render={({ field }) =>
                    <Paper
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                    >
                        <InputBase {...field}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Enviar Mensaje"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onFocus={() => { setShowEmoji(false) }}
                            disabled={inputState}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        {showEmoji && <Picker disableAutoFocus={true} onEmojiClick={onEmojiClick} pickerStyle={{
                            position: 'absolute',
                            bottom: '0px',
                            right: '0px',
                            zIndex: '9'
                        }} />}
                        <Button variant="outlined" component="label" startIcon={<ImageIcon />} sx={{ p: '10px', border: 'none' }}>
                            <input hidden accept="image/*" type="file" onChange={uploadImage} />
                        </Button>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton onClick={showEmojiPicket} type="button" color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <EmojiEmotions />
                        </IconButton>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton type="submit" color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <SendIcon />
                        </IconButton>
                    </Paper>
                }
            />
        </Box>
        {selectedImage && `Imagen por enviar ${selectedImage.name}`}
    </Box>
}