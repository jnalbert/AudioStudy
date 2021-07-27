import React, { FC } from 'react';
import { View, Text } from 'react-native';
import TabNavHeader from '../../components/TabNavHeader';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

const CreateAudioFileScreen: FC = () => {
  return (
    <ScreenWrapperComp>
      <TabNavHeader  title="Create Audio File"/>
    </ScreenWrapperComp>
  )
}

export default CreateAudioFileScreen