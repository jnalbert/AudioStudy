import React, { FC, useEffect, useState } from "react";
import { ScrollView, Platform, Text, View } from "react-native";
import styled from "styled-components/native";
import StyledTextInput from "../../components/Inputs/StyledTextInput";
import ScreenWrapperComp from "../../shared/ScreenWrapperComp";
import { useForm } from "react-hook-form";
import { Primary, Text100, Text400, Text500, } from "../../shared/color";
import BasicButton from "../../shared/BasicButton";
import OptionsDrawer from "../../components/Inputs/OptionsDrawer";
import { ErrorText } from '../../components/Inputs/StyledTextInput';
import { requestMediaLibraryPermissionsAsync, requestCameraPermissionsAsync, MediaTypeOptions, launchCameraAsync, ImagePickerOptions, launchImageLibraryAsync } from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import CreateAudioFileImage from "../../components/CreateAudioFile/CreateAudioFileImage";
import ToggleSlider from "../../components/CreateAudioFile/ToggleSlider";
import ButtonToggleGroup from 'react-native-button-toggle-group';
import FileCreatedSection from "../../components/CreateAudioFile/FileCreatedSection";


const ScrollViewWrapper = styled.ScrollView`
  padding-top: 22px;
`

const InputSectionWrapper = styled.View`
  padding: 6px 0px;
`

const InputLabel = styled.Text`
  font-family: "Inter_500Medium";
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.25px;
  color: ${Text500};
  padding-bottom: 2px;
`

const InputtedImagesScrollView = styled.ScrollView`
  max-height: 385px;
  padding: 8px 0px;
`

const InputtedImagesWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 330px;
  padding: 0px 14px;
`

const ToggleSwitchWrapper = styled.View`
  padding-bottom: 40px;
  padding-top: 20px;
`

interface CreateAudioFileFormTypes {
  header: string;
  description: string;
}

type imageType = {
  cancelled: false;
} & ImageInfo



const CreateAudioFileScreen: FC<any> = ({navigation}) => {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [error, setError] = useState<string | null>(null)

  const [images, setImages] = useState<imageType[]>([])

  const [forceState, setForceState] = useState(0);

  const [radioButtonValue, setRadioButtonValue] = useState("Printed Text");

  const [fileCreated, setFileCreated] = useState(false);




  const getUserPermissions = async () => {
    if (Platform.OS !== "web") {
      const cameraPermission = await requestCameraPermissionsAsync()
      const libraryPermission = await requestMediaLibraryPermissionsAsync();
      if (cameraPermission.status !== 'granted' || libraryPermission.status !== 'granted') {
        alert("Camera roll and camera access is need in order for this app to function properly.")
      }
    }
  }

  useEffect(() => {
    getUserPermissions();
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAudioFileFormTypes>();

  const formSubmitData = (data: CreateAudioFileFormTypes) => {
    const imagesBase64 = images.filter((image) => { return image.base64 });
    const finalData = { ...data, textType: radioButtonValue, images: imagesBase64 };
    // do something with data
    console.log(finalData.textType)
    setFileCreated(true);
  }

  const formSubmitHandler = () => {
    if (images.length === 0) {
      setError("A least one image must be submitted")
      
    } else {
      handleSubmit(formSubmitData)();
    }

  }


  const handleAddPhoto = () => {
    setDrawerOpen(true);
    setError(null);
  }

  const optionClicked = () => {
    setDrawerOpen(false);
  }


  const cameraOptions: ImagePickerOptions = {
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 0.4,
    base64: true,

  }


  const takePhoto = async () => {
    const result = await launchCameraAsync(cameraOptions)
    if (!result.cancelled) {
      setImages([...images, result])
  
    }
  }
  
  const choosePhoto = async () => {
    const result = await launchImageLibraryAsync(cameraOptions)
    if (!result.cancelled) {
      setImages([...images, result])

    }
  }



  const drawerOptions = [
    {
      name: "Take Photo",
      action: takePhoto
    },
    {
      name: "Choose From Library",
      action: choosePhoto
    }
  ]

  const handleDelete = (imageId: string) => {
    setImages((prevState) => {
      for (let i = 0; i < prevState.length; i++) {
        if (prevState[i].uri === imageId) {
          prevState.splice(i, 1);
          return prevState;
        }
      }
      return prevState;
    })

    setForceState(forceState + 1);
  }

  return (
    <>
      {fileCreated && <FileCreatedSection navigation={navigation} visible={fileCreated} />}
    <ScreenWrapperComp>
      <ScrollViewWrapper>
        
        <InputSectionWrapper>
          <InputLabel>Header</InputLabel>
          <StyledTextInput
            placeHolderText=""
            control={control}
            rules={{ required: "This field is required" }}
            name="header"
            error={errors.header}
            hideText={false}
            />
        </InputSectionWrapper>

        <InputSectionWrapper>
          <InputLabel>Description</InputLabel>
          <StyledTextInput
            styles={{
              height: 110,
              alignItems: "topLeft",
              paddingTop: 8,
              paddingBottom: 8,
            }}
            otherOptions={{ multiline: true }}
            placeHolderText=""
            control={control}
            rules={{ required: "This field is required", maxLength: {value: 255, message: "Message must be under 255 characters"} }}
            name="description"
            error={errors.description}
            hideText={false}
            />
        </InputSectionWrapper>

          <BasicButton title="Add Photos" onPress={handleAddPhoto} />
          
          {error && <ErrorText>*{error}</ErrorText>}

          <InputtedImagesScrollView>
            <InputtedImagesWrapper>
              {images.map(({ uri, base64 }: imageType) => {
                if (base64) {
                  return <CreateAudioFileImage forceState={forceState}key={uri} id={uri} imageData={base64} deleteImage={handleDelete}/>
                }
                
              })}
              
            </InputtedImagesWrapper>
          </InputtedImagesScrollView>
        
          <ToggleSwitchWrapper>
            {/* <ToggleSlider defaultMode={1} option1="Printed Text" option2="Handwritten" onSelectSwitch={toggleSwitchMove }/> */}
            <ButtonToggleGroup
              value={radioButtonValue}
              highlightBackgroundColor={Primary}
              highlightTextColor={'white'}
              inactiveBackgroundColor={Text100}
              inactiveTextColor={Text400}
              values={["Printed Text", "Handwritten"]}
              onSelect={val => setRadioButtonValue(val)}
              style={{
                height: 45,
                width: 327,
                borderRadius: 70,
              }}
              textStyle={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                lineHeight: 24,
                textAlign: "center",
                letterSpacing: -0.25,
              }}
            
            />
          </ToggleSwitchWrapper>

          <BasicButton title="Create" onPress={formSubmitHandler} />
          <View style={{height: 30}}></View>
      </ScrollViewWrapper>
      </ScreenWrapperComp>
      <OptionsDrawer optionClicked={optionClicked} drawerOpen={drawerOpen} options={drawerOptions}/>
      </>
  );
};

export default CreateAudioFileScreen;
