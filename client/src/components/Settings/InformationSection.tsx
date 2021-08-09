import React, { FC } from 'react';
import { View } from 'react-native';
import styled from "styled-components/native"
import { backgroundGray, borderColor, Text500, Text300 } from '../../shared/color';

const OverallWrapper = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  padding: 8px 0px;
`

const ValueWrapper = styled.View`
  width: 327px;
  height: 40px;
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

const ValueText = styled.Text`
  font-family: "Inter_500Medium";
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.25px;
  color: ${Text500};
`

const HeaderText = styled.Text`
  font-family: "Inter_500Medium";
  font-size: 16px;
  letter-spacing: -0.25px;
  color: ${Text300};
  padding-left: 1px;
`

interface InformationSectionProps {
  header: string;
  value: string;
}

const InformationSection: FC<InformationSectionProps> = ({header, value}) => {
  return (
    <OverallWrapper>
      <HeaderText>
        {header}
      </HeaderText>
      <ValueWrapper>
        <ValueText>
          {value}
        </ValueText>
      </ValueWrapper>
    </OverallWrapper>
  )
}

export default InformationSection