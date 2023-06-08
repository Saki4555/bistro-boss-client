
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";


const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter( item => item.category === 'popular');
    // const [menu, setMenu] = useState([]);
    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularMenu = data.filter(element => element.category === 'popular');
    //             setMenu(popularMenu);
    //         })
    // }, [])

    // console.log(menu)
    return (
        <section className="container mx-auto">
            <SectionTitle
                heading="---Check it out---"
                subHeading="FROM OUR MENU"
            ></SectionTitle>

            <div className="grid md:grid-cols-2 gap-4">
                {
                   popular.map(element => <MenuItem
                        key={element._id}
                        item={element}

                    >

                    </MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularMenu;