import React from "react";
import img from "../../../assets/logo-removebg.png";

interface props {
    e: number, 
    index: number
}

const BlogElement: React.FC<props> = ({e, index}) => {
  return (
    <div className={` pt-8 pb-10`} > 
      <div>
        <img
          src="data:image/jpeg;base64,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"
          alt=""
          className=" h-60 w-96 rounded-3xl"
        />
      </div>
      <div className="flex flex-col text-white space-y-3 mt-8">
        <div className=" flex flex-row space-x-5">
          <span className=" text-sm font-thin">Mar 16, 2020</span>
          <span className="text-sm font-normal"> Marketing</span>
        </div>
        <span className=" text-2xl font-bold">Boost your conversation rate</span>
        <div className=" flex flex-row items-center space-x-3">
          <img src={img} alt="" className="h-7 w-7" />
          <span className=" text-lg font-semibold">Blogger name</span>
        </div>
      </div>
    </div>
  );
};

export default BlogElement;
