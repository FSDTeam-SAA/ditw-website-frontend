import { Phone } from "lucide-react";
import Image from "next/image";
import React from "react";
import { PiMapPinLine } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import ContactForm from "./ContactForm";

const ContactUs = () => {
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
  ];
  return (
    <div>
      <div id="contact_us" className=" ">
        <div className="bg-black">
          <div className="container pl-[35px] pr-[51px] pb-5">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-left pt-[45px]">
              <span className="text-yellow-400 z-40">CONTACT </span>
              US
            </h2>
            <div className="w-full flex items-center justify-start">
              <div className="w-60 h-1 bg-[#555be7] mt-2 ml-14" />
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-base font-normal leading-normal text-white text-left pt-4">
                Trusted by America&apos;s Leading Builders and Businesses
              </p>
              <button className="text-base font-semibold text-white leading-normal bg-[#555be7] py-1 px-4 rounded-full">
                Get a Quote
              </button>
            </div>
          </div>
        </div>
        {/* Review/comment section  */}
        <div className="bg-gradient-to-r from-[#c8c8c8] to-[#8badba]">
          <div className="container grid grid-cols-1 md:grid-cols-4 py-3">
            <div className="md:col-span-1 w-full flex flex-col justify-center">
              <h4 className="text-2xl font-bold text-black text-left leading-normal">
                WE MAKE HAPPY CUSTOMERS{" "}
              </h4>
              <div className="w-full flex items-center justify-center">
                <Image
                  src="/assets/arrow_icon.png"
                  alt="arrow icon"
                  width={120}
                  height={15}
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className=" w-full flex flex-col md:flex-row items-center justify-center gap-5">
                {reviewContent?.map((data) => {
                  return (
                    <div className="relative" key={data.id}>
                      <div className="">
                        <Image
                          src="/assets/contactUs/review_container.png"
                          alt="review bg"
                          width={300}
                          height={150}
                        />
                      </div>
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col py-2 px-6">
                        <p>{data.review}</p>
                        <p className="text-sm font-normal pt-5 pl-40 text-right">
                          {data.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* contact part  */}
          <div className="bg-black pb-8">
            <div className="container grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-20">
              {/* Contact Form */}
              <div className="md:col-span-3">
                <h2 className="text-3xl font-bold text-white leading-normal pt-[18px] pb-2">
                  DROP US A LINE
                </h2>
                <div className="w-full flex items-center justify-start">
                  <div className="w-48 h-1 bg-[#3847af] ml-3" />
                </div>
                <p className="mb-6 text-base font-medium text-gray-300 pt-3">
                  Our team is ready to help! Give us a call or email us anytime
                  - we&#39;re happy to answer any questions you have. No
                  pressure, no obligations.
                </p>
                <ContactForm/>
              </div>
              <div className="md:col-span-2">
                {/* Contact Information */}
                <div>
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white pt-[18px] pb-2">
                      OUR ADDRESS
                    </h2>
                    <div className="w-full flex items-center justify-start">
                      <div className="w-36 h-1 bg-[#3847af] ml-9" />
                    </div>
                    <div className="flex items-center mt-[18px]">
                      <PiMapPinLine className="w-8 h-8 text-white mr-4 flex-shrink-0" />
                      <p className="text-white font-medium leading-normal text-lg">
                        3948 LEGACY DRIVE | STE 106
                        <br />
                        PLANO, TEXAS 75023
                      </p>
                    </div>
                  </div>

                  <div>
                  <h2 className="text-3xl font-bold text-white pb-2">
                      OUR CONTACT
                    </h2>
                    <div className="w-full flex items-center justify-start">
                      <div className="w-20 h-1 bg-[#3847af] ml-16" />
                    </div>
                    <div className="flex items-center mt-6">
                      <TfiEmail className="w-8 h-8 text-white mr-4 flex-shrink-0" />
                      <p className="text-white font-medium leading-normal text-base md:text-lg">CONTACT@DYSONITWORKS.COM</p>
                    </div>
                    <div className="flex items-center mt-6">
                      <Phone className="h-8 w-8 text-white mr-4 flex-shrink-0" />
                      <p className="text-white font-medium leading-normal text-base md:text-lg">888-348-9552</p>
                    </div>
                    <p className="text-xs font-medium leading-normal text-white pt-5">Copyright © 2025 Dyson IT Works. America&lsquo;s Low Voltage Company. All Rights Reserved. </p>
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
