import clsx from 'clsx';
import React from 'react';
import { useMemo } from 'react';
import { RefCallBack } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import ReactSelectCmp from 'react-select';
import ReactSelectAsyncCmp from 'react-select/async';
import ReactSelectAsyncCreatableCmp from 'react-select/async-creatable';
import ReactSelectCreatableCmp from 'react-select/creatable';

import { useI18n } from '../../../i18n/useI18n';
import { InputSize } from '../Input';
import { SelectClearIndicator } from './SelectClearIndicator';
import { SelectControl } from './SelectControl';
import { SelectDefaultOptionComponent } from './SelectDefaultOptionComponent';
import { SelectDropdownIndicator } from './SelectDropdownIndicator';
import { SelectIndicatorSeparator } from './SelectIndicatorSeperator';
import { SelectInput } from './SelectInput';
import { SelectMenu } from './SelectMenu';
import { SelectPlaceholder } from './SelectPlaceholder';
import { SelectSingleValue } from './SelectSingleValue';
import { SelectValueContainer } from './SelectValueContainer';

export interface SelectOption {
  label: string;
  value: unknown;
}

type Props = {
  async?: boolean;
  creatable?: boolean;

  isSearchable?: boolean;
  isClearable?: boolean;

  required?: boolean;
  disabled?: boolean;
  placeholder?: string;

  options?: SelectOption[];
  loadOptions?: (filter: string) => SelectOption[];

  className?: string;
  size?: InputSize;

  label?: string;
  error?;
  helperText?: string;

  value?: unknown;
  selectRef?: RefCallBack;

  inputProps?: Record<string, unknown>;
  hideIndicator?: boolean;

  onChange;
  SingleValueComponent?;
  OptionComponent?;
  instanceId?;
  id?;
};

export const SelectComponent: React.FC<Props> = ({
  async = false,
  creatable = false,
  className = '',
  placeholder = '',
  options = [],
  label,
  size = 'medium',
  error,
  helperText,
  value,
  disabled = false,
  selectRef,
  OptionComponent = SelectDefaultOptionComponent,
  SingleValueComponent = SelectSingleValue,
  required,
  inputProps,
  ...props
}) => {
  const { t } = useI18n();
  const SelectCmp = useMemo(
    () =>
      async
        ? creatable
          ? ReactSelectAsyncCreatableCmp
          : ReactSelectAsyncCmp
        : creatable
        ? ReactSelectCreatableCmp
        : ReactSelectCmp,
    [async, creatable],
  );

  return (
    <div className={clsx(className, 'max-w-xl')}>
      {label && (
        <p className={clsx('block pb-2', error ? '!text-error' : 'text-black dark:text-white')}>
          {required ? `${label} *` : label}
        </p>
      )}
      {/* @ts-ignore */}
      <div className={clsx(disabled ? '!cursor-not-allowed opacity-50' : '')}>
        <SelectCmp
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={typeof document !== 'undefined' ? document?.body : undefined}
          value={options.find((c) => c.value === value)}
          options={options}
          placeholder={placeholder}
          components={{
            Option: OptionComponent,
            Input: SelectInput,
            Placeholder: SelectPlaceholder,
            IndicatorSeparator: SelectIndicatorSeparator,
            DropdownIndicator: SelectDropdownIndicator,
            Control: SelectControl,
            Menu: SelectMenu,
            SingleValue: SingleValueComponent,
            ValueContainer: SelectValueContainer,
            ClearIndicator: SelectClearIndicator,
          }}
          //@ts-ignore
          inputProps={{
            autoComplete: 'off',
            ...inputProps,
          }}
          noOptionsMessage={() => (
            <span className="text-dark-40 text-sm">{t('components.atoms.select.noOptions')}</span>
          )}
          loadingMesszage={() => (
            <span className="text-dark-40 text-sm">{t('components.atoms.select.loading')}...</span>
          )}
          size={size}
          error={error}
          helperText={helperText}
          isDisabled={disabled}
          inputRef={selectRef}
          {...props}
        />
      </div>
      {(!!error || helperText) && (
        <p className={clsx('mt-1 text-sm', error ? '!border-error !text-error' : 'text-dark-60')}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export const Select = ({ name, control, options, required = false, ...props }: Partial<Props> & { name; control }) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { ref, onChange, ...fieldProps } }) => {
      return (
        <SelectComponent
          {...fieldProps}
          options={options}
          selectRef={ref}
          required={required}
          onChange={(val) => onChange(Array.isArray(val) ? val?.map((v) => v.value) : val?.value || undefined)}
          {...props}
          id={name}
          instanceId={name}
        />
      );
    }}
  />
);
