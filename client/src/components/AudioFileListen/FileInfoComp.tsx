import React, { FC } from 'react';
import { View } from 'react-native';
import styled from "styled-components/native"
import { Text300, Text400, Text500 } from '../../shared/color';

const FileImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 40px;
`
const FileImageWrapper = styled.View`
  align-items: center;
  justify-content: center;
  height: 277px;
  width: 209px;
  border: 1px ${Text300};
  border-radius: 8px;
  overflow: hidden;
`

const FileImage = styled.Image`
  border-radius: 8px; 
`

const FileInfoWrapper = styled.View`
 flex-direction: column;
 align-items: flex-start;
 justify-content: center;
 width: 100%;
 padding-left: 20px;
`

const FileHeader = styled.Text`
  font-family: "Inter_500Medium";
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -1.5px;
  color: ${Text500};
  padding-bottom: 12px;
`

const FileDescription = styled.Text`
  font-family: "Inter_400Regular";
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.25px;
  color: ${Text400};
`


interface FileInfoCompProps {
  imgData: string;
  header: string;
  description: string;
}

const FileInfoComp: FC<FileInfoCompProps> = ({imgData, header, description}) => {
  return (
    <>
    <FileImageContainer>
        <FileImageWrapper>
          <FileImage style={{ flex: 1, resizeMode: "contain", height: 277, width: 215 }} source={{uri: imgData}} />
        </FileImageWrapper>
      </FileImageContainer>

      <FileInfoWrapper>
        <FileHeader>
          {header}
        </FileHeader>
        <FileDescription>
          {description}
        </FileDescription>
      </FileInfoWrapper>
    </>
  )
}

export default FileInfoComp