import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC } from 'react';
import { Fragment, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

const Modal: FC<{
  children;
  isOpen: boolean;
  onClose: (event?: any) => void;
  title?: string;
  onBackClick?: () => void;
}> = ({ children, isOpen, onClose, title = '', onBackClick }) => {
  const closeButtonRef = useRef(null);
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={closeButtonRef}
        open={isOpen}
        onClose={emptyFunction}
      >
        <div className="flex min-h-screen items-end justify-center px-1 text-center sm:block sm:p-0">
          <Dialog.Overlay />
          <div
            className="fixed inset-0 bg-zinc-900 bg-opacity-50 backdrop-blur backdrop-filter transition-opacity"
            onClick={() => onClose()}
          />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="z-10 m-auto inline-block w-full max-w-xl transform rounded-lg bg-zinc-900 text-left align-middle shadow-xl transition-all">
              {/* eslint-disable-next-line react/no-unknown-property */}
              <div className="h-max overflow-auto py-6 px-2 md:px-10" modal-content="true">
                <div className="mb-5 flex justify-between">
                  <span>
                    <i
                      className={clsx(
                        'icon icon-arrow-back block h-6 w-6 cursor-pointer',
                        onBackClick ? 'bg-dark-20' : 'bg-transparent',
                      )}
                      onClick={() => onBackClick && onBackClick()}
                    ></i>
                  </span>
                  <div>
                    <Dialog.Title className="text-2xl font-bold text-white line-clamp-1">{title}</Dialog.Title>
                  </div>
                  <div>
                    <button
                      className="icon icon-close bg-dark-20 block h-6 w-6 cursor-pointer"
                      onClick={onClose}
                      ref={closeButtonRef}
                    ></button>
                  </div>
                </div>
                <div className="text-dark relative z-20 !max-h-full w-full dark:text-white">{children}</div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export const scrollToTopModal = () => {
  document.querySelector('[modal-content]')?.scrollTo({ top: 0, behavior: 'smooth' });
};

export default Modal;
