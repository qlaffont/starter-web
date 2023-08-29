import cx from 'classix';
import React from 'react';

export type SpinnerProps = {
  className?: string;
  width: number | string;
  height: number | string;
};

export const Spinner: React.FC<SpinnerProps> = ({ width, height, className }) => (
  <i className={cx(`icon icon-refresh animate bg-dark-blue block w-${width} h-${height}`, className)} />
);
