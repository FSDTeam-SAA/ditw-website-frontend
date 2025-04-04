import Image from "next/image";
import React from "react";

const WeAre = () => {
  return (
    <div className="container">
      <div>
        <h2 className="text-4xl font-bold text-amber-400 leading-normal">
          WE ARE
        </h2>
        <p className="text-lg font-bold text-[#555be7] leading-normal">
          Your Nationwide Partner for Seamless Low Voltage Integration{" "}
        </p>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-[14px]">
          <p className="w-3/5 text-[15px] font-normal text-black leading-tight pt-[15px]">
            Dyson IT Works is America&apos;s leading low voltage cabling
            company, specializing in partnering with general contractors and
            business owners across the nation. We understand the complexities of
            large-scale projects and provide consistent, high-quality solutions,
            no matter the location. Our comprehensive content services are
            designed to:{" "}
          </p>
          <button className="text-base font-semibold leading-normal text-white bg-[#555be7] py-1 px-4 rounded-full">
            Get a Quote
          </button>
        </div>
        {/* second part  */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          <div className="md:col-span-3">
            <div className="flex items-center gap-[29px]">
              <Image
                src="/assets/weAre/simplifyProject.png"
                alt="icon"
                width={100}
                height={20}
              />
              <p className="text-sm font-normal text-black leading-tight">
                <strong className="font-bold text-[#555be7]">
                  Simplify Project Management:
                </strong>{" "}
                Streamlining low voltage integration for efficient project
                completion.{" "}
              </p>
            </div>
            <div className="flex items-center gap-[29px]">
              <Image
                src="/assets/weAre/ensureNationwide.png"
                alt="icon"
                width={100}
                height={20}
              />
              <p className="text-sm font-normal text-black leading-tight">
                <strong className="font-bold text-[#555be7]">
                  Ensure Nationwide Consistency:
                </strong>{" "}
                Delivering standardized quality and performance across all
                locations.
              </p>
            </div>
            <div className="flex items-center gap-[29px]">
              <Image
                src="/assets/weAre/optimizeProject.png"
                alt="icon"
                width={100}
                height={20}
              />
              <p className="text-sm font-normal text-black leading-tight">
                <strong className="font-bold text-[#555be7]">
                  Optimize Project Budgets:
                </strong>{" "}
                Providing cost-effective solutions without compromising quality.
              </p>
            </div>
            <div className="flex items-center gap-[29px]">
              <Image
                src="/assets/weAre/simplifyProject.png"
                alt="icon"
                width={100}
                height={20}
              />
              <p className="text-sm font-normal text-black leading-tight">
                <strong className="font-bold text-[#555be7]">
                  Meet Tight Deadlines:
                </strong>{" "}
                Leveraging our extensive resources and expertise for timely
                project completion. voltage integration for efficient project
                completion.{" "}
              </p>
            </div>
            <div className="flex items-center gap-[29px]">
              <Image
                src="/assets/weAre/provideExprt.png"
                alt="icon"
                width={100}
                height={20}
              />
              <p className="text-sm font-normal text-black leading-tight">
                <strong className="font-bold text-[#555be7]">
                  Provide Expert Collaboration:
                </strong>{" "}
                Seamlessly working alongside your team for successful
                integration.
              </p>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url("/assets/weAre/laptop.png")` }}
            className="md:col-span-4 bg-cover bg-no-repeat bg-center h-[400px] w-full"
          >
            {/* monir comment  */}
            {/* <video
            //   autoPlay
              muted
              loop
            >
              <source  src="/assets/weAre/weAre.mp4" type="video/mp4" />
            </video> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeAre;
