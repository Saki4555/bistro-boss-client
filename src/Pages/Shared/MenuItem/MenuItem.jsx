
const MenuItem = ({item}) => {

    const { image, recipe, name, price } = item;
    return (
        <div className="flex gap-3">
            <img className="w-28 rounded-t-none rounded-r-[200px] rounded-b-[200px] " src={image} alt="" />
            <div>
                <span className="text-2xl mr-48">{name} -------</span>
                <span className="text-yellow-500">${price}</span>
                <p>{recipe}</p>
                
            </div>
        </div>
    );
};

export default MenuItem;