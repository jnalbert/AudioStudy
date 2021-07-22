import styled from "styled-components/native"
import { backgroundColor, Primary } from "./color"

export const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
  margin: 0px 24px;
`

export const BasicButton = styled.Button`
  color: white;
  flex-direction: column;
  align-items: center;
  margin: 16px 32px;
  background: ${Primary};
  border-radius: 8px;
`

export const ScreenBackgroundColor = styled.View`
  background-color: ${backgroundColor};
  flex: 1;
`