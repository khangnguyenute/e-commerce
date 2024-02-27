import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { AdminUserManagement } from "../User";
import { AdminBrandManagement } from "../Brand";
import { AdminCategoryManagement } from "../Category";
import { AdminProductManagement } from "../Product";
import { AdminRatingManagement } from "../Rating";
import { AdminVoucherManagement } from "../Voucher";
import { LayoutAdmin } from "src/common/Layout/Admin";
import { Home } from "src/common/Home";

const AdminRoutes = () => {
  return (
    <LayoutAdmin>
      <Routes>
        <Route path="*" element={<Home title="home" />} />
        <Route path="user-management" element={<AdminUserManagement />} />
        <Route path="brand-management" element={<AdminBrandManagement />} />
        <Route path="category-management" element={<AdminCategoryManagement />} />
        <Route path="product-management" element={<AdminProductManagement />} />
        <Route path="rating-management" element={<AdminRatingManagement />} />
        <Route path="voucher-management" element={<AdminVoucherManagement />} />
      </Routes>
    </LayoutAdmin>
  );
};

export default memo(AdminRoutes);
