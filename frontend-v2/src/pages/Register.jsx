/* eslint-disable no-unused-vars */
import { useState } from "react";
import { ButtonBlue600 } from "../assets/components/ButtonBlue600";
import { Input } from "../assets/components/Input";
import { InputGroup } from "../assets/components/InputGroup";
import { Label } from "../assets/components/Label";
import { API_BASE_URL } from "../config/api";
import { Alert } from "../assets/components/Alert";
import { Error } from "../assets/components/Error";
import axios from "axios";
import { ButtonRed600 } from "../assets/components/ButtonRed600";

export const Register = ({ isRegister, setIsRegister, setIsLogin, onRegisterSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSetLogin = (e) => {
        e.preventDefault();
        setIsRegister(false);
        setIsLogin(true);
    }

    const handleCancelRegister = (e) => {
        e.preventDefault();
        setIsRegister(false);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: '',
            });
        }

        setMessage('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
            if (response.data.access_token) {
                onRegisterSuccess(response.data.user, response.data.access_token);
            }

            setFormData({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            })
        } catch (error) {
            if (error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response.data.message) {
                setMessage(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`w-full h-full backdrop-blur-xs bg-slate-950/50 fixed z-50 inset-0 items-center justify-center ${isRegister ? 'flex' : 'hidden'}`}>
            <div className={`flex w-2xs sm:w-sm md:w-md lg:w-lg flex-col items-center gap-4 px-8 py-6 sm:px-8 md:px-16 bg-slate-50 shadow-md rounded-md ${isRegister ? 'opacity-100' : 'opacity-0'} delay-100 transition-all`}>
                <div className="w-1/4">
                    <img src='../../logo.png' alt="" />
                </div>
                {message && (
                    <Alert>{message}</Alert>
                )}
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label name='name' />
                        <Input errors={errors} name='name' placeholder='Input your name...' type='text' formData={formData} onChange={handleChange} />
                        <Error name='name' errors={errors} />
                    </InputGroup>
                    <InputGroup>
                        <Label name='email' />
                        <Input errors={errors} name='email' placeholder='user@example.com' type='email' formData={formData} onChange={handleChange} />
                        <Error name='email' errors={errors} />
                    </InputGroup>
                    <InputGroup>
                        <Label name='password' />
                        <Input errors={errors} name='password' placeholder='Insert your password...' type='password' formData={formData} onChange={handleChange} />
                        <Error name='password' errors={errors} />
                    </InputGroup>
                    <InputGroup>
                        <Label name='password confirmation' />
                        <Input errors={errors} name='password_confirmation' placeholder='Repeat your password...' type='password' formData={formData} onChange={handleChange} />
                        <Error name='password_confirmation' errors={errors} />
                    </InputGroup>
                    <div className="flex flex-col gap-2 lg:gap-4 group items-stretch mt-4">
                        <ButtonBlue600 disabled={loading} type="submit">
                            {loading ? (
                                <>
                                    <svg aria-hidden="true" className={`w-3 h-3 text-neutral-tertiary animate-spin fill-orange-600`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg> Sign Up
                                </>
                            ) : 'Sign Up'}
                        </ButtonBlue600>
                        <button className='flex gap-2 justify-center items-center border border-blue-600 rounded-full py-1 text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white'><img src="../../google-logo-search-new-svgrepo-com.svg" alt="google" className="w-3" />Continue with Google</button>
                        <ButtonRed600 onClick={handleCancelRegister} />
                        <small className="text-center text-slate-700">Have an account? <a href="" className="text-blue-600" onClick={handleSetLogin} >Sign In</a></small>
                    </div>
                </form>
            </div>
        </div >
    )
}
