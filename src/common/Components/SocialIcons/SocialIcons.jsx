import { cloneElement, memo } from "react";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { HiOutlineGlobeAlt } from "react-icons/hi";

const SocialIcons = ({ hostname, children, ...props }) => {
  const icons = {
    facebook: <FiFacebook />,
    twitter: <FiTwitter />,
    instagram: <FiInstagram />,
    linkedin: <FiLinkedin />,
    default: <HiOutlineGlobeAlt />,
  };

  return cloneElement(icons[hostname] || icons.default, { ...props }, children);
};

export default memo(SocialIcons);
