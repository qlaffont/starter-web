import clsx from 'clsx';
import React from 'react';

export type SpinnerProps = {
  className?: string;
  width: number | string;
  height: number | string;
};

export const Spinner: React.FC<SpinnerProps> = ({ width, height, className }) => (
  <i className={clsx(`icon icon-refresh animate bg-dark-blue block w-${width} h-${height}`, className)} />
);
