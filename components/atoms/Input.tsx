/* eslint-disable @typescript-eslint/no-empty-function */
import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, PropsWithoutRef, RefAttributes } from 'react';
import { useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const variantClassNames = {
  transparent: 'w-full',
  normal: 'border border-dark-10 focus-within:border-dark-30 rounded-md',
};

const sizeClassNames = {
  medium: '',
  small: '!py-0',
};

const variantInputClassNames: Record<keyof typeof variantClassNames, string> = {
  transparent:
    'peer h-10 w-full text-black dark:text-white placeholder-transparent focus:placeholder-dark-10 focus:outline-none bg-transparent !border-0 outline-none !shadow-none !ring-transparent',
  normal:
    'peer h-10 w-full text-black dark:text-white focus:outline-none bg-transparent !border-0 outline-none !shadow-none !ring-transparent',
};

const sizeInputClassNames: Record<keyof typeof sizeClassNames, string> = {
  medium: '',
  small: '!h-8',
};

const variantLabelClassNames: Record<keyof typeof variantClassNames, string> = {
  transparent: '',
  normal: '',
};

export type InputSize = keyof typeof sizeClassNames;

//@ts-ignore
export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  placeholder?: string;
  name?: string;
  variant?: keyof typeof variantClassNames;
  size?: InputSize;
  className?: string;
  type?: string;
  error?;
  register?: UseFormRegisterReturn;
  prefixIcon?: string;
  suffixIcon?: string;
  prefixIconClassName?: string;
  suffixIconClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperText?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<any>;
  inputRef?: React.LegacyRef<HTMLInputElement>;
}

export const Input: React.FC<PropsWithoutRef<InputProps> & RefAttributes<HTMLInputElement>> = ({
  label,
  name = 'input',
  placeholder,
  prefixIcon,
  suffixIcon,
  prefixIconClassName = '',
  suffixIconClassName = '',
  labelClassName = '',
  disabled,
  className,
  inputClassName,
  type = 'text',
  variant = 'normal',
  size = 'medium',
  error,
  register = {},
  inputRef,
  onClick,
  helperText,
  required,
  ...props
}) => {
  const isError = useMemo(() => {
    return !!error;
  }, [error]);

  return (
    <div className={clsx('relative block max-w-xl', className)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            'block pb-1 text-black dark:text-white',
            variantLabelClassNames[variant],
            isError ? ' !text-error' : '',
            labelClassName,
          )}
        >
          {label}
          {required && <span> *</span>}
        </label>
      )}

      <div
        className={clsx(
          'flex w-full items-center gap-2 px-2 ',
          variantClassNames[variant],
          sizeClassNames[size],
          disabled ? 'opacity-30' : '',
          isError ? '!border-error ' : '',
        )}
      >
        {prefixIcon && (
          <div>
            <i
              className={clsx(
                'icon bg-dark-100 block h-5 w-5',
                `icon-${prefixIcon}`,
                prefixIconClassName,
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
              onClick={onClick}
            />
          </div>
        )}
        <div className="flex-grow">
          <input
            id={name}
            name={name}
            type={type}
            className={clsx(
              'px-0',
              variantInputClassNames[variant],
              sizeInputClassNames[size],
              'placeholder-white placeholder-opacity-60',
              disabled ? 'cursor-not-allowed' : '',
              inputClassName,
            )}
            disabled={disabled}
            placeholder={placeholder || ''}
            ref={inputRef}
            {...register}
            {...props}
          />
        </div>
        {suffixIcon && (
          <div>
            <i
              className={clsx(
                'icon block h-5 w-5 bg-white',
                `icon-${suffixIcon}`,
                suffixIconClassName,
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
              onClick={onClick}
            />
          </div>
        )}
      </div>
      {(!!error || helperText) && (
        <p
          className={clsx('mt-1 text-sm', isError ? '!border-error !text-error' : 'text-white text-opacity-80')}
          dangerouslySetInnerHTML={{ __html: error || helperText }}
        ></p>
      )}
    </div>
  );
};
