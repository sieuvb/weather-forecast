import * as React from "react"
import { Typography } from "antd"
import styled from "styled-components"
import { ToggleLanguageSwitch } from "./ToggleLanguageSwitch"

interface IMasterLayoutProps {
  title?: string
}

const HEADER_HEIGHT = "60px"

const LayoutContainer = styled.div`
  height: 100vh;
  width: 100vw;
`

const LeftHeader = styled.a`
  display: flex;
  align-items: center;

  img {
    width: 50px;
  }

  @media screen and (max-width: 425px) {
    .ant-typography {
      display: none;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #05336b;
  height: ${HEADER_HEIGHT};
  width: 100%;
  padding: 0 64px;

  .ant-typography {
    color: white;
    margin-bottom: 0;
  }

  @media screen and (max-width: 425px) {
    padding: 0 32px;
  }
`

const BodyContent = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT});
  width: 100%;
  padding: 32px 64px;
  overflow: auto;
  background-image: linear-gradient(#6e9cd5, #fff);

  @media screen and (max-width: 425px) {
    padding: 16px 32px;
  }
`

export const MasterLayout: React.FC<IMasterLayoutProps> = ({ children, title }) => (
  <LayoutContainer>
    <Header>
      <LeftHeader href="/">
        <img src="/weather-logo.png" />
        <Typography.Title level={2}>Weather Forecast</Typography.Title>
      </LeftHeader>
      <ToggleLanguageSwitch />
    </Header>
    <BodyContent>
      <Typography.Title level={2}>{title}</Typography.Title>
      {children}
    </BodyContent>
  </LayoutContainer>
)
