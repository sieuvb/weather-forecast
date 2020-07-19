import * as React from "react"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { Typography, Button } from "antd"
import { appModel } from "models"
import { ICity } from "shared"
import { ItemContainer } from "./components"

interface ISearchItemProps {
  cityDetail: ICity
}

export const SelectedItem: React.FC<ISearchItemProps> = observer(({ cityDetail }) => {
  const { t } = useTranslation()

  const onClickRemoveItem = () => {
    appModel.cityModel.removeCity(cityDetail)
  }

  return (
    <ItemContainer>
      <Typography.Text>
        {cityDetail.name} ({cityDetail.sys.country})
      </Typography.Text>
      <Button danger size="small" onClick={onClickRemoveItem}>
        {t("REMOVE")}
      </Button>
    </ItemContainer>
  )
})
