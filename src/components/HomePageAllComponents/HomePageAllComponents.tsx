"use client";
import React from "react";
import Banner from "./Banner/Banner";
import WeAre from "./WeAre/WeAre";
import OurServices from "./OurServices/OurServices";
import ContactUs from "./ContactUs/ContactUs";
import ManagedService from "./ManagedService/ManagedService";
import Navbar from "../shared/Navbar/Navbar";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { AllHomeDataResponse } from "../types/allFrontendDataType";

const HomePageAllComponents = () => {
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;
  console.log(token);

  const { data } = useQuery<AllHomeDataResponse>({
    queryKey: ["all-data"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/frontend-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    enabled: !!token,
  });
  console.log(data?.navbar);

  const homeId = data?.navbar?.[0]?.itemlink1?.replace("#", "") || "";
  const aboutUsId = data?.navbar?.[0]?.itemlink2?.replace("#", "") || "";
  const serviceId = data?.navbar?.[0]?.itemlink3?.replace("#", "") || "";
  const contactUsId = data?.navbar?.[0]?.itemlink4?.replace("#", "") || "";

  return (
    <div>
      <section className="sticky top-0 z-50">
        <Navbar data={data?.navbar?.[0]} />
      </section>

      <section id={homeId}>
        <Banner data={data?.banner?.[0]} />
      </section>

      <section id={aboutUsId}>
        <WeAre
          data={data?.about?.[0]}
          aboutUsSecondData={data?.aboutsec2?.[0]}
        />
      </section>

      <section id={serviceId}>
        <OurServices />
      </section>

      <section>
        <ManagedService />
      </section>

      <section id={contactUsId}>
        <ContactUs data={data?.address?.[0]} />
      </section>
    </div>
  );
};

export default HomePageAllComponents;
