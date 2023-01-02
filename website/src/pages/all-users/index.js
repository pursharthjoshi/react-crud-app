import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar'
import { getAllUsersService } from '../../services/user';

const AllUsers = ({ checkAndRedirect, isLoggedIn }) => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([])

    useEffect(() => {
        checkAndRedirect(navigate);
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            getUsers();
        }
    }, [isLoggedIn])

    const getUsers = async () => {
        try {
            const res = await getAllUsersService();
            if (res.data.success) {
                setUsers(res.data.users)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} />
            <div className='container' >
                {users.length > 0 ? (
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                </tr>
                            )
                            )}

                        </tbody>

                    </table>
                ) : (
                    <div className='d-flex justify-content-center mt-5' >
                        <h3>No users to show!</h3>
                    </div>
                )}
            </div>
        </>
    )
}

export default AllUsers