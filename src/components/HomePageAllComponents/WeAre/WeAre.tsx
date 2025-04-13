"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const WeAre = () => {
  // const videoRef = useRef<HTMLVideoElement>(null);

  // useEffect(() => {
  //   // Auto-play the video when component mounts
  //   if (videoRef.current) {
  //     videoRef.current.play().catch((error) => {
  //       console.error("Video autoplay failed:", error);
  //     });
  //   }
  // }, []);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);
  const features = [
    {
      id: 1,
      icon: "/assets/weAre/simplifyProject.png",
      title: "Simplify Project Management:",
      description:
        "Streamlining low voltage integration for efficient project completion.",
    },
    {
      id: 2,
      icon: "/assets/weAre/ensureNationwide.png",
      title: "Ensure Nationwide Consistency:",
      description:
        "Delivering standardized quality and performance across all locations.",
    },
    {
      id: 3,
      icon: "/assets/weAre/optimizeProject.png",
      title: "Optimize Project Budgets:",
      description:
        "Providing cost-effective solutions without compromising quality.",
    },
    {
      id: 4,
      icon: "/assets/weAre/simplifyProject.png",
      title: "Meet Tight Deadlines:",
      description:
        "Leveraging our extensive resources and expertise for timely project completion.",
    },
    {
      id: 5,
      icon: "/assets/weAre/provideExprt.png",
      title: "Provide Expert Collaboration:",
      description:
        "Seamlessly working alongside your team for successful integration.",
    },
  ];

  return (
    <div id="about_us" className="container py-10 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-400 leading-normal">
          WE ARE
        </h2>
        <p className="text-base sm:text-lg font-bold text-[#555be7] leading-normal">
          Your Nationwide Partner for Seamless Low Voltage Integration
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-4 pb-6 sm:pb-8">
          <p className="w-full sm:max-w-xl lg:max-w-2xl text-sm sm:text-[15px] font-normal text-black leading-tight pt-4 sm:pt-[15px]">
            Dyson IT Works is America&apos;s leading low voltage cabling
            company, specializing in partnering with general contractors and
            business owners across the nation. We understand the complexities of
            large-scale projects and provide consistent, high-quality solutions,
            no matter the location. Our comprehensive content services are
            designed to:
          </p>
          <button className="text-sm sm:text-base font-semibold leading-normal text-white bg-[#555be7] py-1 px-4 rounded-full w-fit">
            Get a Quote
          </button>
        </div>

        {/* Features and Image Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 sm:gap-4 lg:gap-6">
          {/* Features List */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-1">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center gap-1"
              >
                <div className="flex-shrink-0 w-16 sm:w-20 md:w-24">
                  <Image
                    src={feature.icon || "/placeholder.svg"}
                    alt={feature.title}
                    width={100}
                    height={20}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-xs sm:text-sm font-normal text-black leading-tight">
                  <strong className="font-bold text-[#555be7]">
                    {feature.title}
                  </strong>{" "}
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Image/Video Section */}
          <div className="sm:col-span-1 lg:col-span-4 ">

            <div className=" top-1/4 xl:top-0 relative pb-[260px] md:pb-0">
              {/* Background Video */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-[253px] md:w-[270px] xl:w-[500px] h-[190px] md:h-[180px] xl:h-[310px] -mt-0 lg:mt-[30px] ml-[50px] lg:ml-[98px] object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="https://res.cloudinary.com/dlph0bwik/video/upload/v1744520742/x6b705qdifzgq5kkngvd.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Optional overlay to improve text readability if you add content */}
              <div className="absolute inset-0 ">
                <Image
                  src="/assets/weAre/laptop.png"
                  alt="Background"
                  width={700}
                  height={300}
                />
              </div>

              {/* Content container - add your content here */}
              <div className="relative z-10 h-full flex items-center justify-center text-white">
                {/* Your content goes here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeAre;
