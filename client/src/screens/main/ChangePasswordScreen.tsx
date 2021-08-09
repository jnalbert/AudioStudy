import React, { FC, useEffect, useState } from "react";
import { View, Text } from "react-native";
import ScreenWrapperComp from "../../shared/ScreenWrapperComp";
import styled from "styled-components/native";
import StyledTextInput from "../../components/Inputs/StyledTextInput";
import { useForm } from "react-hook-form";
import BasicButton from "../../shared/BasicButton";
import { Primary } from "../../shared/color";
import FileCreatedSection from "../../components/CreateAudioFile/FileCreatedSection";


const InputWrapper = styled.View`
  padding-top: 50px;
`;

const ButtonWrapper = styled.View`
  padding-top: 60px;
`;


export interface ChangePasswordFormProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordScreen: FC<any> = ({navigation}) => {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setError
  } = useForm<ChangePasswordFormProps>();

  const onSubmit = (data: ChangePasswordFormProps) => {
    console.log(data)
    setIsSubmitted(true);
  };

  const handledButtonPress = () => {
    const {oldPassword, newPassword, confirmPassword} = getValues();

    // call function to validate password here instead of hard code
    if (oldPassword !== "Louis16") {
      setError("oldPassword", { type: "manual", message: "Incorrect Password" })
      
    } else if (newPassword !== confirmPassword) {

      const errorConfig = {type: "manual", message: "Passwords do not match"}
      setError("newPassword", errorConfig)
      setError("confirmPassword", errorConfig)

    } else {
      handleSubmit(onSubmit)()
    }
  }

  const goBackToSettings = () => {
    navigation.navigate("Settings")
  }

  return (
    <>
      {isSubmitted && <FileCreatedSection visible={isSubmitted} title="Password Changed" subheading={"Your password has successfully been changed"} buttonTitle="Return To Settings" buttonOnPress={goBackToSettings} />}
    <ScreenWrapperComp>
      <InputWrapper>
        <StyledTextInput
          hideText={true}
          error={errors.oldPassword}
          rules={{ required: "This field is required" }}
          control={control}
          placeHolderText="Old Password"
          name="oldPassword"
        />
        <StyledTextInput
          hideText={true}
          error={errors.newPassword}
          rules={{ required: "This field is required"}}
          control={control}
          placeHolderText="New Password"
          name="newPassword"
        />
        <StyledTextInput
          hideText={true}
          error={errors.confirmPassword}
          rules={{
            required: "This field is required"
          }}
          control={control}
          placeHolderText="Confirm New Password"
          name="confirmPassword" 
        />
      </InputWrapper>

      <ButtonWrapper>
        <BasicButton title="Change Password" onPress={handledButtonPress} />
      </ButtonWrapper>
      
      </ScreenWrapperComp>
      </>
  );
};

export default ChangePasswordScreen;
