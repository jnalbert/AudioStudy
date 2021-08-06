import React, { FC, useState, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { Text100, Primary, Text400 } from '../../shared/color';

const WrapperView = styled.View`
  height: 45px;
  width: 327px;
  background-color: ${Text100};
  border-radius: 70px;
  border: none;
  flex-direction: row;
  justify-content: center;
  padding: 2px;
`

const OptionSectionOverall = styled.TouchableOpacity`
  flex: 1;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`

const OptionSection1 = styled(OptionSectionOverall)<{ backgroundColor: number }>`
  background-color: ${props => props.backgroundColor == 1 ? Primary : Text100};
`
const OptionSection2 = styled(OptionSectionOverall)<{ backgroundColor: number }>`
  background-color: ${props => props.backgroundColor == 2 ? Primary : Text100};
`

const OverallText = styled.Text`
  font-family: "Inter_400Regular";
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.25px;
`

const Text1 = styled(OverallText) < { color: number }> `
  color: ${props => props.color == 1 ? "white" : Text400 }
`

const Text2 = styled(OverallText) < { color: number }> `
  color: ${props => props.color == 2 ? "white" : Text400 }
`

interface ToggleSliderProps {
  defaultMode: number;
  option1: string;
  option2: string;
  onSelectSwitch: (option: number) => void;
}


const ToggleSlider: FC<ToggleSliderProps> = ({ defaultMode, option1, option2, onSelectSwitch }) => {
  const animationOption1: any = useRef(new Animated.Value(defaultMode === 1 ? 1 : 0)).current;
  const animationOption2: any = useRef(new Animated.Value(defaultMode === 2 ? 1 : 0)).current;
  const [selectionMode, setSelectionMode] = useState(defaultMode);

  const updatedSwitchData = (val: number) => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };


  const fadeIn = async (animation: Animated.Value) => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }

  const fadeOut = async (animation: Animated.Value) => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }

  return (
      <WrapperView>
      <OptionSection1
        onPress={() => {updatedSwitchData(1)}}
          backgroundColor={selectionMode}
        >
        <Text1
            color={selectionMode}
          >
            {option1}
          </Text1>
        </OptionSection1>
      <OptionSection2 
        onPress={() => {updatedSwitchData(2)}}
          backgroundColor={selectionMode}
          >
        <Text2
            color={selectionMode}
          >
            {option2}
          </Text2>
        </OptionSection2>
      </WrapperView>
  )
}

export default ToggleSlider