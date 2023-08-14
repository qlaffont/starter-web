import clsx from 'clsx';
import React from 'react';

type Props = {
  level: 'success' | 'error';
  title: string;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  icon?: string;

  className?: string;
};

export type SnackBarProps = React.PropsWithChildren<Props>;

const SnackBar = ({ level, title, message, isOpen, icon, className, children, onClose }: SnackBarProps) => {
  if (!isOpen) return <></>;

  return (
    <div
      className={clsx(
        'flex h-10 w-full items-center justify-center',
        level === 'error' ? 'bg-red-30' : 'bg-white',
        className,
      )}
    >
      <div className="flex items-center justify-center gap-3">
        <i
          className={clsx(
            'icon h-3 w-3',
            icon ? icon : level === 'error' ? 'icon-caution bg-red-100' : 'icon-check bg-green-100',
            className,
          )}
        />
        <p className={clsx('text-xs font-semibold', level === 'error' ? 'text-red-100' : 'text-green-100')}>{title}</p>
        {message && <p className="text-xs">{message}</p>}
        {children}
        <i className="icon icon-x bg-primary-100 h-2 w-2 cursor-pointer" onClick={onClose} />
      </div>
    </div>
  );
};

export default SnackBar;
