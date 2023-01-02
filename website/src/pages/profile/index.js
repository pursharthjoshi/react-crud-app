import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar'
import { deleteUserService, getProfileService, updateProfileService } from '../../services/user';
import { toast } from 'react-toastify';

const Profile = ({ checkAndRedirect, isLoggedIn }) => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })
    const [editedData, setEditedData] = useState({})
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        checkAndRedirect(navigate);
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            getUser()
        }
    }, [isLoggedIn]);

    const getUser = async () => {

        try {
            const res = await getProfileService();
            if (res.data.success) {
                let user = res.data.user
                setData(res.data.user)
                setEditedData({
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    function confirmDelete() {

        let ans = window.confirm('Are you sure you want to delte your account?')

        if (ans) {
            onDelete();
        }
    }

    const onDelete = async () => {
        try {
            const res = await deleteUserService(data.id)
            if (res.data.success) {
                localStorage.removeItem('token')
                checkAndRedirect(navigate);
                toast("Account deleted successfully!")
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const updateProfile = async () => {

        try {
            const res = await updateProfileService({ email: data.email, ...editedData });
            if (res.data.success) {
                toast(res.data.message, {
                    position: "top-right"
                });
                setEdit(false);
                let user = res.data.user
                setData(res.data.user)
                setEditedData({
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                })
            }
        }
        catch (e) {
            console.log(e)
        }

    }

    const handleChange = (e) => {
        setEditedData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} />
            <div className='container d-flex flex-column align-items-center' >
                <div className='p-5' >
                    <h3>Account details</h3>
                </div>
                <form className='w-50' >
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" name='name' onChange={handleChange} readOnly={!edit} value={edit ? editedData.name : data.name} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" name='email' readOnly value={data.email} className="form-control" aria-describedby="email" />
                    </div>
                    <div className="mb-3">
                        <label for="phone" className="form-label">Phone</label>
                        <input type="phone" name='phone' onChange={handleChange} readOnly={!edit} value={edit ? editedData.phone : data.phone} className="form-control" aria-describedby="phone" />
                    </div>
                    <div className="mb-3">
                        <label for="address" className="form-label">Address</label>
                        <input type='text' name='address' onChange={handleChange} readOnly={!edit} value={edit ? editedData.address : data.address} className="form-control" aria-describedby="address" />
                    </div>
                    <div className='row'>
                        {edit && (
                            <div className='col-6 d-flex justify-content-center'>
                                <button onClick={() => {
                                    setEditedData({
                                        name: data.name,
                                        phone: data.phone,
                                        address: data.address,
                                    })
                                    setEdit(false);
                                }} type="button" className="btn btn-danger w-50">Cancel</button>
                            </div>
                        )}
                        <div className='col-6 d-flex justify-content-center'>
                            <button onClick={() => edit ? updateProfile() : setEdit(true)} type="button" className="btn btn-primary w-50">{edit ? "Submit" : "Edit Profile"}</button>
                        </div>
                        {!edit && (
                            <div className='col-6 d-flex justify-content-center'>
                                <button type="button" onClick={confirmDelete} className="btn btn-danger w-50">Delete Account</button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Profile