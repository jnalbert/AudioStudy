import React, { FC } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from "styled-components/native"
import { AntDesign } from '@expo/vector-icons'; 
import { Secondary, backgroundColor } from '../../shared/color';

const ImageSectionWrapper = styled.View`
  padding: 17px 0px;
`

const TouchableIcons = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10;
`

const IconBackground = styled.View`
  position: absolute;
  height: 20px;
  top: 5px;
  right: -3px;
  width: 10px;
  z-index: 99;
  background-color: white;
`

const ImageStyled = styled.Image`
  height: 150px;
  width: 125px;
`

interface CreateAudioFileImageProps {
  id: string;
  imageData: string;
  deleteImage: (imageId: string) => void;
  forceState: number;
}

const CreateAudioFileImage: FC<CreateAudioFileImageProps> = ({ id, imageData, deleteImage }) => {
  
  const base64Uri = `data:image/jpg;base64,${imageData}`
  // const base64Uri = imageData;
  return (
    <ImageSectionWrapper>
      <TouchableIcons onPress={() => deleteImage(id)}>
        <IconBackground></IconBackground>
        <AntDesign style={{ position: "absolute", top: 4, right: -14, zIndex: 100, borderRadius: 10 }} backgroundColor="white" name="closecircle" size={28} color={Secondary} />
      </TouchableIcons>
      
      <ImageStyled source={{ uri: base64Uri }} />
      
      
    </ImageSectionWrapper>
  )
}

export default CreateAudioFileImage