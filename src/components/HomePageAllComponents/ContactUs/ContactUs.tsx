import Image from "next/image";
import React from "react";

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
        {/* comment section  */}
        <div className="bg-gradient-to-r from-[#c8c8c8] to-[#8badba] py-8">
          <div className="container grid grid-cols-1 md:grid-cols-4">
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
              <div className=" w-full flex items-center justify-center gap-5">
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
                        <p className="text-sm font-normal pt-5 pl-40 text-right">{data.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
