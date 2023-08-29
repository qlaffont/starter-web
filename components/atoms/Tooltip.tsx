/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Popover } from '@headlessui/react';
import { Float } from '@headlessui-float/react';
import React, { useRef } from 'react';
import { useHover } from 'usehooks-ts';

export declare type Alignment = 'start' | 'end';
export declare type Side = 'top' | 'right' | 'bottom' | 'left';
export declare type AlignedPlacement = `${Side}-${Alignment}`;
export declare type Placement = Side | AlignedPlacement;

export default function Tooltip({
  placement = 'top',
  children,
  message,
}: {
  placement?: Placement;
  children: React.ReactNode;
  message: string;
}) {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  return (
    <Popover>
      <Float placement={placement} offset={4} arrow show={isHover}>
        <Popover.Button className="hover:opacity-70">
          <div ref={hoverRef}>{children}</div>
        </Popover.Button>

        <Popover.Panel className="border-dark-3 rounded-md border bg-white p-2 px-3 text-sm shadow-xl focus:outline-none">
          <p className="text-primary-90 relative h-full">{message}</p>
        </Popover.Panel>
      </Float>
    </Popover>
  );
}
