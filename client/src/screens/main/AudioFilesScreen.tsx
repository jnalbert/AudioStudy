import React, { FC, useEffect, useState } from "react";
import { View, Text, RefreshControl } from "react-native";
import styled from "styled-components/native";
import ScreenWrapperComp from "../../shared/ScreenWrapperComp";
import {
  backgroundGray,
  Text300,
  Text100,
} from "../../shared/color";
import { AntDesign } from "@expo/vector-icons";
import SortByOptions from "../../components/AudioFiles/SortByOptions";
import AudioFileSection from "../../components/AudioFiles/AudioFileSection";
import { _getStoredUuid } from "../../AppContext";
import { deleteAudioFile, getAllAudioFiles } from "../../../firebase/FirestoreFunctions";

const SearchBarWrapper = styled.View`
  width: 100%;
  padding-top: 15px;
  flex-direction: row;
  align-items: center;
`;

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
`;

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
`;

const NoAudioFilesWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const NoAudioFilesText = styled.Text`
  font-family: "Inter_400Regular";
  color: ${Text300};
`;

interface AudioFileType {
  audioFileRef: string;
  header: string;
  description: string;
  duration: number;
  dateCreated: string;
  thumbnailRef: string;
  fileID: string;
  transcript: string;
  display: boolean;
}

interface AudioFileScreenProps {
  navigation: any;
}

const AudioFilesScreen: FC<AudioFileScreenProps> = ({ navigation }) => {
  // const initialAudioFiles = [{ imgUrl: "imageUrl", header: "French Revolution", description: "Text from history class relating This is more jibber japper thatn truth", length: 200, date: new Date(), fileId: "23lnfklwns", display: true },
  //   { imgUrl: "imageUrl", header: "Checkh", description: "Text from history class relating", length: 83, date: new Date(), fileId: "lknsdflknklt5", display: true },
  //   { imgUrl: "imageUrl", header: "Seocond", description: "Text from history class relating", length: 83, date: new Date(), fileId: "llknsdlk", display: true },
  //   { imgUrl: "imageUrl", header: "Thrid day", description: "Text from history class relating", length: 83, date: new Date(), fileId: "8900onegonlow", display: true },
  //   { imgUrl: "imageUrl", header: "Day thes", description: "Text from history class relating", length: 83, date: new Date(), fileId: "oijoinldg", display: true },
  //   { imgUrl: "imageUrl", header: "Bill Ni", description: "Text from history class relating", length: 83, date: new Date(), fileId: "oiinlwe", display: true },
  //   { imgUrl: "imageUrl", header: "Hello friend", description: "Text from history class relating", length: 83, date: new Date(), fileId: "oi23nilnlwe", display: true },
  //   { imgUrl: "imageUrl", header: "French Revolution", description: "Text from history class relating", length: 83, date: new Date(), fileId: "090u2409ueglk", display: true },
  //   {imgUrl: "imageUrl", header: "French Revolution", description: "Text from history class relating", length: 83, date: new Date(), fileId: "oin23jkld", display: true}
  // ]

  const [audioFiles, setAudioFiles] = useState<AudioFileType[]>([]);

  const [reRenderState, setReRenderState] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAudioFiles = async () => {
    setIsRefreshing(true)
    const uuid = await _getStoredUuid();
    const audioFiles = await getAllAudioFiles(uuid || "");
    setAudioFiles(audioFiles as any);
    setIsRefreshing(false)
  };

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  let searchText: string;

  const onSearchTextChange = (value: string) => {
    searchText = value.toLowerCase();

    setAudioFiles((prevState) => {
      for (let i = 0; i < prevState.length; i++) {
        const header = prevState[i].header.toLowerCase();
        if (!header.includes(searchText)) {
          prevState[i].display = false;
        } else {
          prevState[i].display = true;
        }
      }
      return prevState;
    });

    setReRenderState(reRenderState + 1);
  };

  const deleteItem = async (id: string, length: number) => {
    setAudioFiles((prevState) => {
      for (let i = 0; i < prevState.length; i++) {
        if (prevState[i].fileID === id) {
          prevState.splice(i, 1);
          return prevState;
        }
      }
      return prevState;
    });
    setReRenderState(reRenderState + 1);

    console.log(id, "File Id")
    const userUuid = await _getStoredUuid();
    await deleteAudioFile(userUuid as string, id, length)
    console.log("Audio File deleted")
  };

  const onRefresh = async () => {
    await fetchAudioFiles()
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
        </SearchBar>

        <SortByOptions />
      </SearchBarWrapper>

      <AudioFilesWrapper
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {(audioFiles.length === 0) && (
          <NoAudioFilesWrapper>
            <NoAudioFilesText>No Audio Files Yet</NoAudioFilesText>
          </NoAudioFilesWrapper>
        )}

        {audioFiles.map(
          ({
            thumbnailRef,
            header,
            description,
            duration,
            dateCreated,
            fileID,
            display,
            transcript,
            audioFileRef
          }: AudioFileType) => {
            if (display === false) return;

            return (
              <AudioFileSection
                navigation={navigation}
                key={fileID}
                imgUrl={thumbnailRef}
                header={header}
                description={description}
                length={duration}
                date={new Date(dateCreated)}
                fileId={fileID}
                deleteItemHandle={deleteItem}
                transcript={transcript}
                audioFileRef={audioFileRef}
              />
            );
          }
        )}
      </AudioFilesWrapper>
    </ScreenWrapperComp>
  );
};

export default AudioFilesScreen;
