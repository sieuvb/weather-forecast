import * as React from "react"
import styled from "styled-components"
import { isEmpty } from "lodash"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { Modal, Input, Divider, Spin, Typography } from "antd"
import { appModel } from "models"
import { SearchItem } from "./SearchItem"
import { SelectedItem } from "./SelectedItem"

interface IAddCityModalProps {
  modalVisible: boolean
  onCloseModal: () => void
}

const NoResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100%;
`

export const AddCityModal: React.FC<IAddCityModalProps> = observer(({ modalVisible, onCloseModal }) => {
  const { t } = useTranslation()

  const onSearchCity = (value: string) => {
    appModel.cityModel.handleSearchCity(value)
  }

  const searchedCities = appModel.cityModel.searchedCities
  const selectedCities = appModel.cityModel.selectedCities

  return (
    <Modal
      title={t("ADD_NEW_CITY")}
      visible={modalVisible}
      onCancel={onCloseModal}
      cancelText={t("CLOSE")}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Input.Search placeholder={t("INPUT_CITY_NAME")} enterButton={t("SEARCH")} onSearch={onSearchCity} />
      <Divider>{t("SEARCH_RESULT")}</Divider>
      <Spin spinning={appModel.cityModel.isSearching}>
        {isEmpty(searchedCities) ? (
          <NoResultContainer>
            <Typography.Text>{t("NO_RESULT")}</Typography.Text>
          </NoResultContainer>
        ) : (
          searchedCities.map((city) => <SearchItem key={city.id} cityDetail={city} />)
        )}
      </Spin>
      {!isEmpty(selectedCities) && (
        <>
          <Divider>{t("SELECTED_CITIES")}</Divider>
          {selectedCities.map((city) => (
            <SelectedItem key={city.id} cityDetail={city} />
          ))}
        </>
      )}
    </Modal>
  )
})
