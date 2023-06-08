import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";




const AddItem = () => {

    const [ axiosSecure ] = useAxiosSecure();

    const image_hosting_token = import.meta.env.VITE_Image_Upload_token;
    
    const { register, handleSubmit, reset } = useForm();

  
    const image_hosting_url = `https://api.imgbb.com/1/upload?&key=${image_hosting_token}`;
    console.log(image_hosting_url);
  
    console.log('vite env check', import.meta.env.VITE_SOME_KEY);

    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageResponse => {
            console.log(imageResponse)
           if(imageResponse.success){
            const imgURL = imageResponse.data.display_url;

            const { name, price, category, recipe } = data;
            const newItem = { name, price: parseFloat(price), category, recipe, image: imgURL };
            
            console.log(newItem);

            axiosSecure.post('/menu', newItem)
            .then(data => {
                console.log('after inserting new item', data.data);
                if(data.data.insertedId){
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Item added successfully',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
           }
        })
    };
    // console.log(errors);


    return (
        <div className="py-5 px-10">
            <SectionTitle subHeading="--- What's new---" heading='Add an Item'></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Recpie Name*</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full " {...register("name", { required: true, maxLength: 120 })} />
                </div>

                <div className="flex gap-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Category</span>

                        </label>
                        <select defaultValue="Category" {...register("Category", { required: true })} className="select select-bordered">
                            <option disabled value='Category'>Category</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Dessert</option>
                            <option>Drinks</option>
                        </select>

                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input type="number" placeholder="Type here" className="input input-bordered w-full " {...register("price", { required: true })} />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recpie Details</span>

                    </label>
                    <textarea {...register("recpie", { required: true })} className="textarea textarea-bordered h-24 w-1/2" placeholder="Bio"></textarea>

                </div>

                <input type="file"{...register("image", { required: true })} className="file-input w-full " /> <br />
                <input className="btn btn-warning btn-sm bg-yellow-500 border-0" type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItem;