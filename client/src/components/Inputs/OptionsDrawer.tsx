import React, { FC, useRef } from 'react';
import styled from "styled-components/native"
import ActionSheet from 'react-native-actionsheet';

const OptionsDrawerWrapper = styled.View`
  z-index: 100;
`

interface Option {
  name: string;
  action: () => void;
}

interface OptionDrawerProps {
  options: Option[]
  drawerOpen: boolean;
  optionClicked: () => void;
}

const OptionsDrawer: FC<OptionDrawerProps> = ({ options, drawerOpen, optionClicked }) => {
  const actionSheet = useRef<any>();

  const optionArray: string[] = [];
  for (let i = 0; i < options.length; i++) {
    optionArray.push(options[i].name)
  }
  optionArray.push("Cancel")

  if (drawerOpen) {
    actionSheet.current.show();
  }

  return (

    <OptionsDrawerWrapper>
      <ActionSheet
        ref={actionSheet}
       
        options={optionArray}
        cancelButtonIndex={optionArray.length - 1}
        onPress={(index) => {
          optionClicked();
          if (index !== options.length) {
            options[index].action();
          }
        }}
        />
      </OptionsDrawerWrapper>
    
    
  )
}

export default OptionsDrawer