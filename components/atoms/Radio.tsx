import React, { ReactNode } from 'react';

export interface RadioProps {
  onChange: (selected: string) => void;
  name?: string;
  label?: string;
  value: string;
  groupValue: string;
  child?: ReactNode;
  onClick?: VoidFunction;
}

const Radio: React.FC<RadioProps> = ({ label, value, onChange, onClick, name, groupValue, child }: RadioProps) => (
  <div
    className="flex flex-row items-center gap-2"
    onClick={() => {
      if (onClick) {
        onClick();
      }
    }}
  >
    <label className="flex cursor-pointer items-center" htmlFor={`${value}`}>
      <input
        type="radio"
        name={name}
        value={`${value}`}
        id={`${value}`}
        onChange={(event) => onChange(event.target.value)}
        checked={value === groupValue}
        className="border-grey-2 text-primary mr-2 h-3.5 w-3.5 cursor-pointer rounded-full outline-none checked:bg-none focus:ring-0 focus:ring-offset-0"
      />
      {label && <p>{label}</p>}
    </label>
    {child && child}
  </div>
);

export default Radio;
