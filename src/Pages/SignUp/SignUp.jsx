import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocailLogin/SocialLogin";


const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = data =>{
        console.log(data?.PhotoUrl);

        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            updateUserProfile(data.name, data.PhotoUrl)
            .then( () => {
                const savedUser = { name: data.name, email:data.email };
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'user creted successfully',
                            showConfirmButton: false,
                            timer: 1500
                          });
                          navigate('/');
                    }
                })
               
            })
            .catch(error => console.log(error.message))
        })
        .catch((error) => {
           console.log(error.message);
          });

    };

    // 

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">SignUp now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register('name',{ required: true })} name="name" placeholder="name" className="input input-bordered" />
                            {errors.name && <span className="text-red-500">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input type="text" {...register('PhotoUrl',{ required: true })} placeholder="Photo Url" className="input input-bordered" />
                            {errors.photoUrl && <span className="text-red-500">Url is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register('email', {required: true})} placeholder="email" name="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-500">Email is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register('password',
                            { required: true, 
                                minLength: 6, 
                                maxLength: 20,
                                // pattern: / (?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|\\]) /


                            }
                            )} placeholder="password" name="password" className="input input-bordered" />
                           
                            {errors.password?.type === 'required' && <p className="text-red-500">Password is requied</p>}
                            {
                                errors.password?.type === 'minLength' && <p className="text-red-500">Password should be minimum six length</p>
                            }
                            {
                                errors.password?.type === 'maxLength' && <p className="text-red-500">Password should be maximum 20 length</p>
                            }
                            {/* {
                                errors.password?.type === 'pattern' && <p className="text-red-500">One lowercase one uppercase one special character</p>
                            } */}
                        </div>
                        
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="SignUP" />
                        </div>
                    </form>
                    <p className="text-center pb-3 text-blue-500">Already have an account? <Link to='/login'>LogIn</Link></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default SignUp;