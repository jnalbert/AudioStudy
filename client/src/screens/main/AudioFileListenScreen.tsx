import React, { FC } from 'react';
import { View, Text } from 'react-native';

import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

interface AudioFileListenScreen {
  navigation: any;
  route: any;
}

const AudioFileListenScreen: FC<AudioFileListenScreen> = ({ route }) => {

  
  const { imgUrl, header, description, length, fileId } = route.params;


  return (
    <ScreenWrapperComp>
      <Text style={{color: "black"}}>image Url</Text>
      <Text>{imgUrl}</Text>
      <Text>header</Text>
      <Text>{header}</Text>
      <Text>descr</Text>
      <Text>{description}</Text>
      <Text>length</Text>
      <Text>{length}</Text>
      <Text>file id</Text>
      <Text>{ fileId}</Text>
    </ScreenWrapperComp>
  )
}

export default AudioFileListenScreen