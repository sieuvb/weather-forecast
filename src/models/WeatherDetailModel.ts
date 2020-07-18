import { observable, action } from "mobx"
import { ICity, LOCAL_STORAGE_KEY, IWeatherDetail } from "shared"
import { get, isEmpty, isArray } from "lodash"
import { forecastService } from "services/ForecastService"

export class WeatherDetailModel {
  @observable loading: boolean = false
  @observable selectedCity?: ICity
  @observable weatherDetail?: IWeatherDetail

  @action
  init = (selectedCityId: string) => {
    const savedSelectedCitiesJSON = localStorage.getItem(LOCAL_STORAGE_KEY.SELECTED_CITIES)

    if (!isEmpty(savedSelectedCitiesJSON)) {
      const selectedCities = JSON.parse(savedSelectedCitiesJSON as string) as ICity[]
      if (isArray(selectedCities)) {
        this.selectedCity = selectedCities.find(({ id }) => String(id) === selectedCityId)
        this.fetchWeatherDetail()
      }
    }
  }

  @action
  fetchWeatherDetail = async () => {
    if (isEmpty(this.selectedCity)) {
      return null
    }
    const lat = get(this.selectedCity, "coord.lat")
    const lon = get(this.selectedCity, "coord.lon")

    try {
      this.loading = true
      const response = await forecastService.fetchWeatherDetail(lat, lon)
      this.weatherDetail = response?.data
    } finally {
      this.loading = false
    }
  }
}

export const weatherDetailModel = new WeatherDetailModel()
