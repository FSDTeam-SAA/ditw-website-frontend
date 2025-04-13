"use client";
import Image from "next/image";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/virtual";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const breakpoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};

const ReviewCart = () => {
  const reviewContent = [
    {
      id: 1,
      review:
        "Dyson IT Works handled the low voltage for our multi-site project with exceptional professionalism. Their nationwide coordination was flawless.",
      name: "~ Matt",
    },
    {
      id: 2,
      review:
        "Their team consistently delivers high-quality installations and meets our tight deadlines. A true nationwide partner.",
      name: "~ John",
    },
    {
      id: 3,
      review:
        "Dyson IT Works helped us stay on budget and on schedule for a large commercial project. Their expertise is invaluable.",
      name: "~ Tina",
    },
    {
      id: 4,
      review:
        "Dyson IT Works handled the low voltage for our multi-site project with exceptional professionalism. Their nationwide coordination was flawless.",
      name: "~ Matt",
    },
    {
      id: 5,
      review:
        "Their team consistently delivers high-quality installations and meets our tight deadlines. A true nationwide partner.",
      name: "~ John",
    },
    {
      id: 6,
      review:
        "Dyson IT Works helped us stay on budget and on schedule for a large commercial project. Their expertise is invaluable.",
      name: "~ Tina",
    },
  ];

  return (
    <div className="w-full flex items-center justify-center gap-10">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: false,
          disableOnInteraction: false,
          stopOnLastSlide: false,
        }}
        speed={3000}
        allowTouchMove={true}
        breakpoints={breakpoints}
        spaceBetween={12}
      >
        {reviewContent.map((data) => (
          <SwiperSlide key={data.id} className={`!h-auto !md:h-full`}>
            <div className="relative w-full !h-full">
              <Image
                src="/assets/contactUs/review_container.png"
                alt="review background"
                width={300}
                height={150}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-6 py-4">
                <p className="text-xs sm:text-sm">{data.review}</p>
                <p className="text-xs font-normal pt-2 text-right">
                  {data.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewCart;
