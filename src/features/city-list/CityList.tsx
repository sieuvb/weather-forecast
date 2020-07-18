import * as React from "react"
import styled from "styled-components"
import { MasterLayout } from "components"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"

const GridContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  padding: 16px;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
`

export const CityList = ({}) => {
  const { t } = useTranslation()

  return (
    <MasterLayout title="Cities List">
      <GridContainer>
        <CardContainer>
          <PlusCircleOutlined style={{ fontSize: "24px" }} />
          {t("TEST")}
        </CardContainer>
      </GridContainer>
    </MasterLayout>
  )
}
