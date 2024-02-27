import { Link, matchRoutes, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { memo, useEffect, useState } from "react";

const ProfileSidebarItem = ({ to, icon, text }) => {
  const [isActivated, setIsActivated] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (to === pathname) {
      setIsActivated(true);

      return;
    }

    const toWithoutRole = to.replace(/\/[^/]+/, "");

    if (!toWithoutRole) {
      setIsActivated(false);

      return;
    }

    const toPattern = `${to}/*`;
    const matchedRoutes = matchRoutes([{ path: toPattern }], pathname);

    if (!matchedRoutes) {
      setIsActivated(false);

      return;
    }

    setIsActivated(matchedRoutes.some((matchRoute) => matchRoute.pathname === pathname));
  }, [pathname, to]);

  return (
    <Link
      to={to}
      className={twMerge("flex items-center space-x-2 hover:text-blue-500", isActivated && "text-blue-500")}
    >
      {icon}
      <div>{text}</div>
    </Link>
  );
};

export default memo(ProfileSidebarItem);
