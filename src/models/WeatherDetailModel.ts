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
    const savedSelectedCitiesJSON = localStorage.getItem(LOCAL_STORAGE_KEY.SELECTED_CITIES) as string
    const savedCurrentCityJSON = localStorage.getItem(LOCAL_STORAGE_KEY.CURRENT_CITY) as string

    if (!isEmpty(savedSelectedCitiesJSON) || !isEmpty(savedCurrentCityJSON)) {
      const selectedCities = JSON.parse(savedSelectedCitiesJSON) as ICity[]
      const currentCity = !isEmpty(savedCurrentCityJSON) && (JSON.parse(savedCurrentCityJSON) as ICity)

      if (isArray(selectedCities) || !isEmpty(currentCity)) {
        this.selectedCity = selectedCities?.find(({ id }) => String(id) === selectedCityId) || currentCity || undefined
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
