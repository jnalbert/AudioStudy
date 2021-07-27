import React, { FC, useContext } from 'react';
import { View } from 'react-native';
import styled from "styled-components/native"

import StyledTextInput from '../../components/Inputs/StyledTextInput';
import { useForm} from "react-hook-form";
import BasicButton from '../../shared/BasicButton';
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';
import { AuthContext } from '../../AppContext';

const InputWrapper = styled.View`
  padding-top: 50px
`

const ButtonWrapper = styled.View`
  padding-top: 80px;
`

export interface SignUpFormProps {
  name: string;
  email: string;
  password: string;
}

const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


const SignUpScreen: FC = () => {
  const { signUp } = React.useContext(AuthContext);
  
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormProps>();

  const onSubmit = (data: SignUpFormProps) => {
    signUp(data)
  }

  return (
    <ScreenWrapperComp>

   

        <InputWrapper>
          <StyledTextInput hideText={false} error={errors.name} rules={{required: "This field is required"}} control={ control} placeHolderText="Name" name="name"/>
          <StyledTextInput hideText={false} error={errors.email} rules={{required: "This field is required", pattern:{value: emailRegExp, message: "Not a valid email"}}} control={ control} placeHolderText="Email" name="email" />
          <StyledTextInput hideText={true} error={errors.password} rules={{required: "This field is required", minLength: {value: 5, message: "Password is too short"}}} control={ control} placeHolderText="Password" name="password"/>
        </InputWrapper>

        <ButtonWrapper>
          <BasicButton title="Sign Up" onPress={handleSubmit(onSubmit)}/>
        </ButtonWrapper>

        
        
    </ScreenWrapperComp>
  )
}

export default SignUpScreen