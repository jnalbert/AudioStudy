import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from "styled-components/native"
import { getUserData } from '../../../firebase/FirestoreFunctions';
import { UserTypeDB } from '../../../firebase/types/miscTypes';
import { AuthContext, _getStoredUuid } from '../../AppContext';
import InformationSection from '../../components/Settings/InformationSection';
import BasicButton from '../../shared/BasicButton';
import { Primary, Text200, Text400, backgroundColor, borderColor, logoutRed, backgroundGray } from '../../shared/color';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';

const Thumbnail = styled.View`
  align-self: center;
  background-color: #C4C4C4;
  width: 130px;
  height: 130px;
  border-radius: 65px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
const ThumbnailLetter = styled.Text`
  font-family: "Inter_500Medium";
  font-size: 55px;
  letter-spacing: -1.5px;
  color: ${Primary};
  padding-bottom: 5px;
  padding-left: 2px;
  padding-right: 2px;
`
const TextWrap = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 0px 0px;
`

const ProfileHeaderWrapper = styled.View`
  flex-direction: column;
  align-items: flex-start;
  width: 340px;
  padding-top: 27px;
  border-bottom-color: ${Text200};
  border-bottom-width: 1.5px;
  padding-bottom: 7px;
`

const ProfileHeader = styled.Text`
  font-family: "Inter_500Medium";
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -0.25px;
  color: ${Text400};
`

const InformationWrapper = styled.View`
  align-items: center;
  padding-top: 25px;
`

const ChangePasswordWrapper = styled.View`

`

const LogoutButtonWrapper = styled.View`
  padding-top: 35px;
  margin-bottom: 15px;
`


interface UserInfoType {
  name: string;
  email: string;
  dateCreated: string;
  audioFilesCreated: number;
  totalLengthOfFiles: string;
}

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: FC<SettingsScreenProps> = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState<UserInfoType>({ name: "", email: "", dateCreated: "", audioFilesCreated: 0, totalLengthOfFiles: "" })
  const [initials, setInitials] = useState({ firstInitial: "", lastInitial: "" })
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const fetchInitialData = async () => {
    // get data from api
    setIsRefreshing(true);
    const uuid = await _getStoredUuid();
    console.log(uuid, "stored")
    const { name, dateJoined, totalAudioFileLengthSeconds, totalAudioFiles, email } = await getUserData(uuid || "");
    
    // const rawData = {name: "Justin Albert", email: "jnalbert879@gmail.com", dateCreated: new Date().toString(), audioFilesCreated: 9, totalLengthOfFiles: 5283}

    const newDate = getFormattedDate(new Date(dateJoined).toString());
    const lengthOfFilesFormatted = getFormattedFilesLength(totalAudioFileLengthSeconds)
    setUserInfo({ name: name, email: email, dateCreated: newDate, audioFilesCreated: totalAudioFiles, totalLengthOfFiles: lengthOfFilesFormatted })
    getThumbnailInitials(name);
    setIsRefreshing(false)
  }

  const { signOut } = useContext(AuthContext);



  useEffect(() => {
    fetchInitialData()
  }, [])

  const getFormattedFilesLength = (seconds: number): string => {
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor((seconds / 60) - (hours * 60))

    const secondsSeparate = seconds - (minutes * 60) - (hours * 60 * 60)

    let display = ""

    if (hours > 0) {
      display += hours + "h "
    }
    if (minutes > 0) {
      display += minutes + "m ";
    }
    return display + secondsSeparate + "s"
  }

  const getFormattedDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString(undefined, { month: "long", day: "2-digit", year: "numeric" })
    return formattedDate;
  }

  const getThumbnailInitials = (name: string) => {
    const splitString = name.split(" ")
    const firstInitial = splitString[0].substring(0, 1);
    const lastInitial = splitString[1].substring(0, 1);

    setInitials({firstInitial: firstInitial, lastInitial: lastInitial})
  }

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword")
  }

  const onRefresh = async () => {
    await fetchInitialData()
  }

  const handleLogout = () => {
    console.log(signOut())
  }

  const handleDeletion = () => {
    navigation.navigate("DeleteScreen")
  }

  return (
    <ScreenWrapperComp>
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
      />}
       >
        <Thumbnail>
        <ThumbnailLetter>
            {initials.firstInitial}
        </ThumbnailLetter>
        <ThumbnailLetter>
            {initials.lastInitial}
        </ThumbnailLetter>
        </Thumbnail>
        <ProfileHeaderWrapper>
          <ProfileHeader>
            Profile Information
          </ProfileHeader>
        </ProfileHeaderWrapper>
        <InformationWrapper>
          <InformationSection header="Name" value={userInfo.name} />
          <InformationSection header="Email" value={userInfo.email} />
          <InformationSection header="Date Created" value={userInfo.dateCreated} />
          <InformationSection header="Audio Files Created" value={userInfo.audioFilesCreated + ""} />
          <InformationSection header="Total Audio Files Length" value={userInfo.totalLengthOfFiles} />
        </InformationWrapper>
        <ChangePasswordWrapper>
          <BasicButton title="Change Password" onPress={handleChangePassword}/>
        </ChangePasswordWrapper>
        <LogoutButtonWrapper>
          <BasicButton style={{backgroundColor: "transparent", borderColor: logoutRed, borderWidth: 2}} buttonTextStyle={{color: logoutRed}} title="Logout" onPress={handleLogout} />
          <BasicButton style={{backgroundColor: "gray", borderColor: logoutRed, borderWidth: 2}} buttonTextStyle={{color: logoutRed}} title="Delete Account" onPress={handleDeletion} />

        </LogoutButtonWrapper>
      </ScrollView>
    </ScreenWrapperComp>
  )
}

export default SettingsScreen