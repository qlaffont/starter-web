/* eslint-disable react-hooks/rules-of-hooks */
import 'react-international-phone/style.css';

import cx from 'classix';
import { Controller } from 'react-hook-form';
import { PhoneInput as PhoneInputCmp } from 'react-international-phone';

import { useI18n } from '../../i18n/useI18n';
import { translateErrorMessage } from '../../i18n/validation';

export type Props = {
  required?: boolean;

  className?: string;

  placeholder?: string;

  label?: string;
  error?;
  helperText?: string;
};

export const PhoneInput = ({
  name,
  control,
  required = false,
  className,
  label,
  error,
  helperText,
  ...props
}: Partial<Props> & { name: string; control: any }) => {
  const { t } = useI18n();

  const translatedError = translateErrorMessage({ message: error?.message }, t);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onChange, ...fieldProps }, fieldState: { isTouched } }) => {
        return (
          <div className={className}>
            {label && (
              <p className={cx('block pb-1 font-bold', error ? '!text-salmon' : 'text-dark-blue')}>
                {required ? `${label} *` : label}
              </p>
            )}

            <PhoneInputCmp
              defaultCountry={'ae'}
              {...fieldProps}
              {...props}
              value={fieldProps.value || ''}
              onChange={(val) => {
                onChange(val);
              }}
              //@ts-ignore
              inputProps={{ ref, onBlur: fieldProps.onBlur }}
            />

            {((isTouched && !!error) || helperText) && (
              <p
                className={cx(
                  'mt-1 text-sm',
                  error
                    ? '!border-salmon bg-salmon !text-salmon bg-opacity-30 px-2 py-2'
                    : 'text-dark-blue text-opacity-80',
                )}
                dangerouslySetInnerHTML={{
                  __html: translatedError || helperText,
                }}
              ></p>
            )}
          </div>
        );
      }}
    />
  );
};
