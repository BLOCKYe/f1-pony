import React, { ComponentProps } from 'react';

const Divider: React.FC<ComponentProps<'div'>> = (props) => {
  return <div {...props} className={'border-t my-3'} />;
};

export default Divider;
