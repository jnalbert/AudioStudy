import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from "styled-components/native"
//@ts-ignore
import Slider from "@brlja/react-native-slider";
import { Secondary, Text300, Text500 } from '../../shared/color';
import { Sound } from 'expo-av/build/Audio';

import { FontAwesome } from '@expo/vector-icons'; 






const OverallWrapper = styled.View`
    padding-top: 55px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`


const SliderWrapper = styled.View`
  padding: 0px 18px;
`

interface VolumeSliderComp {
  soundPlayer: Sound | undefined;
}

const VolumeSliderComp: FC<VolumeSliderComp> = ({soundPlayer}) => {

  const [volume, setVolume] = useState(0)

  const roundValue = (value: number) => {
    return parseFloat(value.toFixed(2))
  }


  const onVolumeSliderComplete = (value: number) => {
    value = roundValue(value)
    setVolume(value)
    console.log("final Volume", volume)
  }

  const onVolumeChange = (value: number) => {
    value = roundValue(value)
    setVolume(value)
  }

  return (
    <OverallWrapper>
 
        <FontAwesome name="volume-off" size={20} color={Text300} />

      <SliderWrapper>
        <Slider
          maximumValue={1}
          minimumValue={0}
          onSlidingComplete={onVolumeSliderComplete}
          value={volume}
          minimumTrackTintColor={ Text500}
          maximumTrackTintColor={Text300}
          thumbTouchSize={{ width: 30, height: 30 }}
          step={0.01}
          onValueChange={onVolumeChange}
          
          thumbStyle={{
            width: 16,
            height: 16,
            borderRadius: 150,
            backgroundColor: Secondary,
          }}
          trackStyle={{
            height: 2,
            width: 260,
            borderRadius: 1
          }}
          thumbTintColor={Secondary}
          />
        </SliderWrapper>
        <FontAwesome name="volume-up" size={20} color={Text300} />
    </OverallWrapper>
  )
}

export default VolumeSliderComp