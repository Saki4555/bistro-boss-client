import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";

import "swiper/css/navigation";

import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';

import { FaQuoteLeft } from 'react-icons/fa';


const TestiMonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => {
                console.log(reviews)
                setReviews(data)
            })
    }, [])

    return (
        <section className="container mx-auto">
            <SectionTitle
                subHeading='---What Our Clients Say---'
                heading='TESTIMONIALS'
            >
            </SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="flex flex-col items-center space-y-7 px-20">
                            <FaQuoteLeft className="text-6xl" />
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <div>
                                <p>{review.details}</p>
                                <p className="text-lg uppercase text-center text-yellow-500">{review.name}</p>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default TestiMonials;