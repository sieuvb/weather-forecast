import * as React from "react"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { Typography, Button, Tooltip } from "antd"
import { appModel } from "models"
import { ICity } from "shared"
import { ItemContainer } from "./components"

interface ISearchItemProps {
  cityDetail: ICity
}

export const SearchItem: React.FC<ISearchItemProps> = observer(({ cityDetail }) => {
  const { t } = useTranslation()
  const isAdded = !!appModel.cityModel.selectedCities.find(({ id }) => id === cityDetail.id)
  const disableAddButton = isAdded || !appModel.cityModel.canAddNew

  const onClickAddItem = () => {
    appModel.cityModel.addCity(cityDetail)
  }

  return (
    <ItemContainer>
      <Typography.Text>
        {cityDetail.name} ({cityDetail.sys.country})
      </Typography.Text>
      <Tooltip title={disableAddButton && t("DISABLED_ADD_MESSAGE")}>
        <Button block type="primary" size="small" onClick={onClickAddItem} disabled={disableAddButton}>
          {t("ADD")}
        </Button>
      </Tooltip>
    </ItemContainer>
  )
})
