import * as React from "react"
import styled from "styled-components"
import { Switch, Typography } from "antd"
import { i18n } from "core"
import { LOCAL_STORAGE_KEY } from "shared"

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-column-gap: 4px;
  grid-template-columns: 50px 50px 70px;
`

export const ToggleLanguageSwitch: React.FC = () => {
  const defaultLanguage = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE)
  const [checked, setChecked] = React.useState(defaultLanguage === "vn")

  const onChangeLanguage = (checked: boolean) => {
    const newLanguage = checked ? "vn" : "en"
    i18n.i18nInstance.changeLanguage(newLanguage)
    setChecked(checked)
    localStorage.setItem(LOCAL_STORAGE_KEY.LANGUAGE, newLanguage)
  }

  return (
    <Container>
      <Typography.Text>English</Typography.Text>
      <Switch onChange={onChangeLanguage} checked={checked} />
      <Typography.Text>Tiếng Việt</Typography.Text>
    </Container>
  )
}
