import React from "react";
import ReviewHeading from "./_components/ReviewHeading";
import ReviewCart from "./_components/ReviewCart";
import AllReviewData from "./_components/AllReviewData";

const Page = () => {
  return (
    <div>
      <ReviewHeading />
      <ReviewCart />

      <AllReviewData/>
    </div>
  );
};

export default Page;
