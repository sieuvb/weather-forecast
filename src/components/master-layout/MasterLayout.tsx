import * as React from "react"
import { Typography } from "antd"
import styled from "styled-components"
import { ToggleLanguageSwitch } from "./ToggleLanguageSwitch"

interface IMasterLayoutProps {
  title: string
}

const HEADER_HEIGHT = "60px"

const LayoutContainer = styled.div`
  height: 100vh;
  width: 100vw;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: yellow;
  height: ${HEADER_HEIGHT};
  width: 100%;
  padding: 0 64px;

  h1.ant-typography {
    margin-bottom: 0;
  }
`

const BodyContent = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT});
  width: 100%;
  padding: 32px 64px;
`

export const MasterLayout: React.FC<IMasterLayoutProps> = ({ children, title }) => (
  <LayoutContainer>
    <Header>
      <Typography.Title>Weather Forecast</Typography.Title>
      <ToggleLanguageSwitch />
    </Header>
    <BodyContent>
      <Typography.Title level={2}>{title}</Typography.Title>
      {children}
    </BodyContent>
  </LayoutContainer>
)
