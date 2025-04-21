"use client";
import React from "react";
import Banner from "./Banner/Banner";
import WeAre from "./WeAre/WeAre";
import OurServices from "./OurServices/OurServices";
import ContactUs from "./ContactUs/ContactUs";
import ManagedService from "./ManagedService/ManagedService";
import Navbar from "../shared/Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { AllHomeDataResponse } from "../types/allFrontendDataType";

const HomePageAllComponents = () => {
  const { data } = useQuery<AllHomeDataResponse>({
    queryKey: ["all-data"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/frontend-data`).then(
        (res) => res.json()
      ),
  });
  // console.log(data?.navbar);

  const homeId = data?.navbar?.[0]?.itemlink1?.replace("#", "") || "";
  const aboutUsId = data?.navbar?.[0]?.itemlink2?.replace("#", "") || "";
  const serviceId = data?.navbar?.[0]?.itemlink3?.replace("#", "") || "";
  const contactUsId = data?.navbar?.[0]?.itemlink4?.replace("#", "") || "";

  console.log(homeId, aboutUsId, serviceId, contactUsId);

  if (!data) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      {/* navbar  */}
      <section className="sticky top-0 z-50">
        {data?.navbar && data?.navbar?.[0] && (
          <Navbar data={data?.navbar?.[0]} />
        )}
      </section>

      {/* banner  */}
      <section id={homeId}>
        {data?.banner && data?.banner?.[0] && (
          <Banner data={data?.banner?.[0]} />
        )}
      </section>

      {/* we are / about us */}
      <section id={aboutUsId}>
        {data?.about &&
          data?.about?.[0] &&
          data?.aboutsec2 &&
          data?.aboutsec2?.[0] && (
            <WeAre
              data={data?.about?.[0]}
              aboutUsSecondData={data?.aboutsec2?.[0]}
            />
          )}
      </section>

      {/* our services  */}

      <section id={serviceId}>
        {data?.services_background &&
          data?.services_background?.[0] &&
          data?.services_heading &&
          data?.services_heading?.[0] &&
          data?.services_projectmanagement &&
          data?.services_projectmanagement?.[0] &&
          data?.services_delivery &&
          data?.services_delivery?.[0] &&
          data?.services_support &&
          data?.services_support?.[0] && (
            <OurServices
              data={data?.services_background?.[0]}
              serviceHeading={data?.services_heading?.[0]}
              projectManagementData={data?.services_projectmanagement?.[0]}
              serviceDeliveryData={data?.services_delivery?.[0]}
              serviceSupportData={data?.services_support?.[0]}
            />
          )}
      </section>

      {/* managed service  */}
      <section>
        {data?.ourcorevalue &&
          data?.ourcorevalue?.[0] &&
          data?.whychooseus &&
          data?.whychooseus?.[0] &&
          data?.service &&
          data?.service?.[0] &&
          data?.poweredbymrpc &&
          data?.poweredbymrpc?.[0] && (
            <ManagedService
              data={data?.ourcorevalue?.[0]}
              whyChooseUsData={data?.whychooseus?.[0]}
              serviceFeaturesData={data?.service?.[0]}
              poweredByMrpcData={data?.poweredbymrpc?.[0]}
            />
          )}
      </section>

      {/* Contact us  */}
      <section id={contactUsId}>
        {((data?.contact && data?.contact?.[0]) ||
          (data?.address && data?.address?.[0]) ||
          (data?.ourcontact && data?.ourcontact?.[0]) ||
          (data?.footer && data?.footer?.[0]) ||
          (data?.review && data?.review?.[0]) ||
          (data?.reviewBackimg && data?.reviewBackimg?.[0])) && (
          <ContactUs
            data={data?.contact?.[0]}
            addressData={data?.address?.[0]}
            ourContactData={data?.ourcontact?.[0]}
            footerData={data?.footer?.[0]}
            reviewHeadingData={data?.review?.[0]}
            reviewBackImgData={data?.reviewBackimg?.[0]}
          />
        )}
      </section>
    </div>
  );
};

export default HomePageAllComponents;
