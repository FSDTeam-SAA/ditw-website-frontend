import Image from "next/image";
import React from "react";

const OurServices = () => {
  const serviceData1 = [
    {
      id: 1,
      image: "/assets/service/service1.jpeg",
      title: "Large-Scale Project Planning & Execution",
      desc: "Managing complex low voltage installations for diverse projects",
    },
    {
      id: 2,
      image: "/assets/service/service2.jpeg",
      title: "Nationwide Project Coordination",
      desc: "Ensuring seamless communication and execution across multiple locations.",
    },
    {
      id: 3,
      image: "/assets/service/service3.jpeg",
      title: "Remote Project Management",
      desc: "Providing dedicated support and expertise throughout the project lifecycle.",
    },
  ];
  const serviceData2 = [
    {
      id: 1,
      image: "/assets/service/service4.jpeg",
      title: "Value Engineering & Design",
      desc: "Optimizing low voltage designs for cost-effectiveness and performance. ",
    },
    {
      id: 2,
      image: "/assets/service/service5.jpeg",
      title: "Nationwide Procurement & Logistics:",
      desc: "Efficiently sourcing and delivering materials to any location.",
    },
    {
      id: 3,
      image: "/assets/service/service6.jpeg",
      title: "Standardized Installation & Testing",
      desc: "Guaranteeing consistent quality and performance across all projects.",
    },
    {
      id: 4,
      image: "/assets/service/service7.jpeg",
      title: "As-Built Documentation & Support",
      desc: "Providing comprehensive documentation and ongoing support.",
    },
  ];
  return (
    <div id="services" className="overflow-hidden relative">
      <div className="absolute h-full w-full bg-black/20 z-10" />
      <div
        style={{ backgroundImage: `url('/assets/service/ourService_bg.jpeg')` }}
        className="z-50 bg-cover bg-center bg-no-repeat bg-red-800 w-full h-auto md:h-[950px] px-3 md:pl-[39px]"
      >
        <div className="container">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 text-left pt-[45px]">
            OUR <span className="text-white z-40">NATIONWIDE</span> <br />{" "}
            SERVICES
          </h2>
          <div className="w-full flex items-center justify-start">
            <div className="w-60 h-1 bg-[#555be7] mt-2 ml-7" />
          </div>
          <p className="text-2xl text-white font-bold leading-normal pt-4">
            Loyalty - Integrity - Commitment
          </p>
          <p className="w-full md:w-1/2 text-base font-normal text-white leading-normal pt-4">
            We are committed to building long-term partnerships with general
            contractors and business owners, providing the expertise and
            resources needed to complete projects on time and within budget.
          </p>
          <p className="w-full md:w-1/2 text-xl font-normal text-white leading-normal py-6">
            Our nationwide services include:
          </p>
          {/* second part  */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-20">
              <div className="md:col-span-3 ">
                <h4 className="text-2xl font-bold leading-normal text-yellow-400">
                  PROJECT MANAGEMENT
                </h4>
                <div className="w-full flex items-center justify-start ml-6 pb-[30px]">
                  <div className="w-52 h-1 bg-[#555be7] mt-2" />
                </div>
                <div className="flex flex-col md:flex-row items-start gap-5">
                  {serviceData1?.map((data) => {
                    return (
                      <div key={data.id}>
                        <Image
                          src={data?.image}
                          alt="service"
                          width={150}
                          height={120}
                          className="w-full md:w-[200px] h-[300px] md:h-[120px] rounded-[15px]"
                        />
                        <h5 className="text-lg font-bold text-white leading-normal pt-3">
                          {data?.title}
                        </h5>
                        <p className="text-base font-medium text-white leading-[24px] mt-3">
                          {data?.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="md:col-span-4 ">
                <h4 className="text-2xl font-bold leading-normal text-yellow-400">
                  END-TO-END DELIVERY
                </h4>
                <div className="w-full flex items-center justify-start ml-6 pb-[30px]">
                  <div className="w-52 h-1 bg-[#555be7] mt-2" />
                </div>
                <div className="flex flex-col md:flex-row items-start gap-5">
                  {serviceData2?.map((data) => {
                    return (
                      <div key={data.id}>
                        <Image
                          src={data?.image}
                          alt="service"
                          width={150}
                          height={100}
                          className="w-full md:w-[200px] h-[250px] md:h-[120px] rounded-[15px]"
                        />
                        <h5 className="text-lg font-bold text-white leading-normal pt-3">
                          {data?.title}
                        </h5>
                        <p className="text-base font-medium text-white leading-[24px] mt-3">
                          {data?.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {/* managed it support  */}
                <h4 className="flex items-center gap-4 text-2xl font-bold leading-normal text-yellow-400 pt-8">
                  MANAGED IT SUPPORT SERVICES{" "}
                  <Image
                    src="/assets/arrow_icon.png"
                    alt="arrow icon"
                    width={120}
                    height={15}
                  />
                </h4>
                <div className="w-full flex items-center justify-start ml-6 pb-[20px]">
                  <div className="w-52 h-1 bg-[#555be7] mt-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
