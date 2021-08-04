import React, { FC, useEffect, useState } from "react";
import { ScrollView, Platform } from "react-native";
import styled from "styled-components/native";
import StyledTextInput from "../../components/Inputs/StyledTextInput";
import ScreenWrapperComp from "../../shared/ScreenWrapperComp";
import { useForm } from "react-hook-form";
import { Text500, } from "../../shared/color";
import BasicButton from "../../shared/BasicButton";
import OptionsDrawer from "../../components/Inputs/OptionsDrawer";
import { ErrorText } from '../../components/Inputs/StyledTextInput';
import { requestMediaLibraryPermissionsAsync, requestCameraPermissionsAsync, MediaTypeOptions, launchCameraAsync, ImagePickerOptions, launchImageLibraryAsync } from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";


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

interface CreateAudioFileFormTypes {
  header: string;
  description: string;
}

type imageType = {
  cancelled: false;
} & ImageInfo


const CreateAudioFileScreen: FC = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [error, setError] = useState<string | null>(null)

  const [images, setImages] = useState<imageType[]>([])


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
    console.log(data)
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

  return (
    <>
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
        

        <BasicButton title="Create" onPress={formSubmitHandler}/>
      </ScrollViewWrapper>
      </ScreenWrapperComp>
      <OptionsDrawer optionClicked={optionClicked} drawerOpen={drawerOpen} options={drawerOptions}/>
      </>
  );
};

export default CreateAudioFileScreen;
