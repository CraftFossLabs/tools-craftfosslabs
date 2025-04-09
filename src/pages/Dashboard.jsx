import React from 'react';
import DashboardHero from '../components/core/Dashboard/DashboardHero';
import CTA from '../components/common/CTA';
import Stats from '../components/core/Dashboard/Stats';

const Dashboard = () => {
  return <>
    <Stats />
    <DashboardHero />
    <CTA title={'Boost your productivity. Start using our app today.'} subText = {'Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.'} btnText1= {'Get started'} btnText2={'Learn more'}/>
  </>;
};

export default Dashboard;