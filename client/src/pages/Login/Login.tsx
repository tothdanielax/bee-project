import {FormEvent, memo, useEffect, useState} from "react";
import {login, register, selectIsAuthenticated} from "@features/auth/authSlice.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@context/store.ts";
import {Box, Button, TextField} from "@mui/material";
import HiveIcon from "@mui/icons-material/Hive";
import {toast} from "react-toastify";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';

function Login() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAppSelector(selectIsAuthenticated);

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const [validations, setValidations] = useState({
        username: {
            error: false,
            message: ''
        },
        password: {
            error: false,
            message: ''
        }
    });

    const [pristineInputs, setPristineInputs] = useState({
        username: true,
        password: true
    });

    useEffect(() => {
        if (isAuth) {
            navigate('/app');
        }
    }, [isAuth]);

    useEffect(() => {
        if (pristineInputs.username) {
            return;
        }

        const us = user.username;
        if (!us || us.trim() === '') {
            setValidations({
                ...validations,
                username: {error: true, message: "Username is required and can't be empty!"}
            });
        } else if (us.length < 4) {
            setValidations({
                ...validations,
                username: {error: true, message: 'Username must be at least 4 characters long'}
            });
        } else if (us.length > 20) {
            setValidations({
                ...validations,
                username: {error: true, message: 'Username must be less than 20 characters long'}
            });
        } else if (us !== 'bumblebee') {
            setValidations({
                ...validations,
                username: {error: false, message: '*Friendly reminder: Username is bumblebee'}
            });
        }
    }, [user.username, pristineInputs.username]);

    useEffect(() => {
        if (pristineInputs.password) {
            return;
        }

        const pw = user.password;
        if (!pw || pw.trim() === '') {
            setValidations({
                ...validations,
                password: {error: true, message: "Password is required and can't be empty!"}
            });
        } else if (pw.length < 4) {
            setValidations({
                ...validations,
                password: {error: true, message: 'Password must be at least 4 characters long'}
            });
        } else if (pw.length > 200) {
            setValidations({
                ...validations,
                password: {error: true, message: 'Password must be less than 200 characters long'}
            });
        } else if (pw !== 'honey') {
            setValidations({
                ...validations,
                password: {error: false, message: '*Friendly reminder: Password is IloveHon3y'}
            });
        }
    }, [user.password, pristineInputs.password]);


    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(login(user)).unwrap();
            navigate("/app");
            toast.success("Login successful");
        } catch (error) {
            toast.error(`Login failed: ${error}`);
        }
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(register(user)).unwrap();
            navigate("/app");
            toast.success("Register successful");
        } catch (error) {
            toast.error(`Register failed: ${error}`);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="flex flex-col gap-3 border border-yellow-500 bg-yellow-50 p-10 items-center">
                <div className='flex flex-row'>
                    <HiveIcon sx={{fontSize: 100}} className='text-yellow-500'/>
                    <h1 className='text-4xl font-bold align-middle self-center'>Honey Marketplace</h1>
                </div>
                <div className='flex flex-col gap-5'>
                    <Box style={{minHeight: "100px"}} className='flex flex-row gap-3 items-center'>
                        <PersonIcon sx={{fontSize: 30}}/>
                        <TextField id="usLogin" error={validations.username.error} label="Username" type='text'
                                   variant="outlined"
                                   className='w-96'
                                   required={true} value={user.username}
                                   helperText={validations.username.message}
                                   minRows={4}
                                   maxRows={30}
                                   onClick={() => setPristineInputs({...pristineInputs, username: false})}
                                   onChange={(e) => setUser({...user, username: e.target.value})}/>
                    </Box>
                    <Box style={{minHeight: "100px"}} className='flex flex-row gap-3 items-center'>
                        <PasswordIcon sx={{fontSize: 30}}/>
                        <TextField id="pwLogin" label="Password" type='password'
                                   error={validations.password.error}
                                   variant="outlined" required={true}
                                   className='w-96'
                                   minRows={4}
                                   maxRows={30}
                                   onClick={() => setPristineInputs({...pristineInputs, password: false})}
                                   helperText={validations.password.message}
                                   value={user.password}
                                   onChange={(e) => setUser({...user, password: e.target.value})}/>

                    </Box>
                </div>
                <div className='flex flex-row gap-3'>
                    <Button variant="contained" type='submit' className='w-fit py-2 px-4 transition-all duration-500' color="primary"
                            autoFocus={true} focusRipple={true} onClick={handleLogin} disabled={validations.username.error || validations.password.error || !user.username.trim() || !user.password.trim()}>
                        Login
                    </Button>
                    <Button variant="contained" type='submit' className='w-fit py-2 px-4 transition-all duration-500' color="secondary"
                            onClick={handleRegister} disabled={validations.username.error || validations.password.error || !user.username.trim() || !user.password.trim()}>
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default memo(Login);
