import * as React from 'react';

import { format } from "date-fns";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigate } from "react-router-dom";

import { CirclePicker } from 'react-color';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MuiLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { deepPurple } from '@mui/material/colors';

import { createUser, emailVerification } from "../../services/my-firebase-auth.service";
import { uploadFile, getFileUrl } from "../../services/my-firabase-storage.service";

import { UserSingUp } from "../../models/user-signup.data";
import { UserDetail } from '../../models/userdetail';
import { signupSchema } from "../../utils/shcemas";

import { useAppDispatch } from "../../redux/hooks";
import { addUserDetailInCollection } from "../../redux/users/userDetailSlice";

import { sendInfo2Toast, hideBackdrop, showBackdrop } from "../../services/snackbar.service";

const defaultValues: UserSingUp = {
    fullname: "",
    birthday: new Date(),
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    color: "",
}

export default function SignUp() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

    const { handleSubmit, reset, control, setValue, formState: { errors } } = useForm<UserSingUp>({
        defaultValues,
        resolver: yupResolver(signupSchema)
    });

    const userRegister: SubmitHandler<UserSingUp> = async (formDataUser) => {
        showBackdrop();
        try {
            let newUser = await createUser(formDataUser);
            let strBirthday = format(formDataUser.birthday, "yyyy-MM-dd");
            await emailVerification(newUser.user);
            let { uid } = newUser.user;
            let userDetail: UserDetail = {
                uid,
                birthday: strBirthday,
                color: formDataUser.color,
                email: formDataUser.email,
                fullname: formDataUser.fullname,
                username: formDataUser.username,
            }
            if (selectedImage) {
                let snap = await uploadFile(`pic/${userDetail.uid}`, selectedImage);
                userDetail.picUrl = await getFileUrl(snap.ref.fullPath);
            }
            dispatch(addUserDetailInCollection(userDetail));
            sendInfo2Toast("Usuario agregado, verifica tu correo", "success");
            reset(defaultValues);
            hideBackdrop();
            navigate("/login/signin");

        } catch (error: any) {
            sendInfo2Toast("No se pudo agregar a este usuario", "error");
        } finally {
            hideBackdrop();
        }
    };

    const uploadPhoto = async (event: any) => {
        const target = event.target as HTMLInputElement;
        if (target && target.files) {
            let file = target.files[0];
            setSelectedImage(file);
        }
    }

    return (
        <React.Fragment>
            <Box component="form" autoComplete='off' onSubmit={handleSubmit(userRegister)} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => <TextField
                                {...field}
                                variant="standard"
                                fullWidth
                                id="username"
                                label="Nombre de Usuario"
                                autoFocus
                                autoComplete='username'
                                error={!!errors.username}
                                helperText={errors.username && errors.username.message}
                            />}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <Controller
                            name="fullname"
                            control={control}
                            render={({ field }) => <TextField
                                {...field}
                                variant="standard"
                                fullWidth
                                id="fullname"
                                label="Nombre Completo"
                                error={!!errors.fullname}
                                helperText={errors.fullname && errors.fullname.message}
                            />}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <TextField
                                {...field}
                                variant="standard"
                                fullWidth
                                id="email"
                                label="Correo Electronico"
                                error={!!errors.email}
                                helperText={errors.email && errors.email.message} />}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="birthday"
                            control={control}
                            render={({ field }) => <DesktopDatePicker
                                {...field}
                                label="Cumpleaños"
                                inputFormat="yyyy-MM-dd"
                                renderInput={(params) => <TextField
                                    {...params}
                                    variant="standard"
                                    autoComplete='birthday'
                                    fullWidth
                                    id="birthday" />} />
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <TextField
                                {...field}
                                variant="standard"
                                fullWidth
                                id="password"
                                label="Contraseña"
                                type="password"
                                autoComplete='new-password'
                                error={!!errors.password}
                                helperText={errors.password && errors.password.message} />}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => <TextField
                                {...field}
                                variant="standard"
                                fullWidth
                                id="confirmPassword"
                                label="Confirma la contraseña"
                                type="password"
                                autoComplete='confirm-password'
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword && errors.confirmPassword.message} />}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" error={!!errors.color}>
                            <InputLabel shrink>Selecciona un color</InputLabel>
                            <Box sx={{ mt: 2.5 }}>
                                <CirclePicker onChange={(color) => { setValue("color", color.hex) }} />
                            </Box>
                            {errors.color && <FormHelperText id="component-error-text">{errors.color.message}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" component="label" sx={{
                            backgroundColor: deepPurple[500],
                            '&:hover': {
                                backgroundColor: deepPurple[700],
                            },
                        }} startIcon={<PhotoCamera />}>
                            Tu foto
                            <input hidden accept="image/*" multiple type="file" onChange={uploadPhoto} />
                        </Button>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 3 }}
                >
                    Registrar
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <MuiLink variant="caption" color="inherit" onClick={() => { navigate("/login/signin") }} sx={{ cursor: "pointer" }}>
                            {'Ya tengo cuenta'}
                        </MuiLink>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}