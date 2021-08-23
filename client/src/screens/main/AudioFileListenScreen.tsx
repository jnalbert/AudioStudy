import React, { FC, useState } from 'react';
import { View, Text } from 'react-native';
import styled from "styled-components/native"
import AudioSeeker from '../../components/AudioFileListen/AudioSeeker';
import FileInfoComp from '../../components/AudioFileListen/FileInfoComp';
import MediaButtons from '../../components/AudioFileListen/MediaButtons';
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
    setCurrentPosition(rounder(time))
  }

  const onPressPlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const traverseThrough = (amount: number) => {
    let newAmount;
    if (amount < 0) {
      newAmount = Math.max(0, currentPosition + amount)
    } else {
      newAmount = Math.min(length, currentPosition + amount)
    }

    setCurrentPosition(newAmount)
  }



  return (
    <ScreenWrapperComp>
      <FileInfoComp imgData={imgUrl} header={header} description={description} />
      <AudioSeeker onValueChange={onValueChange} onSeekStart={onSeekStart} onSeekComplete={onSeekComplete} fileLengthSeconds={length} currentPositionSeconds={ currentPosition}/>
      <MediaButtons isPaused={!isPlaying} onPressMainButton={onPressPlayPause} traverse={traverseThrough}/>
    </ScreenWrapperComp>
  )
}

export default AudioFileListenScreen