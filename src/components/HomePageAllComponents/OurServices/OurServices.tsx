import {
  ProjectManagement,
  ServiceDeliveryDataType,
  ServicesBackground,
  ServicesHeading,
  ServicesSupport,
} from "@/components/types/allFrontendDataType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ourServiceTypeProps = {
  data: ServicesBackground;
  serviceHeading: ServicesHeading;
  projectManagementData: ProjectManagement;
  serviceDeliveryData: ServiceDeliveryDataType;
  serviceSupportData: ServicesSupport;
};

const OurServices: React.FC<ourServiceTypeProps> = ({
  data,
  serviceHeading,
  projectManagementData,
  serviceDeliveryData,
  serviceSupportData,
}) => {

  return (
    <div className="relative overflow-hidden">
      {/* Background image */}
      <div
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Menus/${data?.back_img})`,
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-80" />

      {/* Content - positioned above the overlay with z-index */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="container">
          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
              dangerouslySetInnerHTML={{ __html: serviceHeading?.title || "" }}
            />

            <div className="w-full flex items-center justify-start">
              <div className="w-32 sm:w-40 md:w-60 h-1 bg-blue-600 mt-2" />
            </div>

            <p className="text-lg sm:text-xl text-white font-bold mt-4">
              {serviceHeading?.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
              <div className="sm:max-w-xl">
                <p className="text-sm sm:text-base text-white">
                  {serviceHeading?.description}
                </p>
                <div className="mt-4 w-full flex items-center justify-start gap-5 md:gap-16 lg:gap-20">
                  <p className="w-1/2 text-base sm:text-lg text-white">
                    {serviceHeading?.button_title}
                  </p>
                  <Link href={serviceHeading?.button_url || "#"}>
                    <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 px-6 rounded-full w-fit">
                      {serviceHeading?.button_name}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Services Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ">
            {/* Project Management Section */}
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
                {projectManagementData?.heading}
              </h4>
              <div className="w-full flex items-center justify-start mb-4 sm:mb-6">
                <div className="w-28 sm:w-36 md:w-52 h-1 bg-blue-600" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-3 md:gap-4">
                {/* first  */}
                <div className="flex flex-col">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Body1/${projectManagementData?.img1}`}
                      alt={projectManagementData.title1}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h5 className="text-sm sm:text-base font-bold text-white mt-2 sm:mt-3">
                    {projectManagementData?.title1}
                  </h5>
                  <p className="text-xs sm:text-sm text-white mt-1">
                    {projectManagementData?.description1}
                  </p>
                </div>
                {/* two  */}
                <div className="flex flex-col">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Body1/${projectManagementData?.img2}`}
                      alt={projectManagementData.title2}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h5 className="text-sm sm:text-base font-bold text-white mt-2 sm:mt-3">
                    {projectManagementData?.title2}
                  </h5>
                  <p className="text-xs sm:text-sm text-white mt-1">
                    {projectManagementData?.description2}
                  </p>
                </div>
                {/* threee  */}
                <div className="flex flex-col">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Body1/${projectManagementData?.img3}`}
                      alt={projectManagementData.title3}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h5 className="text-sm sm:text-base font-bold text-white mt-2 sm:mt-3">
                    {projectManagementData?.title3}
                  </h5>
                  <p className="text-xs sm:text-sm text-white mt-1">
                    {projectManagementData?.description3}
                  </p>
                </div>
              </div>
            </div>

            {/* End-to-End Delivery Section */}
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
                {serviceDeliveryData?.heading}
              </h4>
              <div className="w-full flex items-center justify-start mb-4 sm:mb-6">
                <div className="w-28 sm:w-36 md:w-52 h-1 bg-blue-600" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-3 md:gap-4 ">
                {/* first  */}
                <div className="flex flex-col">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Homes/${serviceDeliveryData?.img1}`}
                      alt={serviceDeliveryData?.title1}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h5 className="text-sm sm:text-base font-bold text-white mt-2 sm:mt-3">
                    {serviceDeliveryData?.title1}
                  </h5>
                  <p className="text-xs sm:text-sm text-white mt-1">
                    {serviceDeliveryData?.description1}
                  </p>
                </div>
                {/* two  */}
                <div className="flex flex-col">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Homes/${serviceDeliveryData?.img2}`}
                      alt={serviceDeliveryData?.title2}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h5 className="text-sm sm:text-base font-bold text-white mt-2 sm:mt-3">
                    {serviceDeliveryData?.title2}
                  </h5>
                  <p className="text-xs sm:text-sm text-white mt-1">
                    {serviceDeliveryData?.description2}
                  </p>
                </div>
                {/* threee  */}
                <div className="flex flex-col">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Homes/${serviceDeliveryData?.img3}`}
                      alt={serviceDeliveryData?.title3}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h5 className="text-sm sm:text-base font-bold text-white mt-2 sm:mt-3">
                    {serviceDeliveryData?.title3}
                  </h5>
                  <p className="text-xs sm:text-sm text-white mt-1">
                    {serviceDeliveryData?.description3}
                  </p>
                </div>
                {/* four  */}
                <div className="flex flex-col">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Homes/${serviceDeliveryData?.img4}`}
                      alt={serviceDeliveryData?.title4}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h5 className="text-sm sm:text-base font-bold text-white mt-2 sm:mt-3">
                    {serviceDeliveryData?.title4}
                  </h5>
                  <p className="text-xs sm:text-sm text-white mt-1">
                    {serviceDeliveryData?.description4}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Managed IT Support */}
          <div className="mt-10 sm:mt-12 flex flex-col items-center sm:items-start">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <h4 className="text-xl sm:text-2xl font-bold text-yellow-400 text-center sm:text-left">
                {serviceSupportData?.title}
              </h4>
              <div className="relative w-24 h-6 sm:w-28 md:w-32 md:h-8">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Body2/${serviceSupportData?.icon}`}
                  alt="arrow icon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center sm:justify-start">
              <div className="w-40 sm:w-60 h-1 bg-blue-600 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
