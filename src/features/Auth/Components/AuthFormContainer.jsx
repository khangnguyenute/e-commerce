import { memo } from "react";

const AuthFormContainer = ({ title, subtitle, children, footer }) => {
  return (
    <div className="mb-6 flex sm:pb-10 sm:pt-16">
      <div className="xs:px-4 w-full max-w-screen-sm rounded-2xl border-gray-100 bg-white px-3 py-6 sm:m-auto sm:border-2 sm:px-20 sm:py-12 sm:shadow-md">
        <div className="mb-14 mt-4 md:text-center">
          <div className="text-xl font-bold sm:text-3xl">{title}</div>
          <div className="mt-1 text-sm font-semibold text-gray-400 sm:mt-3 sm:text-base">{subtitle}</div>
        </div>
        {children}
        <div className="text-center sm:mt-4">
          <div className="mb-2 mt-8 text-center sm:mt-14">{footer}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(AuthFormContainer);
