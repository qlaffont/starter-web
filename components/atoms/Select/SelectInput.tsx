import cx from 'classix';
import React from 'react';

import { Input } from '../Input';

export const SelectInput = (props) => {
  return (
    <Input
      variant="transparent"
      size={props.selectProps.size}
      className={cx('border-none !bg-transparent !shadow-none !outline-none !ring-transparent')}
      placeholder={
        props.selectProps.value && props.selectProps.value !== 'none' ? undefined : props.selectProps.placeholder
      }
      disabled={props.isDisabled}
      id={props.id}
      inputRef={props.innerRef}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onFocus={props.onFocus}
      type={props.type}
      value={props.value}
      {...(props?.selectProps?.inputProps || {})}
    />
  );
};
