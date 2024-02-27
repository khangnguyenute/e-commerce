import { get, isArray, isObject, snakeCase } from "lodash";
import defaultConfig from "tailwindcss/defaultConfig";
import tailwindDefaultTheme from "tailwindcss/defaultTheme";
import resolveConfig from "tailwindcss/resolveConfig";
import { object } from "yup";

const snakelikeNestedObjectKeys = (obj) => {
  const result = {};

  Object.keys(obj).forEach((key) => {
    const newKey = snakeCase(key);
    const value = obj[key];

    if (isObject(value) && !isArray(value)) {
      result[newKey] = snakelikeNestedObjectKeys(value);
      return;
    }

    result[newKey] = value;
  });

  return result;
};

const generateFormSchema = (shape) => object().shape(shape);

const getTwScreenWidth = (size) => {
  return Number(tailwindDefaultTheme.screens[size].replace("px", ""));
};

const getTwThemeConfig = (path) => {
  const config = resolveConfig(defaultConfig);

  if (!path) {
    return config.theme;
  }

  const value = get(config.theme, path);

  if (!value) {
    return null;
  }

  if (typeof value !== "string") {
    return value;
  }

  const relativeValue = value;

  if (value.includes("rem")) {
    return Number(relativeValue.replace("rem", "")) * 16;
  }

  if (value.includes("px")) {
    return Number(relativeValue.replace("px", ""));
  }

  return relativeValue;
};

const beautifyNumber = (number, separator = ".") => {
  if (!number) {
    return 0;
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

export { beautifyNumber, generateFormSchema, getTwScreenWidth, getTwThemeConfig, snakelikeNestedObjectKeys };
