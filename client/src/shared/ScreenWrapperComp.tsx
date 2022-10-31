import React, { FC, useState } from 'react';
import { View } from 'react-native';
import styled from "styled-components/native"
import { backgroundColor } from './color';
import IsProtectedComp from "./IsProtectedComp";


const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
  flex-direction: column;
  align-items: center;
  margin: 0px 24px;
`


const ScreenBackgroundColor = styled.View`
  background-color: ${backgroundColor};
  flex: 1;
`

interface ScreenWrapperCompProps {
  children: React.ReactNode;
  isScreenProtected?: boolean;

}

const ScreenWrapperComp: FC<ScreenWrapperCompProps> = ({children, isScreenProtected}) => {
  const [isProtected, setIsProtected] = useState(false);
  //just left this in here
  function isAnonymous(){
    return true;
  }
  const checkUser = async () => {
    const isAnonymousRes = await isAnonymous();
    setIsProtected(isAnonymousRes as any);
  }

  if (isScreenProtected) {
    checkUser()
  }


  return (
  <ScreenBackgroundColor>
      {!isProtected ? (
          <IsProtectedComp navigation={undefined}/>  

      ): (   

        <ScreenWrapper>
      {children}
        </ScreenWrapper> 

      )

}
</ScreenBackgroundColor>
  );
};

export default ScreenWrapperComp