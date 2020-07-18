import { observable } from "mobx"
import { CityModel } from "./CityModel"
import { WeatherDetailModel } from "./WeatherDetailModel"

export class AppModel {
  @observable cityModel: CityModel
  @observable weatherDetailModel: WeatherDetailModel

  constructor() {
    this.cityModel = new CityModel()
    this.weatherDetailModel = new WeatherDetailModel()
  }
}

export const appModel = new AppModel()
