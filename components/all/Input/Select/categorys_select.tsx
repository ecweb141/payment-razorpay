"use client";
import React, { FC, useState } from "react";
import CategorySel from "./CategorySel";
type CategorySelProps = {
  title: string;
  id: string;
  Icon: IconType;
};
import {
  BiPhone,
  BiHeadphone,
  BiMouse,
  BiCableCar,
  BiSolidKeyboard,
} from "react-icons/bi";
// import "./Categories_select.css"; // Import your CSS file for styling
import { IconType } from "react-icons";

const AllCategories: CategorySelProps[] = [
  { title: "Phones", id: "samsungPhones", Icon: BiPhone },
  { title: "Headphones", id: "Boat", Icon: BiHeadphone },
  { title: "Mouse", id: "mouse", Icon: BiMouse },
  { title: "Charging Cables", id: "chargingCables", Icon: BiCableCar },
  { title: "Keyboards", id: "keyboards", Icon: BiSolidKeyboard },
];

type CategoriesSelectProps = {
  changeValue: (cat: CategorySelProps) => void;
};

const CategoriesSelect: FC<CategoriesSelectProps> = ({ changeValue }) => {
  const [selectedProduct, setSelectedProduct] = useState<CategorySelProps>(
    AllCategories[0]
  );

  const setValue = (id: string) => {
    const selectedCategory = AllCategories.find((cat) => cat.id === id);
    if (selectedCategory) {
      setSelectedProduct(selectedCategory);
      if (changeValue) changeValue(selectedCategory);
    }
    console.log(selectedProduct);
  };

  return (
    <div className=" my-8 bg-lime-100 p-8">
      <h4 className="category-title ">Select a Category</h4>
      <div className=" grid grid-cols-2 md:grid-cols-3  gap-8 ">
        {AllCategories.map((cat) => (
          <CategorySel
            key={cat.id}
            title={cat.title}
            id={cat.id}
            Icon={cat.Icon}
            handleChange={setValue}
            selected={selectedProduct.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSelect;
