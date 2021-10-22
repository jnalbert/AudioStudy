import React, { FC } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native'
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

const MainScrollView = styled.ScrollView`
  margin-top: 20px;
  
`

const TranscriptText = styled.Text`
  font-family: "Inter_400Regular";
  font-size: 20px;
  line-height: 27px;
`

interface TranscriptScreenProps {
  route: any;
}

const TranscriptScreen: FC<TranscriptScreenProps> = ({route}) => {

  const {transcript } = route.params;
  return (
    <ScreenWrapperComp>
      <MainScrollView>
        <TranscriptText>{ transcript}</TranscriptText>
      </MainScrollView>
    </ScreenWrapperComp>
  )
}

export default TranscriptScreen