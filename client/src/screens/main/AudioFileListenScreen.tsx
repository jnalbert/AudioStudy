import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from "styled-components/native"
import AudioSeeker from '../../components/AudioFileListen/AudioSeeker';
import FileInfoComp from '../../components/AudioFileListen/FileInfoComp';
import MediaButtons from '../../components/AudioFileListen/MediaButtons';
import VolumeSliderComp from '../../components/AudioFileListen/VolumeSliderComp';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Primary } from '../../shared/color';
import { Audio } from 'expo-av';
import { INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, INTERRUPTION_MODE_IOS_DO_NOT_MIX, Sound } from 'expo-av/build/Audio';


const ClosedCaptionsWrapper = styled.View`
  align-self: center;
  padding-top: 23px;
`



interface AudioFileListenScreen {
  navigation: any;
  route: any;
}

interface AudioPlaybackStatus {
    isLoaded: true;
    androidImplementation?: string;
    uri: string;
    progressUpdateIntervalMillis: number;
    durationMillis?: number;
    positionMillis: number;
    playableDurationMillis?: number;
    seekMillisToleranceBefore?: number;
    seekMillisToleranceAfter?: number;
    shouldPlay: boolean;
    isPlaying: boolean;
    isBuffering: boolean;
    rate: number;
    shouldCorrectPitch: boolean;
    volume: number;
    isMuted: boolean;
    isLooping: boolean;
    didJustFinish: boolean;
};

const AudioFileListenScreen: FC<AudioFileListenScreen> = ({ route, navigation }) => {

  const [isShowCaptions, setIsShowCaptions] = useState(false);
  

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  
  const { imgUrl, header, description, length, fileId, audioFileRef, transcript } = route.params;

  

  const [duration, setDuration] = useState(length);

  const rounder = (value: number) => {
    const step = 0.20;
    var inv = 1.0 / step;
    return parseFloat((Math.round(value * inv) / inv).toFixed(2))
  }
  
  const onValueChange = (time: number) => {
    setCurrentPosition(rounder(time))
  }

  const onSeekStart = () => {
    pauseAudio()
  }

  const onSeekComplete = (time: number) => {
    setCurrentPosition(rounder(time))
    sound.current.setPositionAsync(rounder(time) * 1000)
    console.log(isPlaying)
    isPlaying && playAudio()
  }

  const onPressPlayPause = () => {
    (isPlaying) ? pauseAudio() :  playAudio()
  }

  const traverseThrough = (amount: number) => {
    let newAmount;
    if (amount < 0) {
      newAmount = Math.max(0, currentPosition + amount)
    } else {
      newAmount = Math.min(length, currentPosition + amount)
    }
    setCurrentPosition(newAmount)
    sound.current.setPositionAsync(newAmount * 1000)
  }


  // Audio stuff

  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    interruptionModeIOS: INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    
  })

  let sound = useRef(new Audio.Sound());

  useEffect(() => {
    let isMounted = true;
    loadSound().then(() => {
      console.log("loaded")
      isMounted && sound.current.setOnPlaybackStatusUpdate(audioPlayBack);
    })

    return () => {
      isMounted = false;
    }
    
  }, [])

  const loadSound = async () => {
    console.log('Loading Sound');
    // console.log(audioFileRef)
    await sound.current.loadAsync(
      { uri: audioFileRef },
      { progressUpdateIntervalMillis: 100 }
    );
    // const { sound } = await Audio.Sound.createAsync(
    //   { uri: "http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3" },
    //   {progressUpdateIntervalMillis: 100},
    
    // );

  }

  const audioPlayBack = (status: any): void => {
    setDuration(parseInt(status.durationMillis) / 1000)
  
    setCurrentPosition(parseInt(status.positionMillis) / 1000)

    status.didJustFinish && setIsPlaying(false);
  
    // setIsBuffering(status.isBuffering)
    // console.log(status.isBuffering, "Buffering")

    // status.isPlaying && setIsBuffering(false)

    // setIsBuffering(status.playableDurationMillis < status.positionMillis)
    // console.log(status.playableDurationMillis < status.positionMillis, "Buffering")
    // console.log("playable", status.playableDurationMillis)
    // console.log("current", status.positionMillis)

    // console.log(status)
  }

  const playAudio = async () => {
    if (await isAudioLoaded) {
      console.log('Playing Sound');
      setIsPlaying(true);
      await sound.current.playAsync();  
    }
   
  }
  
  const isAudioLoaded = async () => {
    const status: any = await sound.current.getStatusAsync();
    if (status.isLoaded || status.isBuffering) {
      return false;
    }
    return true;
  }

  const pauseAudio = async () => {
    if (await isAudioLoaded) {
      console.log('Pausing Sound');
      setIsPlaying(false);
      await sound.current.pauseAsync();  
    }
   
  }

  useEffect(() => {
    return sound.current
      ? () => {
          console.log('Unloading Sound');
          sound.current.unloadAsync(); }
      : undefined;
  }, [sound]);

  const captionsClick = () => {
    navigation.navigate("Transcript", {
        transcript: transcript
    });
  }

  return (
    <ScreenWrapperComp>
      <FileInfoComp imgData={imgUrl} header={header} description={description} />
      <AudioSeeker onValueChange={onValueChange} onSeekStart={onSeekStart} onSeekComplete={onSeekComplete} fileLengthSeconds={duration} currentPositionSeconds={ currentPosition}/>
      <MediaButtons isPaused={!isPlaying} onPressMainButton={onPressPlayPause} traverse={traverseThrough} isBuffering={isBuffering} />
      <VolumeSliderComp soundPlayer={sound.current} />

      <ClosedCaptionsWrapper>
        <TouchableOpacity onPress={captionsClick}>
          <MaterialCommunityIcons name="closed-caption" size={26} color={Primary} />
        </TouchableOpacity>
      </ClosedCaptionsWrapper>
      
    </ScreenWrapperComp>
  )
}

export default AudioFileListenScreen