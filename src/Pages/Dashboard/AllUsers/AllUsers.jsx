import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    });

    console.log(users);

    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an ADMIN now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }


    const handleDelete = () => {

    }

    return (
        <div >
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>

            <div className="overflow-x-auto w-3/4 mx-auto my-10">
                <h3 className="text-3xl mb-2 font-semibold">Total Users : {users.length}</h3>
               
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {
                            users.map((user, index) => <tr
                                key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>

                                <td>
                                    {
                                        user.role === 'admin' ? <span className="font-bold">Admin</span> :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-md bg-yellow-500 text-white"><FaUserShield></FaUserShield></button>
                                    }
                                </td>

                                <td><button onClick={() => handleDelete(user)} className="btn btn-ghost btn-md bg-red-500 text-white"><FaTrashAlt></FaTrashAlt></button></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;