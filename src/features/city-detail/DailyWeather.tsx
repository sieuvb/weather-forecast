import * as React from "react"
import styled from "styled-components"
import { Temperature } from "components"
import { appModel } from "models"
import { observer } from "mobx-react-lite"
import { Typography } from "antd"
import { convertUnixToDate, getWeatherImageUrl, IDailyWeather } from "shared"
import { useTranslation } from "react-i18next"
import { CardContainer } from "./components"

interface IDailyWeatherProps {
  dailyWeatherDetail: IDailyWeather
}

const Container = styled(CardContainer)`
  background: white;

  .ant-typography {
    color: black;
  }
`

const LeftContainer = styled.div`
  display: grid;
  grid-row-gap: 12px;
`

const RightContainer = styled.div`
  text-align: center;
`

const TimeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;

  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const DailyWeather: React.FC<IDailyWeatherProps> = observer(({ dailyWeatherDetail }) => {
  const { t } = useTranslation()

  return (
    <Container>
      <LeftContainer>
        <Typography.Title level={3}>{convertUnixToDate(dailyWeatherDetail.dt, "DD-MM-YYYY")}</Typography.Title>
        <TimeContainer>
          <div>
            {t("MORNING")}
            <Typography.Title>
              <Temperature value={dailyWeatherDetail.temp.morn} tooltipMessage={t("TEMP")} />
            </Typography.Title>
          </div>
          <div>
            {t("AFTERNOON")}
            <Typography.Title>
              <Temperature value={dailyWeatherDetail.temp.day} tooltipMessage={t("TEMP")} />
            </Typography.Title>
          </div>
          <div>
            {t("EVENING")}
            <Typography.Title>
              <Temperature value={dailyWeatherDetail.temp.eve} tooltipMessage={t("TEMP")} />
            </Typography.Title>
          </div>
          <div>
            {t("NIGHT")}
            <Typography.Title>
              <Temperature value={dailyWeatherDetail.temp.night} tooltipMessage={t("TEMP")} />
            </Typography.Title>
          </div>
        </TimeContainer>
      </LeftContainer>
      <RightContainer>
        <img src={getWeatherImageUrl(dailyWeatherDetail?.weather[0]?.icon)} />
        <Typography.Title level={4}>{dailyWeatherDetail?.weather[0]?.description}</Typography.Title>
      </RightContainer>
    </Container>
  )
})
