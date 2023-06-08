import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../Hooks/useCart";


const FoodCard = ({ item }) => {
    const { image, recipe, name, price, _id } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const [, refetch ] = useCart();

    const handleAddToCart = () => {
        
        if (user && user.email) {
            const cartItem = {
                menuItemId : _id,
                name, image, price, email: user.email,
            }
            fetch('http://localhost:5000/carts', {
                method: "POST",
                headers:{
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(cartItem),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Added to Cart Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }

        else {
            Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {
                        state:{
                            from:location
                        }
                    })
                }
            })
        }

    }

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-black px-2 py-1 rounded shadow-lg text-white absolute right-0 mt-4 mr-4">{price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(item)} className="btn border-0 border-b-4 border-yellow-500 bg-slate-100 text-yellow-500 shadow-inner">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;