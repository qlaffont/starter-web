import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

interface CheckboxProps {
  onChange?: (checked: boolean) => void;
  label?: string;
  value?: boolean;
  indeterminate?: boolean;
  rounded?: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value = true,
  indeterminate = false,
  onChange,
  rounded = false,
  className,
}: CheckboxProps) => {
  const inputRef = useRef();

  useEffect(() => {
    // if (inputRef.current) {
    //   inputRef.current.indeterminate = indeterminate;
    // }
  }, [inputRef, indeterminate]);

  return (
    <>
      {label && <p>{label}</p>}
      <input
        ref={inputRef}
        type="checkbox"
        checked={value}
        onChange={(event) => {
          if (onChange) onChange(event.target.checked);
        }}
        readOnly={onChange == undefined}
        className={clsx(
          rounded ? 'rounded-xl' : 'rounded-md',
          'border-dark-3 h-6 w-6 outline-none',
          'text-primary cursor-pointer focus:ring-0 focus:ring-offset-0',
          'transition duration-300 ease-in-out',
          className,
        )}
      />
    </>
  );
};

export default Checkbox;
