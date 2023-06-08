import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featured from '../../../assets/home/featured.jpg';
import './Featured.css';
const Featured = () => {
    return (
        <section className="featured-img bg-fixed">
            <SectionTitle
                heading="FROM OUR MENU"
                subHeading='---Check it out---'
            >
            </SectionTitle>

            <div className="flex gap-10 p-4 justify-center items-center w-3/4 mx-auto text-white">
                <img className="w-1/2" src={featured} alt="" />
                <div>
                    <p>March 20, 2023</p>
                    <p className="text-lg">WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline border-0 border-b-2 border-white text-white">Read More</button>
                </div>
            </div>
        </section>
    );
};

export default Featured;