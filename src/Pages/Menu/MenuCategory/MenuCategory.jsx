import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({ items, title, coverImg }) => {
    return (
        <div className="container mx-auto">
            {title && <Cover img={coverImg} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-4 container mx-auto my-16">
                {
                    items.map(element => <MenuItem
                        key={element._id}
                        item={element}

                    >

                    </MenuItem>)
                }
            </div>

            <Link to={`/order/${title}`}>
                <button className="btn border-0 border-b-4 bg-white text-yellow-500 shadow-inner mb-5">Order Now</button>

            </Link>

        </div>

    );
};

export default MenuCategory;