/* eslint-disable @typescript-eslint/no-empty-function */
import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, HTMLInputTypeAttribute, PropsWithoutRef, RefAttributes } from 'react';
import { useMemo } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { useI18n } from '../../i18n/useI18n';
import { translateErrorMessage } from '../../i18n/validation';

const variantClassNames = {
  normal: 'border border-dark-10 focus-within:border-dark-30 rounded-md',
};

const sizeClassNames = {
  medium: '',
  small: '!py-0',
};

const variantInputClassNames: Record<keyof typeof variantClassNames, string> = {
  normal:
    'peer h-10 w-full text-black dark:text-white focus:outline-none bg-transparent !border-0 outline-none !shadow-none !ring-transparent',
};

const sizeInputClassNames: Record<keyof typeof sizeClassNames, string> = {
  medium: '',
  small: '!h-8',
};

const variantLabelClassNames: Record<keyof typeof variantClassNames, string> = {
  normal: '',
};

const iconVariantClassNames: Record<keyof typeof variantClassNames, string> = {
  normal: 'bg-black',
};

const iconSizeClassNames: Record<keyof typeof sizeClassNames, string> = {
  medium: 'h-4 w-4',
  small: 'h-3 w-3',
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
  type?: HTMLInputTypeAttribute;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  prefixIcon?: string;
  suffixIcon?: string;
  prefixIconClassName?: string;
  suffixIconClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperText?: string;
  disabled?: boolean;
  onPrefixClick?: React.MouseEventHandler<any>;
  onSuffixClick?: React.MouseEventHandler<any>;
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
  onPrefixClick,
  onSuffixClick,
  helperText,
  required,
  ...props
}) => {
  const { t } = useI18n();
  const isError = useMemo(() => {
    return !!error;
  }, [error]);

  return (
    <div className={clsx('relative block max-w-xl', className)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            'text-primary-100 block max-w-xl pb-1 text-sm',
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
                'block',
                `${prefixIcon}`,
                iconVariantClassNames[variant],
                iconSizeClassNames[size],
                prefixIconClassName,
                onPrefixClick ? (disabled ? 'cursor-not-allowed' : 'cursor-pointer') : '',
              )}
              onClick={onPrefixClick}
            />
          </div>
        )}
        <div className="grow">
          <input
            id={name}
            name={name}
            type={type}
            className={clsx(
              'px-0',
              variantInputClassNames[variant],
              sizeInputClassNames[size],
              disabled ? 'cursor-not-allowed' : '',
              props.contentEditable === false && 'cursor-default caret-transparent',
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
                'block',
                `${suffixIcon}`,
                iconVariantClassNames[variant],
                iconSizeClassNames[size],
                suffixIconClassName,
                onSuffixClick ? (disabled ? 'cursor-not-allowed' : 'cursor-pointer') : '',
              )}
              onClick={onSuffixClick}
            />
          </div>
        )}
      </div>
      {(!!error || helperText) && (
        <p
          className={clsx(
            'mt-1 max-w-xl text-sm',
            isError ? '!border-error !text-error' : 'text-white text-opacity-80',
          )}
          dangerouslySetInnerHTML={{
            __html: translateErrorMessage({ message: error?.message }, t, undefined) || helperText,
          }}
        ></p>
      )}
    </div>
  );
};
