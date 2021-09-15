import React, { FC, useContext } from "react";
import { View, Text } from "react-native";
import ScreenWrapperComp from "../../shared/ScreenWrapperComp";
import { CenterView } from "../../styles/AppStyles";
import styled from "styled-components/native";
import StyledTextInput from "../../components/Inputs/StyledTextInput";
import { useForm } from "react-hook-form";
import BasicButton from "../../shared/BasicButton";
import { Primary } from "../../shared/color";
import { AuthContext } from '../../AppContext';

const InputWrapper = styled.View`
  padding-top: 50px;
`;

const ButtonWrapper = styled.View`
  padding-top: 60px;
`;

const ForgotPasswordText = styled.Text`
  color: ${Primary};
  font-family: "Inter_500Medium";
  font-size: 16px;
`

const ForgotPasswordWrapper = styled.TouchableOpacity`
  padding-top: 4px;
`

export interface LoginFormProps {
  email: string;
  password: string;
}

const LoginScreen: FC = () => {
  const { signIn } = useContext(AuthContext);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormProps>();

  const onSubmit = async (data: LoginFormProps) => {
    const response = await signIn(data)
   
    if (response) {
      const errorConfig = {type: "manual", message: response}
      setError("password", errorConfig)
    } 
  };

  const forgotPassword = () => {
    console.log("Forgot Password")
  }

  return (
    <ScreenWrapperComp>
      <InputWrapper>
        <StyledTextInput
          hideText={false}
          error={errors.email}
          rules={{ required: "This field is required" }}
          control={control}
          placeHolderText="Email"
          name="email"
        />
        <StyledTextInput
          hideText={true}
          error={errors.password}
          rules={{
            required: "This field is required"
          }}
          control={control}
          placeHolderText="Password"
          name="password"
        />
      </InputWrapper>

      <ButtonWrapper>
        <BasicButton title="Login" onPress={handleSubmit(onSubmit)} />
      </ButtonWrapper>

      <ForgotPasswordWrapper onPress={forgotPassword}>
        <ForgotPasswordText>Forgot your password?</ForgotPasswordText>
      </ForgotPasswordWrapper>
      
    </ScreenWrapperComp>
  );
};

export default LoginScreen;
