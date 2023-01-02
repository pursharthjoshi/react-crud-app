import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar'
import { validateField } from '../../helpers';
import { loginService } from '../../services/user';

const Login = ({ checkIsLoggedIn, isLoggedIn }) => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [loader, setLoader] = useState(false);

    const handleChange = (name, value) => {
        setData({ ...data, [name]: value })
    }
    function validated() {
        let validate = true

        if (data.email === '') {
            validateField('email', 'Email is required')
            validate = false;
        }
        if (data.password === '') {
            validateField('password', 'Password is required')
            validate = false;
        }
        return validate;
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        let validate = validated();

        if (!validate) {
            return;
        }

        try {
            setLoader(true)
            const res = await loginService(data);

            if (res.data.success) {
                localStorage.setItem('token', res.data.token)
                checkIsLoggedIn();
                navigate('/');
                setLoader(false)
            }
        }
        catch (e) {
            console.log(e)
            setLoader(false)
            validateField('email', "");
            let msg = e.response.data.message || e.response.data?.errors[0]?.msg || "Something went wrong"
            validateField('password', msg)
        }

    }

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} />
            <div className='container d-flex flex-column align-items-center' >
                <div className='p-5' >
                    <h3>Login</h3>
                </div>
                <form onSubmit={onSubmit} className='w-50' >
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" aria-describedby="email" name='email' value={data.email} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={data.password} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </div>

                    <div className='w-100 d-flex flex-column align-items-center' >
                        <button type="submit" disabled={loader} className="btn btn-primary w-50">{loader ? "Please wait.." : "Submit"}</button>
                        <span className='py-4' >Don't have an account? <NavLink to={'/register'}>Register now</NavLink></span>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Login