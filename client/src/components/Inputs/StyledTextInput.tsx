import React, { FC, useState, useRef, useEffect } from "react";
import { View } from "react-native";
import { Controller, FieldError} from "react-hook-form";

import styled from "styled-components/native";
import ShowHideButton from './ShowHideButton';

import {
  backgroundColor,
  borderColor,
  backgroundGray,
  Text300,
  logoutRed,
} from "../../shared/color";

const TextInputWrapper = styled.View`
  width: 327px;
  height: 50px;
  margin: 10px 0px;
  padding-left: 16px;
  background-color: ${backgroundGray};
  font-family: "Inter_400Regular";
  border: 1px solid ${borderColor};
  border-radius: 8px;
  flex-direction: row;
  padding-right: 16px;
  align-items: center;
`

const TextInputWithStyles = styled.TextInput<{textSize: string}>`
  background-color: ${backgroundGray};
  font-family: "Inter_400Regular";
  height: auto;
  flex: 1;
  font-size: ${props => props.textSize};
`;

export const ErrorText = styled.Text`
  color: ${logoutRed};
  font-family: "Inter_400Regular";
  font-size: 16px;
`

interface StyledTextInputProps {
  placeHolderText: string;
  control: any;
  rules: any;
  name: string;
  error: any;
  hideText: boolean | undefined;
  styles?: {};
  otherOptions?: {};
}

const StyledTextInput: FC<StyledTextInputProps> = ({
  placeHolderText,
  control,
  rules,
  name,
  error,
  hideText,
  styles,
  otherOptions
}) => {

  let temp: "12px" | "16px" = "16px"
  if (hideText) {
    temp = "12px";
  }
  const [secureTextEntryValue, setSecureTextEntryValue] = useState(hideText)
  const [textSize, setTextSize] = useState<"12px" | "16px">(temp)


  const swapTextSize = () => {
    if (textSize == "16px") {
      setTextSize("12px")
    } else {
      setTextSize("16px")
    }
  }
  const showHideText = () => {
    setSecureTextEntryValue(!secureTextEntryValue)
    swapTextSize()
    
  }


  return (
   
    <>
    <Controller
      control={control}
      rules={rules}
        render={({ field: { onChange, onBlur, value } }) => {
          
          let tempTextSize = textSize
          if (!value) {
            tempTextSize = "16px";
          }

        return (
          <TextInputWrapper style={styles}>
            <TextInputWithStyles
              {...otherOptions}
              placeholder={placeHolderText}
              placeholderTextColor={Text300}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntryValue}
              textSize={tempTextSize}
            />
              {hideText && <ShowHideButton onPress={showHideText}/>}
            
          </TextInputWrapper>
        );
      }}
      name={name}
      />
      {error && <ErrorText>*{error.message}</ErrorText>}
    </>
  );
};

export default StyledTextInput;
