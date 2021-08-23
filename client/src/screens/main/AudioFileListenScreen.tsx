import React, { FC, useState } from 'react';
import { View, Text } from 'react-native';
import styled from "styled-components/native"
import AudioSeeker from '../../components/AudioFileListen/AudioSeeker';
import FileInfoComp from '../../components/AudioFileListen/FileInfoComp';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';





interface AudioFileListenScreen {
  navigation: any;
  route: any;
}

const AudioFileListenScreen: FC<AudioFileListenScreen> = ({ route }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  
  const { imgUrl, header, description, length, fileId } = route.params;

  const rounder = (value: number) => {
    const step = 0.20;
    var inv = 1.0 / step;
    return parseFloat((Math.round(value * inv) / inv).toFixed(2))
  }
  
  const onValueChange = (time: number) => {
    setCurrentPosition(rounder(time))
  }

  const onSeekStart = () => {
    
  }

  const onSeekComplete = (time: number) => {
    console.log(rounder(time))
    setCurrentPosition(rounder(time))
  }



  return (
    <ScreenWrapperComp>
      <FileInfoComp imgData={imgUrl} header={header} description={description} />
      <AudioSeeker onValueChange={onValueChange} onSeekStart={onSeekStart} onSeekComplete={onSeekComplete} fileLengthSeconds={length} currentPositionSeconds={ currentPosition}/>
        
    </ScreenWrapperComp>
  )
}

export default AudioFileListenScreen