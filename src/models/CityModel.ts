import { observable, action, computed, reaction } from "mobx"
import { forecastService } from "services/ForecastService"
import { ICity, LOCAL_STORAGE_KEY } from "shared"
import { get, isEmpty } from "lodash"

export const MAXIMUM_CITIES = 10

export class CityModel {
  @observable isSearching: boolean = false
  @observable selectedCities: ICity[] = []
  @observable searchedCities: ICity[] = []
  @observable currentCoords?: Coordinates
  @observable currentCity?: ICity

  constructor() {
    const savedCities = localStorage.getItem(LOCAL_STORAGE_KEY.SELECTED_CITIES)

    if (!isEmpty(savedCities)) {
      this.selectedCities = JSON.parse(savedCities as string)
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.currentCoords = position.coords
    })

    reaction(
      () => this.currentCoords,
      async (currentCoords) => {
        if (currentCoords) {
          const response = await forecastService.searchCityByLocation(currentCoords.latitude, currentCoords.longitude)
          this.currentCity = get(response.data, "list.0")
          localStorage.setItem(LOCAL_STORAGE_KEY.CURRENT_CITY, JSON.stringify(this.currentCity))
        }
      },
      { fireImmediately: true }
    )
  }

  @computed
  get canAddNew() {
    return this.selectedCities.length < MAXIMUM_CITIES
  }

  @action
  saveSelectedCity = () => {
    const selectedCityJSON = JSON.stringify(this.selectedCities)
    localStorage.setItem(LOCAL_STORAGE_KEY.SELECTED_CITIES, selectedCityJSON)
  }

  @action
  handleSearchCity = async (cityName: string) => {
    try {
      this.isSearching = true
      const response = await forecastService.searchCity(cityName)
      this.searchedCities = get(response, "data.list", [])
    } catch {
      this.searchedCities = []
    } finally {
      this.isSearching = false
    }
  }

  @action
  addCity = (city: ICity) => {
    this.selectedCities.push(city)
    this.searchedCities = this.searchedCities.filter(({ id }) => id !== city.id)
    this.saveSelectedCity()
  }

  @action
  removeCity = (city: ICity) => {
    this.selectedCities = this.selectedCities.filter(({ id }) => id !== city.id)
    this.saveSelectedCity()
  }
}
