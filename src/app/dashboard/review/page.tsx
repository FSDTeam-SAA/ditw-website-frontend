import React from "react";
import ReviewHeading from "./_components/ReviewHeading";
import AllReviewData from "./_components/AllReviewData";
import ReviewCartBackground from "./_components/ReviewCart";

const Page = () => {
  return (
    <div>
      <ReviewHeading />
      <ReviewCartBackground />

      <AllReviewData/>
    </div>
  );
};

export default Page;
