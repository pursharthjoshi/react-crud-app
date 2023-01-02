import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar'
import { unValidateFields, validateField } from '../../helpers'
import { registerService } from '../../services/user'

const Register = ({ checkIsLoggedIn, isLoggedIn }) => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: ''
    })
    const [loader, setLoader] = useState(false);

    const handleChange = (name, value) => {
        setData({ ...data, [name]: value })
    }

    function validated() {
        let validate = true
        if (data.name === '') {
            validateField('name', 'Name is required')
            validate = false;
        }
        if (data.email === '') {
            validateField('email', 'Email is required')
            validate = false;
        }
        if (data.phone === '') {
            validateField('phone', 'Phone is required')
            validate = false;
        }
        if (data.address === '') {
            validateField('address', 'Address is required')
            validate = false;
        }
        if (data.password === '') {
            validateField('password', 'Password is required')
            validate = false;
        }
        if (data.confirmPassword === '') {
            validateField('confirmPassword', 'Confirm password is required')
            validate = false;
        }
        if (data.password !== data.confirmPassword) {
            validateField('confirmPassword', 'Password and confirm password should be same')
            validate = false;
        }
        return validate;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        unValidateFields();
        let validate = validated();

        if (!validate) {
            return
        }

        try {
            setLoader(true);
            const res = await registerService(data);
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                checkIsLoggedIn();
                navigate('/')
                setLoader(false);
            }
        }
        catch (e) {
            console.log(e)
            setLoader(false)
            let msg = e.response.data.message || e.response.data?.errors[0]?.msg || "Something went wrong"
            validateField('email', msg)
        }
    }

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} />
            <div className='container d-flex flex-column align-items-center' >
                <div className='p-5' >
                    <h3>Register</h3>
                </div>
                <form className='w-50 form' onSubmit={onSubmit} >
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" name='name' value={data.name} onChange={(e) => handleChange(e.target.name, e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" aria-describedby="email" name='email' value={data.email} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                        <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="phone" className="form-label">Phone</label>
                        <input type='text' className="form-control" aria-describedby="phone" name='phone' value={data.phone} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="address" className="form-label">Address</label>
                        <input type='text' className="form-control" aria-describedby="address" name='address' value={data.address} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={data.password} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name='confirmPassword' value={data.confirmPassword} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </div>
                    <div className='w-100 d-flex justify-content-center' >
                        <button type="submit" disabled={loader} className="btn btn-primary w-50">{loader ? "Please wait.." : "Submit"}</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Register