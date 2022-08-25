import React from "react";

import { format } from "date-fns";

import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import Facebook from '@mui/icons-material/Facebook';
import Google from '@mui/icons-material/Google';
import { blue, red } from '@mui/material/colors';

import { loginSchema } from "../../utils/shcemas";
import { LoginCred } from "../../models/login.data";
import { useAppDispatch } from "../../redux/hooks";
import { fetchUserDetailAndAddInSession } from "../../redux/users/userDetailSlice";
import { forgottePassword } from '../../services/my-firebase-auth.service';
import { singInWithGooglePopup, singInWithFacebookPopup } from '../../services/my-firebase-socialauth.service';

import { sendInfo2Toast, showBackdrop, hideBackdrop } from "../../services/snackbar.service";
import { useAuth } from '../../utils/auth';

import { existUserDetail } from "../../services/users.service";
import { UserDetail } from '../../models/userdetail';

import { addUserDetailInCollection } from "../../redux/users/userDetailSlice";
import { User } from "firebase/auth";

const defaultValues: LoginCred = {
    email: '',
    password: ''
}

export default function SignIn() {

    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [fEmail, setFEmail] = React.useState<string | null>(null);

    const { handleSubmit, control, formState: { errors } } = useForm<LoginCred>({
        defaultValues,
        resolver: yupResolver(loginSchema)
    });

    const loginWithUserAndPass: SubmitHandler<LoginCred> = (loginCred) => {
        showBackdrop();
        auth?.signin(loginCred, successLogin, (errorcode) => errorLogin(errorcode, loginCred.email));
    };

    const successLogin = ({ uid }: User) => {
        dispatch(fetchUserDetailAndAddInSession(uid));
        sendInfo2Toast('Bienvenido', 'success');
        navigate("/", { replace: true })
        hideBackdrop();
    }

    const errorLogin = (errorcode: number, email: string) => {
        if (errorcode === 0) {
            sendInfo2Toast('Verifica tu correo electronico', 'warning');
            hideBackdrop();
        } else if (errorcode === 1) {
            sendInfo2Toast('Fallo el intento de ingresar a la aplicacion', 'error');
            setFEmail(email)
            hideBackdrop();
        }
    }

    const sendEmailWhenforgetPassword = async () => {
        if (fEmail) {
            await forgottePassword(fEmail);
            showBackdrop();
            sendInfo2Toast(`Correo enviado a ${fEmail}`, 'success');
            hideBackdrop();
        } else {
            sendInfo2Toast('Trata de autenticarte antes de hacer esta peticion', 'warning');
        }
    }

    const googleLogin = async () => {
        let googleCredential = await singInWithGooglePopup();
        try {
            let { uid, email, displayName, photoURL } = googleCredential.user;

            let strBirthday = format(new Date(), "yyyy-MM-dd");
            let userDetail: UserDetail = {
                uid,
                birthday: strBirthday,
                color: 'red',
                email: email ? email : 'UNK',
                fullname: displayName!,
                username: email ? email.split('@')[0] : 'JA!',
                picUrl: photoURL ? photoURL : ''
            };

            let existsUser = await existUserDetail(uid);
            if (!existsUser) {
                dispatch(addUserDetailInCollection(userDetail));
            }
            auth?.signinSocial(googleCredential.user, () => {
                successLogin(googleCredential.user);
            });
        } catch (error: any) {
            sendInfo2Toast("No se pudo agregar a este usuario", "error");
        }
    }

    const facebookLogin = async () => {
        let facebookCredential = await singInWithFacebookPopup();
        try {
            let { uid, email, displayName, photoURL, providerData } = facebookCredential.user;
            console.log(providerData);
            let strBirthday = format(new Date(), "yyyy-MM-dd");
            let userDetail: UserDetail = {
                uid,
                birthday: strBirthday,
                color: 'red',
                email: email ? email : 'UNK',
                fullname: displayName!,
                username: email ? email.split('@')[0] : 'JA!',
                picUrl: photoURL ? photoURL : ''
            };

            let existsUser = await existUserDetail(uid);
            if (!existsUser) {
                dispatch(addUserDetailInCollection(userDetail));
            }
            auth?.signinSocial(facebookCredential.user, () => {
                successLogin(facebookCredential.user);
            });
        } catch (error: any) {
            sendInfo2Toast("No se pudo agregar a este usuario", "error");
        }
    }



    return (
        <React.Fragment>
            <Box component="form" onSubmit={handleSubmit(loginWithUserAndPass)} autoComplete="off" sx={{ mt: 1 }}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField
                        {...field}
                        fullWidth
                        margin="normal"
                        id="email"
                        label="Correo electronico"
                        autoFocus
                        variant="standard"
                        error={!!errors.email}
                        helperText={errors.email && errors.email.message} />
                    }
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <TextField
                        {...field}
                        fullWidth
                        margin="normal"
                        type="password"
                        id="password"
                        label="Contraseña"
                        variant="standard"
                        error={!!errors.password}
                        helperText={errors.password && errors.password.message} />
                    }
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ my: 2 }}
                >
                    Iniciar sesion
                </Button>
                <Grid container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <Link variant="caption" color="inherit" onClick={sendEmailWhenforgetPassword} sx={{ cursor: "pointer" }}>
                            {'¿Olvidaste tu contraseña?'}
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link variant="caption" color="inherit" onClick={() => { navigate("/login/signup") }} sx={{ cursor: "pointer" }}>
                            {'¿No tienes cuenta?, Registrate ahora'}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Divider flexItem light sx={{ my: 2 }}>Ó, por red social</Divider>
            <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <Button onClick={facebookLogin}>
                    <Avatar sx={{ bgcolor: blue[500] }}>
                        <Facebook />
                    </Avatar>
                </Button>
                <Button onClick={googleLogin} >
                    <Avatar sx={{ bgcolor: red[500] }}>
                        <Google />
                    </Avatar>
                </Button>
            </Stack>
        </React.Fragment>

    );
}