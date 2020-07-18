import * as React from "react"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { MasterLayout } from "components"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { Typography } from "antd"
import { appModel } from "models"
import { AddCityModal } from "./AddCityModal"
import { CardContainer } from "./components"
import { WeatherCardItem } from "./WeatherCardItem"

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`

export const CityList = observer(({}) => {
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = React.useState(false)
  const selectedCities = appModel.cityModel.selectedCities
  const onClickAddCity = () => {
    setModalVisible(true)
  }

  const onCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <MasterLayout title={t("CITY_LIST")}>
      <GridContainer>
        <CardContainer onClick={onClickAddCity}>
          <PlusCircleOutlined style={{ fontSize: "36px" }} />
          <br />
          <Typography.Text>{t("ADD_NEW_CITY")}</Typography.Text>
        </CardContainer>
        {selectedCities.map((city) => (
          <WeatherCardItem key={city.id} city={city} />
        ))}
      </GridContainer>
      <AddCityModal modalVisible={modalVisible} onCloseModal={onCloseModal} />
    </MasterLayout>
  )
})
