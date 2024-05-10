"use client";

import React, { FC } from "react";
import { IconType } from "react-icons";
// import "./CategorySel.css"; // Import your CSS file for styling

export type CategorySelProps = {
  title: string;
  id: string;
  Icon: IconType;
  handleChange: (id: string) => void;
  selected?: string;
};

const CategorySel: FC<CategorySelProps> = ({
  title,
  id,
  Icon,
  handleChange,
  selected,
}) => {
  return (
    <div
      style={{ borderRadius: "8px" }}
      className={`p-12 bg-white cursor-pointer hover:shadow-md placeholder-opacity-80 hover:placeholder-opacity-100  hover:shadow-slate-900 border-2 items-center justify-center  flex flex-col ,${
        selected == id && " shadow-md shadow-amber-800  text-blue-600"
      }`}
      onClick={() => {
        handleChange(id);
      }}
    >
      {<Icon className=" text-2xl md:text-5xl" />}
      <p className=" text-[15px] md:text-[20px] ">{title}</p>
    </div>
  );
};

export default CategorySel;
