import React from "react";
import Banner from "./Banner/Banner";
import WeAre from "./WeAre/WeAre";
import OurServices from "./OurServices/OurServices";
import ContactUs from "./ContactUs/ContactUs";

const HomePageAllComponents = () => {
  return (
    <div>
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
        <ContactUs />
      </section>
    </div>
  );
};

export default HomePageAllComponents;
