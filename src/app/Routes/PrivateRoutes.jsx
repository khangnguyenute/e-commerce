import AdminRoutes from "@admin/Routes/AdminRoutes";
import ClientRoutes from "@client/Routes/ClientRoutes";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.common.user);

  const isAdmin = useMemo(() => user && user.role === "admin", [user]);
  return (
    <Routes>
      {isAdmin && <Route path="admin/*" element={<AdminRoutes />} />}
      {!isAdmin && <Route path="/*" element={<ClientRoutes />} />}
    </Routes>
  );
};

export default memo(PrivateRoutes);
