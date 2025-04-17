import React from "react";
import Banner from "./Banner/Banner";
import WeAre from "./WeAre/WeAre";
import OurServices from "./OurServices/OurServices";
import ContactUs from "./ContactUs/ContactUs";
import ManagedService from "./ManagedService/ManagedService";
import Navbar from "../shared/Navbar/Navbar";

const HomePageAllComponents = () => {
  return (
    <div>
      <section className="sticky top-0 z-50">
        <Navbar />
      </section>

      <section>
        <Banner />
      </section>

      <section>
        <WeAre />
      </section>

      <section>
        <OurServices />
      </section>

      <section>
        <ManagedService />
      </section>

      <section>
        <ContactUs />
      </section>
    </div>
  );
};

export default HomePageAllComponents;
