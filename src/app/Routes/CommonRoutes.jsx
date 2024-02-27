import { LoadingOverlay } from "@common/Components";
import { AUTH_PATH } from "@constants/routeConstant";
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
          return dispatch(setUser(data));
        })
        .catch(() => {
          if (isMatchedExcludeRedirectPath) {
            return;
          }
          const from = location.pathname;
          navigate(`${AUTH_PATH.LOGIN}?from=${from}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch, excludeGetUserPaths, excludeRedirectPaths, location.pathname, navigate, user]);

  // useLayoutEffect(() => {
  //   setIsLoading(true);

  //   if (localUser) {
  //     if (!user) {
  //       dispatch(setUser(JSON.parse(localUser)));
  //     }
  //     setIsLoading(false);
  //     return;
  //   }

  //   const isMatchedExcludeRedirectPath = excludeRedirectPaths.some((path) =>
  //     matchPath(path, location.pathname),
  //   );

  //   if (!isMatchedExcludeRedirectPath) {
  //     const from = location.pathname;
  //     navigate(`${AUTH_PATH.LOGIN}?from=${from}`);
  //   }
  //   setIsLoading(false);
  // }, [dispatch, excludeRedirectPaths, isLoading, localUser, location, navigate, user]);

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
