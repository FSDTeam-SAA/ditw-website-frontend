import { BannerItem } from "@/components/types/allFrontendDataType";
import Link from "next/link";
import React from "react";

type BannerProps = {
  data?: BannerItem;
};

const Banner : React.FC<BannerProps> = ({data}) => {
  if (!data) return null;

  console.log(data.back_img)

  return (
    <div >
      <div
        style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Banners/${data.back_img})` }}
        className="bg-cover bg-center bg-no-repeat w-full h-[500px] md:h-[800px] pl-5 md:pl-[54px] pr-5 md:pr-[84px]"
      >
        <div className="container">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-yellow-400 text-center pt-10 md:pt-[193px]">
            {data?.heading}
          </h1>
          <div className="w-full flex items-center justify-center">
            <div className="w-28 md:w-32 lg:w-48 xl:w-80 h-1 bg-[#555be7] mt-2" />
          </div>
          <p className="text-base font-normal leading-normal !text-white text-left md:text-right pt-[30px]">
            {data?.title}
          </p>
          <div className="w-full flex items-center justify-start md:justify-end pt-[18px]">
            <Link href={data?.button_url || "#"}>
            <button className="text-base font-semibold leading-normal text-black bg-white py-1 px-4 rounded-full">
              {data?.button_name}
            </button>
            </Link>
            
          </div>
          <p className="w-full md:w-1/3 text-[15px] font-normal leading-normal text-white text-left pt-4 md:pt-0">
            {data?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
