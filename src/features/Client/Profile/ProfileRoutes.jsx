import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { ProfileAccount } from "@client/Profile/Account";
import { ProfileOrderHistory } from "@client/Profile/OrderHistory";
import { ProfileAddress } from "@client/Profile/Address";
import { ProfileFavorite } from "@client/Profile/Favorite";
import ProfileOrderHistoryDetail from "./OrderHistory/Components/Detail";
import ProfileAccountSecurityModification from "./Account/Security/Modification";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="account/edit/:tab" element={<ProfileAccountSecurityModification />} />
      <Route path="account/*" element={<ProfileAccount />} />
      <Route path="address" element={<ProfileAddress />} />
      <Route path="favorite" element={<ProfileFavorite />} />
      <Route path="order-history/:tab" element={<ProfileOrderHistory />} />
      <Route path="order-history/:tab/:orderId" element={<ProfileOrderHistoryDetail />} />
      <Route path="order-history/*" element={<ProfileOrderHistory tab="all" />} />
      <Route path="*" element={<ProfileAccount />} />
    </Routes>
  );
};

export default memo(ProfileRoutes);
