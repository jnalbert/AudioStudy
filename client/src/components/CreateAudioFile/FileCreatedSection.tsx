import React, { FC, useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import styled from "styled-components/native"
import { BlurView } from 'expo-blur';
import { Text400, Text500 } from '../../shared/color';
import BasicButton from '../../shared/BasicButton';
import { useNavigation } from '@react-navigation/native';

const WordsWrapper = styled.View`
  height: 268px;
  width: 343px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 8px;
`

const Header = styled.Text`
  padding: 10px;
  font-family: "Inter_500Medium";
  font-size: 32px;
  line-height: 40px;

  text-align: center;
  letter-spacing: -1.5px;
  color: ${Text500};
  padding-top: 30px;
`
const SubHeading = styled.Text`
  font-family: "Inter_400Regular";
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.25px;
  color: ${Text400};
  padding-top: 15px;
`

const ButtonWrapper = styled.View`
  padding-top: 35px;
`
interface FileCreateSectionProps {
  visible: boolean;
  title: string;
  subheading: string;
  buttonTitle: string;
  buttonOnPress: () => void;
}

const FileCreatedSection: FC<FileCreateSectionProps> = ({ visible, title, subheading, buttonTitle, buttonOnPress }) => {

  const [isVisible, setIsVisible] = useState(visible);

  
  const handleOnPress = () => {
    buttonOnPress();
    // navigation.navigate("AudioFiles")
    setIsVisible(false);
  }


  return (
   
    <Modal
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}
      visible={isVisible}
    >
      <BlurView intensity={80} tint="light" style={[StyleSheet.absoluteFill, {alignItems: "center", justifyContent:"center"}]}>
        <WordsWrapper>
          <Header>
            {title}
          </Header>

          <SubHeading>
            {subheading}
          </SubHeading>

          
          <ButtonWrapper>
            <BasicButton style={{width: 311}} title={buttonTitle} onPress={handleOnPress}/>
          </ButtonWrapper>
          
        </WordsWrapper>
        
      </BlurView>
    </Modal>
   
  )
}

export default FileCreatedSection