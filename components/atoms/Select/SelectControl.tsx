import clsx from 'clsx';
import { useMemo } from 'react';
import { components } from 'react-select';

export const SelectControl = (props) => {
  const { selectProps } = props;

  const isError = useMemo(() => !!selectProps.error, [selectProps.error]);
  return (
    <div
      className={clsx(
        'relative z-0 flex items-center rounded-lg border',
        isError ? 'border-error' : 'border-dark-10 ',
        selectProps?.selectControlClassName ? selectProps.selectControlClassName : '',
      )}
    >
      <components.Control className="w-full !border-none !bg-transparent !shadow-none" {...props} />
    </div>
  );
};
