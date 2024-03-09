import { LoadingOverlay } from "@common/Components";
import { setUser } from "@slices/commonSlice";
import { memo, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, matchPath, useLocation, useNavigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "@auth/Routes/AuthRoutes";
import ErrorRoutes from "@common/Error/Routes/ErrorRoutes";
import { isEmpty } from "lodash";
import { authService } from "@services/index";

const CommonRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.common.user);
  const location = useLocation();
  const excludeRedirectPaths = useMemo(() => ["error/*", "auth/*"], []);
  const excludeGetUserPaths = useMemo(() => [], []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (user) {
      setIsLoading(false);
      return;
    }

    const isMatchedExcludeRedirectPath = excludeRedirectPaths.some((path) =>
      matchPath(path, location.pathname),
    );

    if (isMatchedExcludeRedirectPath) {
      authService.removeAccessToken();
      authService.removeLocalUser();
      dispatch(setUser(undefined));
      setIsLoading(false);
      return;
    }

    const isMatchedGetUserExcludePath = excludeGetUserPaths.some((path) =>
      matchPath(path, location.pathname),
    );

    if (isMatchedGetUserExcludePath) {
      setIsLoading(false);
      return;
    }

    if (isEmpty(user)) {
      authService
        .getMe()
        .then((data) => {
          dispatch(setUser(data));
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch, excludeGetUserPaths, excludeRedirectPaths, location.pathname, navigate, user]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Routes>
      <Route path="*" element={<PrivateRoutes />} />
      <Route path="auth/*" element={<AuthRoutes />} />
      <Route path="error/*" element={<ErrorRoutes />} />
    </Routes>
  );
};

export default memo(CommonRoutes);
