import React, { FC } from 'react';
import { View } from 'react-native';
import styled from "styled-components/native"
//@ts-ignore
import Slider from "@brlja/react-native-slider";
// import Slider from "react-native-slider";
import { Secondary, Text300, Text500 } from '../../shared/color';

const OverAllWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`

const SeekerWrapper = styled.View`
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
`

const TimeWrapper = styled.View`
  flex-direction: row;
  align-items: stretch;
  width: 82%;
`

const TimeSharedStyles = styled.Text`
  transform: translateY(-3px);
  font-family: "Inter_400Regular";
  font-size: 12px;
  line-height: 12px;
  color: ${Text300};
`

const CurrentTime = styled(TimeSharedStyles)`
  margin-right: auto;

`

const TimeToEnd = styled(TimeSharedStyles)`
  margin-left: auto;
`

interface AudioSeekerProps {
  onSeekStart: () => void;
  onSeekComplete: (value: number) => void;
  fileLengthSeconds: number;
  currentPositionSeconds: number;
  onValueChange: (value: number) => void;
}

const AudioSeeker: FC<AudioSeekerProps> = ({ onSeekStart, onSeekComplete, fileLengthSeconds, currentPositionSeconds, onValueChange }) => {
  
  const formateTime = (time: number) => {
    time = Math.round(time);
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time / 60) - (hours * 60))

    const secondsSeparate = time - (minutes * 60) - (hours * 60 * 60)


    let displayHours = ""
    let displayMinutes = "0:"
    let displaySeconds = "" + secondsSeparate;

    if (hours > 0) {
      displayHours = hours + ":"
    }
    if (minutes > 0) {
      displayMinutes = minutes + ":";
    }
    if (secondsSeparate < 10) {
      displaySeconds = "0" + secondsSeparate
    }

    return displayHours + displayMinutes + displaySeconds;
  
  }

  return (
    <OverAllWrapper>
      <SeekerWrapper>
        <Slider
          maximumValue={Math.max(fileLengthSeconds, 1, currentPositionSeconds)}
          onSlidingStart={onSeekStart}
          onSlidingComplete={onSeekComplete}
          value={currentPositionSeconds}
          minimumTrackTintColor={ Text500}
          maximumTrackTintColor={Text300}
          thumbTouchSize={{ width: 30, height: 30 }}
          step={0.2}
          onValueChange={onValueChange}
          
          thumbStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: Secondary,
          }}
          trackStyle={{
            height: 2,
            width: 307,
            borderRadius: 1
          }}
          thumbTintColor={Secondary}
        />
        
      </SeekerWrapper>
      <TimeWrapper>
        <CurrentTime>
          {formateTime(currentPositionSeconds)}
        </CurrentTime>
        <TimeToEnd>
          -{formateTime(fileLengthSeconds - currentPositionSeconds)}
        </TimeToEnd>
      </TimeWrapper>
      
    </OverAllWrapper>
  )
}

export default AudioSeeker