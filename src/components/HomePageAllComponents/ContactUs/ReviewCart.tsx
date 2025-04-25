"use client";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import Loading from "@/components/shared/Loading/Loading";
import { ReviewBackImg } from "@/components/types/allFrontendDataType";
import { ReviewResponse } from "@/components/types/reviewDataType";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa";

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
    slidesPerView: 2,
    spaceBetween: 30,
  },
  1440: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};

type reviewCartBgDataType = {
  reviewBackImgData?: ReviewBackImg;
};

const ReviewCart: React.FC<reviewCartBgDataType> = ({ reviewBackImgData }) => {
  // console.log(reviewBackImgData)

  const { data, isError, error, isLoading } = useQuery<ReviewResponse>({
    queryKey: ["all-review-data"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/review-data-front`).then((res) => res.json()),
  });

  const reviewAllData = data?.data;
  console.log(reviewAllData);

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    <div className="w-full h-[500px]">
      <ErrorContainer message={error?.message || "Something went Wrong"} />
    </div>;
  }

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
        {reviewAllData?.map((data) => (
          <SwiperSlide key={data.id} className={`!h-auto !md:h-full`}>
            <div className="relative w-full !h-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/ReviewContents/${reviewBackImgData?.back_img}`}
                alt="review background"
                width={300}
                height={150}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-6 py-4">
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < data.star ? (
                      <FaStar key={i} className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <FaRegStar key={i} className="w-5 h-5 text-gray-300" />
                    )
                  )}
                </div>

                <p className="text-xs sm:text-sm pt-3">{data?.content}</p>
                <p className="text-xs font-normal pt-2 text-right">
                  {data?.name}
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
