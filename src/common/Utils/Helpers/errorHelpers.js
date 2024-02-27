import { AxiosError, isAxiosError } from "axios";
import { camelCase, capitalize, keys, lowerCase } from "lodash";

const showToastError = (error, showError, otherwise) => {
  if (error instanceof AxiosError) {
    const { response } = error;

    if (response?.data?.message) {
      showError(String(error.response?.data?.message));
      return;
    }
  }

  if (error instanceof Error) {
    showError(error.message);
    return;
  }

  showError(otherwise ?? "Something went wrong while performing this action. Please try again later.");
};

const setFormError = (error, setError, formatMessage, otherwise, setFocus) => {
  if (!isAxiosError(error)) {
    otherwise?.();
    return;
  }

  const { response } = error;

  if (!response) {
    otherwise?.();
    return;
  }

  const { errors } = response.data;

  let firstKey = "";

  keys(errors).forEach((key) => {
    const value = errors[key][0];

    if (!firstKey) {
      firstKey = key;
    }

    setError(key, {
      message: formatMessage
        ? formatMessage(camelCase(lowerCase(key)), camelCase(lowerCase(value)))
        : capitalize(value),
    });
  });

  setFocus?.(firstKey);
};

const setFormErrorV2 = ({ error, setError, formatMessage, otherwise, setFocus, getKey }) => {
  if (!isAxiosError(error)) {
    otherwise?.();
    return;
  }

  const { response } = error;

  if (!response) {
    otherwise?.();
    return;
  }

  const { errors } = response.data;

  let firstKey = "";

  keys(errors).forEach((key) => {
    const value = errors[key][0];

    if (!firstKey) {
      firstKey = key;
    }

    const formattedKey = getKey ? getKey(key) : key;

    setError(formattedKey, {
      message: formatMessage
        ? formatMessage(camelCase(lowerCase(key)), camelCase(lowerCase(value)))
        : capitalize(value),
    });
  });

  setFocus?.(firstKey);
};

export { setFormError, setFormErrorV2, showToastError };
