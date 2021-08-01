import React, { FC, useState } from 'react';
import { View, Text } from 'react-native';
import styled from "styled-components/native"
import TabNavHeader from '../../components/TabNavHeader';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';
import { backgroundGray, borderColor, Text300, Text100 } from '../../shared/color';
import { AntDesign } from '@expo/vector-icons'; 
import SortByOptions from '../../components/AudioFiles/SortByOptions';
import AudioFileSection from '../../components/AudioFiles/AudioFileSection';

const SearchBarWrapper = styled.View`
  width: 100%;
  padding-top: 20px;
  flex-direction: row;
  align-items: center;
`

const SearchBar = styled.View`
  flex: 1;
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

const AudioFilesWrapper = styled.ScrollView`
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
`

interface AudioFileType {
  imgUrl: string;
  header: string;
  description: string;
  length: number;
  date: Date;
  fileId: string;
  display: boolean;
}

interface AudioFileScreenProps {
  navigation: any;
}

const AudioFilesScreen: FC<AudioFileScreenProps> = ({navigation}) => {

  const initialAudioFiles = [{ imgUrl: "imageUrl", header: "French Revolution", description: "Text from history class relating", length: 53, date: new Date(), fileId: "23lnfklwns", display: true },
    { imgUrl: "imageUrl", header: "Checkh", description: "Text from history class relating", length: 83, date: new Date(), fileId: "lknsdflknklt5", display: true },
    { imgUrl: "imageUrl", header: "Seocond", description: "Text from history class relating", length: 83, date: new Date(), fileId: "llknsdlk", display: true },
    { imgUrl: "imageUrl", header: "Thrid day", description: "Text from history class relating", length: 83, date: new Date(), fileId: "8900onegonlow", display: true },
    { imgUrl: "imageUrl", header: "Day thes", description: "Text from history class relating", length: 83, date: new Date(), fileId: "oijoinldg", display: true },
    { imgUrl: "imageUrl", header: "Bill Ni", description: "Text from history class relating", length: 83, date: new Date(), fileId: "oiinlwe", display: true },
    { imgUrl: "imageUrl", header: "Hello friend", description: "Text from history class relating", length: 83, date: new Date(), fileId: "oi23nilnlwe", display: true },
    { imgUrl: "imageUrl", header: "French Revolution", description: "Text from history class relating", length: 83, date: new Date(), fileId: "090u2409ueglk", display: true },
    {imgUrl: "imageUrl", header: "French Revolution", description: "Text from history class relating", length: 83, date: new Date(), fileId: "oin23jkld", display: true}
  ]

  const [audioFiles, setAudioFiles] = useState<AudioFileType[]>(initialAudioFiles)

  const [reRenderState, setReRenderState] = useState(0);


  let searchText: string;

  const onSearchTextChange = (value: string) => {
    searchText = value.toLowerCase();

    setAudioFiles((prevState) => {
      for (let i = 0; i < prevState.length; i++) {
        const header = prevState[i].header.toLowerCase()
        if (!header.includes(searchText)) {
          prevState[i].display = false;
        } else {
          prevState[i].display = true;
        }
      }
      return prevState
    })

    setReRenderState(reRenderState + 1);
  }

  const deleteItem = (id: string) => {
    setAudioFiles((prevState) => {
      for (let i = 0; i < prevState.length; i++) {
        if (prevState[i].fileId === id) {
          prevState.splice(i, 1)
          return prevState;
        }
      }
      return prevState;
    })
    setReRenderState(reRenderState + 1)
  }


  return (
    <ScreenWrapperComp>
       {/* <TabNavHeader title="Audio Files" /> */}

      <SearchBarWrapper>
        <SearchBar>

          <AntDesign name="search1" size={18} color="#86869E" />

          <TextInputWithStyles
            placeholder="Search"
            placeholderTextColor={Text300}
            onChangeText={onSearchTextChange}
          />
        </SearchBar >

        <SortByOptions />

  
      </SearchBarWrapper>

      <AudioFilesWrapper>
        
          {audioFiles.map(({imgUrl, header, description, length, date, fileId, display}: AudioFileType) => {
            if (display === false) return;

            return <AudioFileSection navigation={navigation} key={fileId} imgUrl={imgUrl} header={header} description={description} length={length} date={date} fileId={fileId} deleteItemHandle={deleteItem}/>
          })}
          
          
      </AudioFilesWrapper>
      
    </ScreenWrapperComp>
      
  )
}

export default AudioFilesScreen