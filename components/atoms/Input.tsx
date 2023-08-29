/* eslint-disable @typescript-eslint/no-empty-function */
import cx from 'classix';
import React, { ComponentPropsWithoutRef, HTMLInputTypeAttribute, PropsWithoutRef, RefAttributes } from 'react';
import { useMemo } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { useSsr } from 'usehooks-ts';

import { useI18n } from '../../i18n/useI18n';
import { translateErrorMessage } from '../../i18n/zod';

const variantClassNames = {
  normal: 'border border-dark-10 focus-within:border-dark-30 rounded-md',
};

const sizeClassNames = {
  medium: '',
  small: '!py-0',
};

const variantInputClassNames: Record<keyof typeof variantClassNames, string> = {
  normal:
    'peer h-10 w-full text-white dark:text-black focus:outline-none bg-transparent !border-0 outline-none !shadow-none !ring-transparent',
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

  const translatedError = error?.message ? translateErrorMessage({ message: error?.message }, t) : '';

  if (!!error && !translatedError) console.warn(`No translation was found for the key '${error.message}'`);

  return (
    <div className={cx('relative block max-w-xl', className)}>
      {label && (
        <label
          htmlFor={name}
          className={cx(
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
        className={cx(
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
              className={cx(
                'icon bg-dark-100 block h-5 w-5',
                `icon-${prefixIcon}`,
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
            type={type}
            className={cx(
              'px-0',
              variantInputClassNames[variant],
              sizeInputClassNames[size],
              disabled ? 'cursor-not-allowed' : '',
              props.contentEditable === false && 'cursor-default caret-transparent',
              inputClassName,
            )}
            disabled={disabled}
            placeholder={placeholder || ''}
            {...register}
            {...props}
          />
        </div>
        {suffixIcon && (
          <div>
            <i
              className={cx(
                'icon block h-5 w-5 bg-white',
                `icon-${suffixIcon}`,
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
          className={cx('mt-1 text-sm', isError ? '!border-error !text-error' : 'text-white text-opacity-80')}
          dangerouslySetInnerHTML={{ __html: error! || helperText }}
        ></p>
      )}
    </div>
  );
};

type PasswordInputProps = InputProps & {
  isVisible: boolean;
  onVisibilityClick: () => void;
  hideAutofill?: boolean;
};

export const PasswordInput = ({ isVisible, onVisibilityClick, hideAutofill, ...props }: PasswordInputProps) => {
  const { isBrowser } = useSsr();
  const isChrome = useMemo(() => {
    if (!isBrowser) {
      return false;
    }

    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  }, [isBrowser]);

  return (
    <Input
      type={isVisible ? 'text' : hideAutofill && isChrome ? 'text' : 'password'}
      autoComplete={hideAutofill ? 'off' : props.autoComplete}
      suffixIcon={cx('icon', isVisible ? 'icon-eye' : 'icon-eye-off')}
      suffixIconClassName={cx(!isVisible && 'mt-4', 'cursor-pointer')}
      onSuffixClick={onVisibilityClick}
      inputClassName={cx(props.inputClassName || '', hideAutofill && !isVisible && isChrome ? 'text-security' : '')}
      {...props}
    />
  );
};
