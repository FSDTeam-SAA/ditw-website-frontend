import React from "react";
import OurNationwide from "./_components/OurNationwide";
import ProjectManagement from "./_components/ProjectManagement";
import EndToEndDelivery from "./_components/EndToEndDelivery";
import ManagementItSupport from "./_components/ManagementItSupport";
import BackgroundImage from "./_components/BackgroundImage";

const Page = () => {
  return (
    <div>
      <BackgroundImage />
      <OurNationwide />
      <ProjectManagement />
      <EndToEndDelivery />
      <ManagementItSupport />
    </div>
  );
};

export default Page;
