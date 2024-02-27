import { RATING_PATH } from "../Constants";
import { axiosInstance } from "@utils/Axios";

const getRatings = async (params) => {
  const response = await axiosInstance.get(RATING_PATH.RATINGS, { params });

  return {
    data: response.data.data,
    meta: {
      total: response.data.total,
    },
  };
};

const getRatingsByProductId = async (productId) => {
  const response = await axiosInstance.get(RATING_PATH.RATING_PRODUCT_ID_PATH(productId));
  return {
    data: response.data.data,
    meta: {
      total: response.data.total,
    },
  };
};

const createRating = async (data) => {
  const response = await axiosInstance.post(RATING_PATH.RATING, data);

  return response;
};

const updateRatingById = async (id, data) => {
  const response = await axiosInstance.put(RATING_PATH.RATING_ID_PATH(id), data);

  return response;
};

const addDiscussRating = async (id, data) => {
  const response = await axiosInstance.put(RATING_PATH.DISCUSS_RATING_ID_PATH(id), data);

  return response;
};

const deleteRatingById = async (id) => {
  let response = await axiosInstance.delete(RATING_PATH.RATING_ID_PATH(id));

  return response;
};

export {
  getRatings,
  getRatingsByProductId,
  createRating,
  updateRatingById,
  addDiscussRating,
  deleteRatingById,
};
