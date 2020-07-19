import * as React from "react"
import styled from "styled-components"
import { isEmpty } from "lodash"
import { useParams } from "react-router-dom"
import { MasterLayout } from "components"
import { appModel } from "models"
import { observer } from "mobx-react-lite"
import { CurrentWeather } from "./CurrentWeather"
import { DailyWeather } from "./DailyWeather"
import { IDailyWeather } from "shared"
import { Spin } from "antd"

interface QueryParams {
  id: string
}

const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px 60px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

export const CityDetail = observer((props: any) => {
  const { id } = useParams() as QueryParams
  const selectedCity = appModel.weatherDetailModel.selectedCity
  const dailyWeatherDetails = appModel.weatherDetailModel.weatherDetail?.daily as IDailyWeather[]

  React.useEffect(() => {
    appModel.weatherDetailModel.init(id)
  }, [id])

  return (
    <Spin spinning={appModel.weatherDetailModel.loading}>
      <MasterLayout title={selectedCity?.name}>
        {isEmpty(selectedCity) ? (
          <div>404 Not Found</div>
        ) : (
          <DetailContainer>
            <CurrentWeather />
            {!isEmpty(dailyWeatherDetails) &&
              dailyWeatherDetails.map((detail, index) => <DailyWeather key={index} dailyWeatherDetail={detail} />)}
          </DetailContainer>
        )}
      </MasterLayout>
    </Spin>
  )
})
