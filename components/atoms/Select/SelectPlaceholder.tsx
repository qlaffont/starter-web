/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx';
import { components } from 'react-select';

export const SelectPlaceholder = (props) => {
  return (
    <components.Placeholder {...props} className={props?.selectProps?.placeholder?.length === 0 ? '!hidden' : ''}>
      {!props?.selectProps?.placeholder ? (
        <div className="hidden"></div>
      ) : (
        <p
          className={clsx(
            props?.selectProps?.placeholder?.length === 0 ? '!hidden' : '',
            props?.selectProps?.placeholderClassName || '',
          )}
        >
          {props?.selectProps?.placeholder}
        </p>
      )}
    </components.Placeholder>
  );
};
