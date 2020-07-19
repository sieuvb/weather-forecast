import * as React from "react"
import styled from "styled-components"
import { CardContainer } from "./components"
import { Typography, Button, Tooltip } from "antd"
import { CloseOutlined, EnvironmentTwoTone } from "@ant-design/icons"
import { ICity, getWeatherImageUrl } from "shared"
import { appModel } from "models"
import { useTranslation } from "react-i18next"
import { Temperature } from "components"

interface IWeatherCardItemProps {
  city: ICity
  isCurrentLocation?: boolean
}

const Container = styled(CardContainer)`
  position: relative;
  text-align: center;

  .delete-btn {
    position: absolute;
    top: 6px;
    right: 8px;
    visibility: hidden;
  }

  :hover {
    .delete-btn {
      visibility: visible;
    }
  }

  .ant-typography {
    margin: 0 !important;
  }
`

const TemperatureContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: baseline;
`

export const WeatherCardItem: React.FC<IWeatherCardItemProps> = ({ city, isCurrentLocation }) => {
  const { t } = useTranslation()
  const onClickRemoveItem = () => {
    appModel.cityModel.removeCity(city)
  }

  const onClickItem = () => {
    window.location.href = `/${city.id}`
  }

  return (
    <Container onClick={onClickItem}>
      <Button
        className="delete-btn"
        onClick={onClickRemoveItem}
        shape="circle"
        danger
        icon={<CloseOutlined />}
      ></Button>
      <Typography.Title level={2}>
        {isCurrentLocation && (
          <Tooltip title={t("CURRENT_LOCATION")}>
            <EnvironmentTwoTone twoToneColor="#05336b" />
          </Tooltip>
        )}
        &nbsp;
        {city.name}
      </Typography.Title>
      <img src={getWeatherImageUrl(city.weather[0].icon)} />
      <Typography.Title level={4}>{city.weather[0].description}</Typography.Title>
      <br />
      <TemperatureContainer>
        <Typography.Title level={4} type="secondary">
          <Temperature value={city?.main?.temp_min} tooltipMessage={t("TEMP_MIN")} />
        </Typography.Title>
        <Typography.Title type="warning">
          <Temperature value={city.main.temp} tooltipMessage={t("TEMP")} />
        </Typography.Title>
        <Typography.Title level={4} type="danger">
          <Temperature value={city.main.temp_max} tooltipMessage={t("TEMP_MAX")} />
        </Typography.Title>
      </TemperatureContainer>
      <br />
      <Typography.Text strong>{t("FEELS_LIKE", { value: Math.round(city.main.feels_like) })}</Typography.Text>
    </Container>
  )
}
