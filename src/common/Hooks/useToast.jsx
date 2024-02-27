import { ToastMessage } from "@common/Components";
import { useCallback } from "react";
import { toast } from "react-toastify";

/**
 * Basic used of notification.
 * const toast = useToast({ initialConfig});
 * toast.success('Message.');
 * toast.warning('Message.', 'Description.', {
 *   className: 0,
 * });
 */

const showToastFunction = {};

const useToast = (initialConfig) => {
  const showToast = useCallback(
    ({ type, message, description, config }) => {
      switch (type) {
        case "success":
          return toast.success(<ToastMessage message={message} description={description} />, {
            ...initialConfig,
            ...config,
            className: "bg-green-50",
          });
        case "info":
          return toast.info(<ToastMessage message={message} description={description} />, {
            ...initialConfig,
            ...config,
            className: "bg-blue-50",
          });
        case "warning":
          return toast.warn(<ToastMessage message={message} description={description} />, {
            ...initialConfig,
            ...config,
            className: "bg-yellow-50",
          });
        case "error":
          return toast.error(<ToastMessage message={message} description={description} />, {
            ...initialConfig,
            ...config,
            className: "bg-red-50",
          });
        default:
          return toast(<ToastMessage message={message} description={description} />, {
            ...initialConfig,
            ...config,
            className: "bg-gray-50",
          });
      }
    },
    [initialConfig],
  );

  const showSuccess = useCallback(
    (message, description, config) => showToast({ type: "success", message, description, config }),
    [showToast],
  );
  const showWarning = useCallback(
    (message, description, config) => showToast({ type: "warning", message, description, config }),
    [showToast],
  );
  const handleError = useCallback(
    (message, description, config) => showToast({ type: "error", message, description, config }),
    [showToast],
  );
  const showInfo = useCallback(
    (message, description, config) => showToast({ type: "info", message, description, config }),
    [showToast],
  );

  showToastFunction.success = showSuccess;
  showToastFunction.warning = showWarning;
  showToastFunction.error = handleError;
  showToastFunction.info = showInfo;

  return showToastFunction;
};

export default useToast;
