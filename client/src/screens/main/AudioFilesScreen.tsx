import React, { FC } from 'react';
import { View, Text } from 'react-native';
import TabNavHeader from '../../components/TabNavHeader';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

const AudioFilesScreen: FC = () => {
  return (
    <ScreenWrapperComp>
        <TabNavHeader  title="Audio Files"/>
    </ScreenWrapperComp>
      
  )
}

export default AudioFilesScreen