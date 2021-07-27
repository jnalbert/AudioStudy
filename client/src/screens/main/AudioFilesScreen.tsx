import React, { FC } from 'react';
import { View, Text } from 'react-native';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

const AudioFilesScreen: FC = () => {
  return (
    <ScreenWrapperComp>
        <Text style={{fontSize: 30, paddingTop: 50}}>AudioFiles</Text>
    </ScreenWrapperComp>
      
  )
}

export default AudioFilesScreen