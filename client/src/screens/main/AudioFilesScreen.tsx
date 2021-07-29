import React, { FC } from 'react';
import { View, Text } from 'react-native';
import styled from "styled-components/native"
import TabNavHeader from '../../components/TabNavHeader';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';
import { backgroundGray, borderColor, Text300, Text100 } from '../../shared/color';
import { AntDesign } from '@expo/vector-icons'; 
import SortByOptions from '../../components/AudioFiles/SortByOptions';

const SearchBarWrapper = styled.View`
  width: 100%;
  padding-top: 20px;
  flex-direction: row;
  align-items: center;
`

const SearchBar = styled.View`
  width: 300px;
  height: 45px;
  margin: 10px 0px;
  padding-left: 16px;
  background-color: ${Text100};
  font-family: "Inter_400Regular";
  border-radius: 100px;
  flex-direction: row;
  padding-right: 16px;
  align-items: center;
`

const TextInputWithStyles = styled.TextInput`
  margin-left: 14px;
  background-color: ${backgroundGray};
  font-family: "Inter_400Regular";
  flex: 1;
  font-size: 14px;
`;

const AudioFilesScreen: FC = () => {
  return (
    <ScreenWrapperComp>
      <TabNavHeader title="Audio Files" />

      <SearchBarWrapper>
        <SearchBar>

          <AntDesign name="search1" size={18} color="#86869E" />

          <TextInputWithStyles
            placeholder="Search"
            placeholderTextColor={Text300}
          />
        </SearchBar>

        <SortByOptions />
      </SearchBarWrapper>
      
    </ScreenWrapperComp>
      
  )
}

export default AudioFilesScreen