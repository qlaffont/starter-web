import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useMemo } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  hideModal: () => void;
}

interface Props extends ModalProps {
  isOpen: boolean;
  hideModal: () => void;
  closeText: string;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
}

export const Modal = ({
  isOpen,
  hideModal,
  closeText,
  children,
  canGoNext,
  canGoPrevious,
  onPreviousClick,
  onNextClick,
}: React.PropsWithChildren<Props>) => {
  const { width, height } = useWindowSize();

  const modalIsOpen = useMemo(() => {
    if ((width && width < 1024) || (height && height < 768)) {
      return false;
    }

    return isOpen;
  }, [isOpen, width, height]);
  return (
    <Transition show={modalIsOpen} as={Fragment}>
      <Dialog as="div" static className="relative z-50" open={modalIsOpen} onClose={hideModal}>
        <div className="flex min-h-screen items-end justify-center px-1 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#06080D] bg-opacity-50 transition-opacity" onClick={hideModal} />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform text-left align-middle transition-all">
                  <div className="flex w-full items-center gap-3">
                    <div className="h-11 w-11">
                      {canGoPrevious ? (
                        <Button
                          variant="borderGray100"
                          prefixIcon="icon icon-chevron-down rotate-90 !bg-primary-100 !h-6 !w-6"
                          className="h-11 w-11 bg-white !px-2 leading-none hover:!opacity-90"
                          onClick={onPreviousClick}
                        ></Button>
                      ) : (
                        <div className="h-11 w-11"></div>
                      )}
                    </div>

                    <div className="grow space-y-3">
                      <div className="flex justify-end">
                        <div>
                          <Button
                            variant="borderGray100"
                            prefixIcon="icon icon-x -rotate-90"
                            className="bg-white leading-none hover:!opacity-90"
                            size="closeModal"
                            onClick={hideModal}
                          >
                            {closeText}
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-md bg-white">{children}</div>
                    </div>

                    <div className="w-11">
                      {canGoNext ? (
                        <Button
                          variant="borderGray100"
                          prefixIcon="icon icon-chevron-down -rotate-90 !bg-primary-100 !h-6 !w-6"
                          className="h-11 w-11 bg-white !px-2 leading-none hover:!opacity-90"
                          onClick={onNextClick}
                        ></Button>
                      ) : (
                        <div className="h-11 w-11"></div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
