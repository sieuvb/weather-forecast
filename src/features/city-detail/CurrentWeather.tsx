import * as React from "react"
import styled from "styled-components"
import { Temperature } from "components"
import { appModel } from "models"
import { observer } from "mobx-react-lite"
import { Typography } from "antd"
import { convertUnixToDate, getWeatherImageUrl, ICity } from "shared"
import { useTranslation } from "react-i18next"
import { CardContainer } from "./components"

const LeftContainer = styled.div`
  display: grid;
  grid-row-gap: 6px;
`

const RightContainer = styled.div`
  text-align: center;
`

export const CurrentWeather: React.FC = observer(() => {
  const { t } = useTranslation()
  const selectedCity = appModel.weatherDetailModel.selectedCity as ICity
  const currentWeatherDetail = appModel.weatherDetailModel.weatherDetail?.current

  return (
    <CardContainer>
      <LeftContainer>
        <Typography.Title level={3}>{convertUnixToDate(currentWeatherDetail?.dt)}</Typography.Title>
        <Typography.Title>
          <Temperature value={selectedCity?.main?.temp} tooltipMessage={t("TEMP")} />
        </Typography.Title>
        <Typography.Text strong>{t("FEELS_LIKE", { value: Math.round(selectedCity.main.feels_like) })}</Typography.Text>
        <Typography.Title level={3}>
          <Temperature value={selectedCity?.main?.temp_min} tooltipMessage={t("TEMP_MIN")} />
          &nbsp;/&nbsp;
          <Temperature value={selectedCity?.main?.temp_max} tooltipMessage={t("TEMP_MAX")} />
        </Typography.Title>
      </LeftContainer>
      <RightContainer>
        <img src={getWeatherImageUrl(selectedCity?.weather[0]?.icon)} />
        <Typography.Title level={4}>{selectedCity?.weather[0]?.description}</Typography.Title>
      </RightContainer>
    </CardContainer>
  )
})
