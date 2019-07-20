import React from 'react';
import PropTypes from 'prop-types';

import personal from '../../assets/images/personal.svg';
import health from '../../assets/images/health.svg';
import general from '../../assets/images/general.svg';
import T from '../../utils/Translation';
import TabLayout from '../TabLayout';

const tabs = [
  {
    icon: personal,
    title: T.personal,
  },
  {
    icon: health,
    title: T.health,
  },
  {
    icon: general,
    title: T.general,
  },
];
const UserTabs = ({ currentTab = 0, onTabChange = () => {}, children }) => (
  <TabLayout
    tabs={tabs}
    currentTab={currentTab}
    onTabChange={onTabChange}>
    {children}
  </TabLayout>
);

UserTabs.propTypes = {

};

export default UserTabs;
