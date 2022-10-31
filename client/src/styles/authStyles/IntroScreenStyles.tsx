import styled from "styled-components/native"
import { Text400, Text500 } from '../../shared/color';


export const HeaderImage = styled.Image`
  height: 115px;
  align-items: center;

  
`

const IntroWidth = styled.Text`
  width: 260px;
  align-items: center;
  margin-left: 75px;
  margin-top:20px;

`


export const ImageWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 115px;
  margin-top: 40px;
`

export const Header3 = styled(IntroWidth)`
  font-family: "Inter_500Medium";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  /* or 150% */
  color: ${Text500};
  text-align: center;
  letter-spacing: -1.5px;
  align-items: center;

`

export const Header3Second = styled(Header3)`
  padding-top: 20px;
`

export const Header2Light = styled(IntroWidth)`
  font-family: "Inter_400Regular";
  font-size: 18px;
  line-height: 28px;
  align-items: center;

  text-align: center;
  letter-spacing: -0.25px;
  color: ${Text400};
  padding-top: 28px;
`

export const ImageWrapper2 = styled.View`
  height: 140px;
  margin-top: 25px;
  align-items: center;


  
`

export const AuthButtonsWrapper = styled.View`
  padding-top: 30px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;


`