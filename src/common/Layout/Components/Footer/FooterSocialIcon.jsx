import { SocialIcons } from "@common/Components/SocialIcons";
import { memo } from "react";

const FooterSocialIcon = ({ className }) => {
  return (
    <div className={className}>
      <a href="/" target="_blank" rel="noreferrer">
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-blue-500 shadow-md duration-200 hover:bg-blue-500 hover:text-white">
          <SocialIcons hostname="facebook" size={20} />
        </div>
      </a>
      <a href="/" target="_blank" rel="noreferrer">
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-primary-500 shadow-md duration-200 hover:bg-primary-500 hover:text-white">
          <SocialIcons hostname="instagram" size={20} />
        </div>
      </a>
      <a href="/" target="_blank" rel="noreferrer">
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-cyan-500 shadow-md duration-200 hover:bg-cyan-500 hover:text-white">
          <SocialIcons hostname="twitter" size={20} className="mt-1" />
        </div>
      </a>
      <a href="/" target="_blank" rel="noreferrer">
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-blue-500 shadow-md duration-200 last:mr-0 hover:bg-blue-500 hover:text-white">
          <SocialIcons hostname="linkedin" size={20} />
        </div>
      </a>
    </div>
  );
};

export default memo(FooterSocialIcon);
