import React, { ComponentProps } from 'react';

const HeaderCard: React.FC<ComponentProps<'div'>> = (props) => {
  return (
    <div className={'p-3 md:p-5 md:px-7 rounded-md border grid content-between bg-primary-foreground'} {...props}>
      {props.children}
    </div>
  );
};

export default HeaderCard;
