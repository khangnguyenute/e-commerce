import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useToast from "@hooks/useToast";
import { v4 as uuidv4 } from "uuid";
import { ratingService } from "@services/index";
import { Button, Input, Star, discussFormSchema } from "@common/Components";
import { BsFillChatDotsFill, BsFillSendPlusFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const DEFAULT_VALUE = {
  content: "",
};

const ProductDetailRatingReviewContent = ({ rating, onGetRatings }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(discussFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const currentUser = useSelector((state) => state.common.user);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentRating, setCurrentRating] = useState();
  const [isExpand, setIsExpand] = useState(false);

  const handleToggleShowDiscuss = useCallback(() => {
    setCurrentRating(rating);
    setIsExpand((pre) => !pre);
  }, [rating]);

  const handleSubmit = useFormSubmit(async (formData) => {
    if (!currentUser) {
      toast.warning(t("doNotLogIn"));
      return;
    }

    const newDiscuss = {
      _id: uuidv4(),
      currentUser,
      ...formData,
    };

    setIsSubmitting(true);
    try {
      await ratingService.addDiscussRating(currentRating?._id, newDiscuss);
      toast.success(t("addDiscussSuccessfully"));
      onGetRatings();
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsSubmitting(false);
      reset(DEFAULT_VALUE);
    }
  });

  useEffect(() => {
    if (!isExpand) {
      return;
    }

    setIsSubmitting(false);
    reset(DEFAULT_VALUE);
  }, [reset, isExpand]);

  return (
    <div className="flex flex-col space-y-4 rounded-xl border bg-white px-4 py-2 shadow-lg">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 font-semibold">
          <div>{rating.user.fullname}</div>
          <Star value={rating.star} />
        </div>
        <p>{rating.content}</p>
        <div
          role="button"
          tabIndex={0}
          className="flex w-fit cursor-pointer items-center space-x-2 text-blue-500 hover:text-blue-700"
          onClick={handleToggleShowDiscuss}
        >
          <div>{rating?.discuss.length}</div>
          <BsFillChatDotsFill />
        </div>
        {isExpand && rating._id === currentRating._id && (
          <div>
            <div className="flex items-center justify-between space-x-4">
              <div className="w-full">
                <Input className="block" size="sm" control={control} disabled={isSubmitting} name="content" />
              </div>
              <Button
                isLoading={isSubmitting}
                size="sm"
                color="blue"
                onClick={handleSubmit}
                className="lg:rounded-md"
              >
                <BsFillSendPlusFill />
              </Button>
            </div>

            <div className="mt-2">
              {rating?.discuss?.reverse()?.map((item, index) => {
                return (
                  <div className="mb-2 rounded-lg border p-3 text-sm shadow-sm" key={index}>
                    <p className="font-bold">{item.currentUser?.fullname}</p>
                    <p>{item.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(ProductDetailRatingReviewContent);
