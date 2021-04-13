import { useState } from 'react';

import Tab from '../../elements/Tab/Tab';

import style from './TabsLayout.module.scss';

const TabsLayout = ({ tabs }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <section className={style.tabs}>
        {tabs.map(({ title }, index) => {
          return (
            <Tab
              text={title}
              isActive={tabIndex === index}
              index={index}
              onSelectTab={setTabIndex}
              key={index}
            />
          );
        })}
      </section>

      {tabs[tabIndex].component}
    </>
  );
};

export default TabsLayout;
