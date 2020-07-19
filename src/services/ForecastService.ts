import * as axios from "axios"

const API_KEY = "ae63b1ac90797eea3122f243f741c501"

export class ForecastService {
  private instance: axios.AxiosInstance

  constructor() {
    this.instance = axios.default.create({
      baseURL: "https://api.openweathermap.org/data/2.5",
    })
  }

  searchCity(cityName: string) {
    return this.instance.request({
      method: "GET",
      url: "/find",
      params: {
        q: cityName,
        appId: API_KEY,
        units: "metric",
      },
    })
  }

  searchCityByLocation(lat: number, lon: number) {
    return this.instance.request({
      method: "GET",
      url: "/find",
      params: {
        lat,
        lon,
        appId: API_KEY,
        units: "metric",
      },
    })
  }

  fetchWeatherDetail(lat: string, lon: string) {
    return this.instance.request({
      method: "GET",
      url: "/onecall",
      params: {
        lat,
        lon,
        appId: API_KEY,
        units: "metric",
      },
    })
  }
}

export const forecastService = new ForecastService()
