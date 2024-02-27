import { memo } from "react";

const SectionHeader = ({ title, image }) => {
  return (
    <>
      {image && <img src={image} alt="" className="object-fit h-48 w-full cursor-pointer" />}
      {title && <div className="w-full text-center text-5xl font-bold uppercase text-white">{title}</div>}
    </>
  );
};

export default memo(SectionHeader);
