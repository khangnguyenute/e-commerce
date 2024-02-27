import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";

import ModalContent from "./ModalContent";

const Modal = (
  {
    isOpen,
    isShowLine,
    isShowHeader = true,
    isShowFooter,
    isAllowSubmit,
    isFormModal,
    isLoading,
    title,
    children,
    className,
    headerClassName,
    containerClassName,
    contentContainerClassName,
    isShowCancelButton,
    isShowConfirmButton,
    onClose,
    onConfirm,
  },
  ref,
) => {
  const modalVariants = {
    hidden: {
      transform: "scale(0.95)",
      opacity: 0,
      transition: {
        delay: 0.1,
      },
    },
    visible: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      transform: "scale(0.95)",
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {isOpen && (
        <Dialog
          ref={ref}
          open={isOpen}
          as="div"
          className="fixed inset-0 z-50 overflow-y-hidden"
          onClose={onClose}
        >
          <div className="flex max-h-full w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0,
                delay: 0,
                ease: "easeIn",
                times: [0, 0.71, 0.2, 1.01],
              }}
            >
              <Dialog.Overlay className="fixed inset-0 z-0 bg-black bg-opacity-75 transition-opacity" />
            </motion.div>

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex min-h-screen w-full min-w-84 overflow-y-auto py-6 scrollbar-none"
            >
              <div className={twMerge("relative z-20 flex w-full md:m-auto md:rounded-xl", className)}>
                <div
                  className={twMerge(
                    "mx-auto my-auto h-fit w-full max-w-md rounded-lg bg-white sm:w-200 sm:max-w-none",
                    containerClassName,
                  )}
                >
                  {isFormModal ? (
                    <form onSubmit={onConfirm}>
                      <ModalContent
                        isShowLine={isShowLine}
                        isShowHeader={isShowHeader}
                        isShowFooter={isShowFooter}
                        isAllowSubmit={isAllowSubmit}
                        isLoading={isLoading}
                        title={title}
                        className={className}
                        headerClassName={headerClassName}
                        contentContainerClassName={contentContainerClassName}
                        isShowCancelButton={isShowCancelButton}
                        isShowConfirmButton={isShowConfirmButton}
                        onClose={onClose}
                        onConfirm={onConfirm}
                      >
                        {children}
                      </ModalContent>
                    </form>
                  ) : (
                    <div>
                      <ModalContent
                        isShowLine={isShowLine}
                        isShowHeader={isShowHeader}
                        isShowFooter={isShowFooter}
                        isAllowSubmit={isAllowSubmit}
                        isLoading={isLoading}
                        title={title}
                        className={className}
                        headerClassName={headerClassName}
                        contentContainerClassName={contentContainerClassName}
                        isShowCancelButton={isShowCancelButton}
                        isShowConfirmButton={isShowConfirmButton}
                        onClose={onClose}
                        onConfirm={onConfirm}
                      >
                        {children}
                      </ModalContent>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default memo(forwardRef(Modal));
