import { isArray, isObject, snakeCase } from "lodash";
import tailwindDefaultTheme from "tailwindcss/defaultTheme";
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
  if (size === "xs") {
    return 360;
  }
  if (size === "sm") {
    return 512;
  }
  return Number(tailwindDefaultTheme.screens[size].replace("px", ""));
};

const numberFormat = (number, separator = ".") => {
  if (!number) {
    return 0;
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

export { numberFormat, generateFormSchema, getTwScreenWidth, snakelikeNestedObjectKeys };
