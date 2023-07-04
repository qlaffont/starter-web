import clsx from 'clsx';
import { components } from 'react-select';

export const SelectDefaultOptionComponent = (props) => (
  <components.Option
    className={clsx(
      '!cursor-pointer !py-1 text-sm',
      props.isSelected ? '!bg-dark-40 hover:!bg-dark-40' : '!text-dark-100 hover:!bg-dark-10 !bg-white ',
    )}
    {...props}
  />
);
