import Image from "next/image";
import ContactForm from "./ContactForm";
import ReviewCart from "./ReviewCart";
import {
  AddressItem,
  ContactSection,
  FooterItem,
  OurContact,
  ReviewItem,
} from "@/components/types/allFrontendDataType";
import React from "react";
import Link from "next/link";

type contactUsProps = {
  data?: ContactSection;
  addressData?: AddressItem;
  ourContactData?: OurContact;
  footerData?: FooterItem;
  reviewHeadingData?: ReviewItem;
};

const ContactUs: React.FC<contactUsProps> = ({
  data,
  addressData,
  ourContactData,
  footerData,
  reviewHeadingData,
}) => {
  console.log(reviewHeadingData);

  return (
    <div>
      {/* Header Section */}
      <div style={{ backgroundColor: `${data?.color}` }}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-left pt-8 sm:pt-[45px]">
            {data?.title}
          </h2>

          <div className="w-full flex items-center justify-start">
            <div className="w-32 sm:w-60 h-1 bg-[#555be7] mt-2 ml-4 sm:ml-14" />
          </div>

          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mt-4">
            <p className="text-sm sm:text-base font-normal leading-normal text-white text-left">
              {data?.subtitle}
            </p>
            <Link href={data?.button_url || "#"}>
              <button className="text-sm sm:text-base font-semibold text-white leading-normal bg-[#1d0fbf] hover:bg-[#2a1cc7] py-1 px-4 rounded-full">
                {data?.button_name}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div style={{ backgroundColor: `${reviewHeadingData?.back_color}` }}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="md:col-span-1 w-full flex flex-col justify-center items-center md:items-start">
              <h4 className="text-xl sm:text-2xl font-bold text-black text-center md:text-left leading-normal">
                {reviewHeadingData?.title}
              </h4>
              <div className="w-full flex items-center justify-center md:justify-start mt-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Reviews/${reviewHeadingData?.img}`}
                  alt="arrow icon"
                  width={100}
                  height={15}
                  className="w-24 sm:w-auto"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <ReviewCart />
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div
          style={{ backgroundColor: `${footerData?.back_img}` }}
          className="bg-black pb-8"
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-normal pt-6 sm:pt-[18px] pb-2">
                  {footerData?.title}
                </h2>
                <div className="w-full flex items-center justify-start">
                  <div className="w-32 sm:w-48 h-1 bg-[#3847af] ml-3" />
                </div>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base font-medium text-gray-300 pt-3">
                  {footerData?.sub_title}
                </p>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="lg:col-span-2">
                <div>
                  <div className="mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white pt-4 sm:pt-[18px] pb-2">
                      {data?.title}
                    </h2>
                    <div className="w-full flex items-center justify-start">
                      <div className="w-24 sm:w-36 h-1 bg-[#3847af] ml-6 sm:ml-9" />
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-[18px]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Addresses/${addressData?.icon}`}
                        alt="location icon"
                        width={24}
                        height={24}
                      />
                      <p className="text-white font-medium leading-normal text-base sm:text-lg">
                        {addressData?.location}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white pb-2">
                      {ourContactData?.heading}
                    </h2>
                    <div className="w-full flex items-center justify-start">
                      <div className="w-16 sm:w-20 h-1 bg-[#3847af] ml-12 sm:ml-16" />
                    </div>
                    <div className="flex items-center mt-4 sm:mt-6">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/OurContacts/${ourContactData?.email_icon}`}
                        alt="phone icon"
                        width={24}
                        height={24}
                      />
                      <p className="text-white font-medium leading-normal text-sm sm:text-base md:text-lg break-all sm:break-normal">
                        {ourContactData?.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-6">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/OurContacts/${ourContactData?.phone_icon}`}
                        alt="phone icon"
                        width={24}
                        height={24}
                      />
                      <p className="text-white font-medium leading-normal text-sm sm:text-base md:text-lg">
                        {ourContactData?.phone}
                      </p>
                    </div>
                    <p className="text-xs font-medium leading-normal text-white pt-5">
                      {ourContactData?.copyright}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
