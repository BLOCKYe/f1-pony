import { cn } from '@/lib/utils';
import React, { ComponentProps } from 'react';

const Cell: React.FC<ComponentProps<'div'>> = (props) => {
  return (
    <div className={cn('flex overflow-hidden text-ellipsis', props.className)} {...props}>
      {props.children}
    </div>
  );
};

export default Cell;
