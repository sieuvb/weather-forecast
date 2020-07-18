import * as React from "react"
import { useParams } from "react-router-dom"
import { MasterLayout } from "components"

interface QueryParams {
  id: string
}

export const CityDetail = (props: any) => {
  const params = useParams() as QueryParams
  console.log({ params })
  return <MasterLayout title={`City Detail ${params.id}`}>hellu</MasterLayout>
}
