import React from 'react';

const MainWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;
  return <div className={'px-3 md:px-5 pb-10 pt-20 md:pt-28 max-w-5xl mx-auto'}>{children}</div>;
};

export default MainWrapper;
