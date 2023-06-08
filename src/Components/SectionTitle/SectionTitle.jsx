
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto md:w-1/4 my-10">
            <p className="text-yellow-500 text-center mb-3">{subHeading}</p>
            <h1 className="text-3xl p-4 border-y-4 text-center">{heading}</h1>
        </div>
    );
};

export default SectionTitle;