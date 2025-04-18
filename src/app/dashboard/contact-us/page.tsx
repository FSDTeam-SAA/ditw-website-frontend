import React from "react";
import ContactUsHeading from "./_components/ContactUsHeading";
import OurAddress from "./_components/OurAddress";
import OurContact from "./_components/OurContact";
import ContactUsBg from "./_components/ContactUsBg";

const page = () => {
  return (
    <div>
      <ContactUsHeading />
      <OurAddress />
      <OurContact />
      <ContactUsBg/>
    </div>
  );
};

export default page;
