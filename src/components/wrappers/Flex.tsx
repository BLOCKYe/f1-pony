import { cn } from '@/lib/utils';
import React, { ComponentProps } from 'react';

const Flex: React.FC<ComponentProps<'div'>> = (props) => {
  return (
    <div {...props} className={cn('flex gap-2 items-center', props.className)}>
      {props.children}
    </div>
  );
};

export default Flex;
