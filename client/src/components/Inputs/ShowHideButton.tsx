import React, { FC, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from "styled-components/native"
import { Primary } from '../../shared/color';

const HideText = styled.Text`
  color: ${Primary};
  font-size: 16px;
`

interface ShowHideButtonProps {
  onPress: () => void;
}

const ShowHideButton: FC<ShowHideButtonProps> = ({ onPress }) => {
  
  const showHidePress = () => {
    setText((text == "Show") ? "Hide": "Show")
    onPress()
  }

  const [text, setText] = useState<"Show" | "Hide">("Show")
  return (
    <View>
      <TouchableOpacity  onPress={showHidePress} >
        <HideText>{text}</HideText>
      </TouchableOpacity>
    </View>
  )
}

export default ShowHideButton