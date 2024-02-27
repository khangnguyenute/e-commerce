import { FiTrash2 } from "react-icons/fi";
import { memo, useCallback, useState } from "react";
import { isEmpty } from "lodash";
import { BsDatabaseExclamation } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { InformationModal } from "@common/Components/Modal";

const AdminRatingTableDiscussColumn = ({ selectedRating }) => {
  const [isShowDiscussDetailModal, setIsShowDiscussDetailModal] = useState(false);

  const handleClickViewDiscuss = useCallback(() => {
    setIsShowDiscussDetailModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowDiscussDetailModal(false);
  }, []);

  return (
    <div className=" min-w-[100px]">
      <div className="text-blue-500" onClick={handleClickViewDiscuss}>
        {selectedRating.discuss.length} phản hồi
      </div>

      <InformationModal
        isOpen={isShowDiscussDetailModal}
        className="w-full"
        title={
          <div className="flex items-center space-x-4">
            <span>Chi tiết phản hồi đánh giá</span>
            <span className="font-semibold text-red-500">{selectedRating._id}</span>
          </div>
        }
        onClose={handleCloseModal}
      >
        <div
          className={twMerge(
            "mx-auto h-[300px] w-full rounded-xl border-2 px-6 text-center text-base",
            !isEmpty(selectedRating.discuss) && "overflow-y-scroll",
          )}
        >
          {isEmpty(selectedRating.discuss) ? (
            <div className="flex h-full flex-col items-center justify-center text-xl">
              No data
              <BsDatabaseExclamation size={60} className="mt-4" />
            </div>
          ) : (
            <table>
              <thead className="font-bold text-gray-900">
                <td className="w-[100px]">ID</td>
                <td className="w-[150px]">User</td>
                <td className="w-[300px]">Content</td>
              </thead>
              <tbody>
                {selectedRating.discuss?.map((item, index) => {
                  return (
                    <tr key={index} className="w-full">
                      <td className="">
                        <p className="w-[100px] truncate">{item._id}</p>
                      </td>
                      <td className="w-[150px] py-4 text-gray-900">
                        <p className="whitespace-normal break-words font-medium">
                          {item.currentUser.fullname}
                        </p>
                      </td>
                      <td className="w-[300px] text-gray-900">
                        <p className="whitespace-normal break-words">{item.content}</p>
                      </td>
                      <td className="text-gray-900 ">
                        <div className="text-red-500">
                          <FiTrash2 size={16} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </InformationModal>
    </div>
  );
};

export default memo(AdminRatingTableDiscussColumn);
