import React, { FC } from 'react';
import { View, Text } from 'react-native';
import TabNavHeader from '../../components/TabNavHeader';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

const SettingsScreen: FC = () => {
  return (
    <ScreenWrapperComp>
      <TabNavHeader  title="Settings"/>
    </ScreenWrapperComp>
  )
}

export default SettingsScreen