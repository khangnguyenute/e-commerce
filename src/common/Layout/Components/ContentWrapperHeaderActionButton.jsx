import { Button } from "@common/Components";
import { memo } from "react";
import { MdAdd } from "react-icons/md";

const LayoutContentWrapperHeaderActionButton = ({ icon, label, disabled = false, onClick, ...props }) => {
  return (
    <Button size="sm" className="flex space-x-3 px-6" disabled={disabled} onClick={onClick} {...props}>
      {icon ?? <MdAdd size={20} />}
      <span className="hidden md:block">{label}</span>
    </Button>
  );
};

export default memo(LayoutContentWrapperHeaderActionButton);
