import React, { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { Text300, Text500, Secondary, Text200 } from "../../shared/color";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OverallWrapper = styled.View`
  flex: 1;
  width: 97%;
  padding: 12px 0px;
  margin-left: 4px;
  overflow: hidden;
`;

const SectionWrapper = styled.View`
  flex-direction: row;
  height: 115px;
  width: 100%;
`;

const AudioFileThumbnail = styled.Image`
  border-radius: 8px;
`;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
  },
});

const AudioThumbnailWrapper = styled.View`
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 75px;
  border: 1px ${Text300};
  border-radius: 8px;
  overflow: hidden;
  margin-right: 28px;
`;

const MainInfoWrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

const SideBySideWrapper = styled.View`
  width: 100%;
  flex-direction: row;
`;

const LeftContainer = styled.View`
  justify-content: flex-start;
  margin-right: auto;
`;

const HeaderText = styled.Text`
  font-family: "Inter_500Medium";
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.25px;
  color: ${Text500};
  max-width: 160px;
`;

const RightContainer = styled.View`
  justify-content: flex-start;
`;

const DateText = styled.Text`
  font-family: "Inter_400Regular";
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: ${Text300};
`;

const DescriptionContainer = styled.View`
  width: 100%;
  padding-top: 8px;
  height: 60px;
`;

const DescriptionText = styled.Text`
  font-family: "Inter_400Regular";
  font-size: 14px;
  line-height: 20px;
  color: ${Text500};
`;

const LengthText = styled.Text`
  font-family: "Inter_500Medium";
  font-size: 14px;
  line-height: 20px;
  color: ${Text500};
`;

const Line = styled.View`
  border: 1px solid ${Text200};
  width: 327px;
  height: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6px;
`;

interface AudioFileSectionProps {
  imgUrl: string;
  header: string;
  description: string;
  length: number;
  date: Date;
  fileId: string;
  transcript: string;
  audioFileRef: string;
  deleteItemHandle: (id: string, length: number) => void;
  navigation: any;
}

const AudioFileSection: FC<AudioFileSectionProps> = ({
  imgUrl,
  header,
  description,
  length,
  date,
  fileId,
  deleteItemHandle,
  navigation,
  audioFileRef,
  transcript,
}) => {
  const [display, setDisplay] = useState(true);

  const handlePress = () => {
    navigation.navigate("AudioFileListenNav", {
      screen: "AudioFilesListen", params: {
        imgUrl: imgUrl,
        header: header,
        description: description,
        length: length,
        fileId: fileId,
        audioFileRef: audioFileRef,
        transcript: transcript
      }
    });
  };

  const getDisplayDate = () => {
    const shortYear = date.getFullYear().toString().substr(2, 2);
    const localDate = date.toLocaleDateString("en-US");

    return localDate.slice(0, localDate.length - 4) + shortYear;
  };

  const displayLength = () => {
    const minutes = Math.floor(length / 60);

    const seconds = length - minutes * 60;

    let display = "";

    if (minutes > 0) {
      display += minutes + "m ";
    }
    return display + seconds + "s";
  };

  const deleteItem = () => {
    setDisplay(false);
  };

  let height: 0 | undefined = undefined;
  let width: 0 | undefined = undefined;
  let padding = 12;

  if (!display) {
    height = 0;
    width = 0;
    padding = 0;
  }

  const createAlert = () => {
    Alert.alert(
      "Are you sure?",
      "Deleting this file will be permanent and will not be recoverable",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            deleteItem();
            deleteItemHandle(fileId, length);
          },
          style: "destructive"
        },
      ]
    );
  };

  return (
    <OverallWrapper
      style={{
        maxHeight: height,
        maxWidth: width,
        paddingTop: padding,
        paddingBottom: padding,
      }}
    >
      <TouchableOpacity onPress={handlePress}>
        <SectionWrapper>
          <AudioThumbnailWrapper>
            <AudioFileThumbnail
              style={[styles.image, { width: 78, height: 105 }]}
              source={{ uri: imgUrl }}
            />
          </AudioThumbnailWrapper>
          <MainInfoWrapper>
            <SideBySideWrapper>
              <LeftContainer>
                <HeaderText numberOfLines={1}>{header}</HeaderText>
              </LeftContainer>

              <RightContainer>
                <DateText>{getDisplayDate()}</DateText>
              </RightContainer>
            </SideBySideWrapper>

            <DescriptionContainer>
              <DescriptionText>{description}</DescriptionText>
            </DescriptionContainer>

            <SideBySideWrapper>
              <LeftContainer>
                <LengthText>{displayLength()}</LengthText>
              </LeftContainer>

              <RightContainer style={{ paddingRight: 6 }}>
                <TouchableOpacity
                  onPress={createAlert}
                >
                  <FontAwesome5 name="trash-alt" size={20} color={Secondary} />
                </TouchableOpacity>
              </RightContainer>
            </SideBySideWrapper>
          </MainInfoWrapper>
        </SectionWrapper>
        <Line></Line>
      </TouchableOpacity>
    </OverallWrapper>
  );
};

export default AudioFileSection;
