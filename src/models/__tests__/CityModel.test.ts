import { CityModel, MAXIMUM_CITIES } from "models/CityModel"
import { LOCAL_STORAGE_KEY, ICity } from "shared"
import { forecastService } from "services/ForecastService"

jest.mock("services/ForecastService")

const createNewCity: () => ICity = () => ({
  id: "1000",
  name: "New City",
  coord: {
    lat: 10,
    lon: 10,
  },
  main: {
    feels_like: 10,
    temp: 10,
    temp_max: 20,
    temp_min: 2,
  },
  sys: {
    country: "VN",
  },
  weather: [],
})

describe("CityModel.test", () => {
  test("should call local storage to get saved selected cities when constructing", () => {
    const cityModel = new CityModel()
    expect(localStorage.getItem).toBeCalledWith(LOCAL_STORAGE_KEY.SELECTED_CITIES)
  })

  test("should fetch city when having current location", () => {
    const cityModel = new CityModel()
    cityModel.currentCoords = {
      latitude: 10.6,
      longitude: 17.7,
    }
    expect(forecastService.searchCityByLocation).toHaveBeenCalledTimes(1)
  })

  test("canAddNew show return false when selectedCities larger than MAXIMUM_CITIES", () => {
    const cityModel = new CityModel()
    for (let i = 0; i < MAXIMUM_CITIES; i++) {
      cityModel.addCity(createNewCity())
    }
    expect(cityModel.canAddNew).toBe(false)
  })

  test("addCity should add successfully to selectedCities", () => {
    const cityModel = new CityModel()
    const newCity = createNewCity()

    cityModel.addCity(newCity)
    expect(cityModel.selectedCities[0]).toStrictEqual(newCity)
  })

  test("addCity should call saveSelectedCity to save data to local storage", () => {
    const cityModel = new CityModel()
    const newCity = createNewCity()

    cityModel.saveSelectedCity = jest.fn()
    cityModel.addCity(newCity)
    expect(cityModel.saveSelectedCity).toBeCalledTimes(1)
  })

  test("removeCity should remove successfully in selectedCities", () => {
    const cityModel = new CityModel()
    const newCity = createNewCity()
    cityModel.selectedCities = [newCity]

    cityModel.removeCity(newCity)
    expect(cityModel.selectedCities.length).toBe(0)
  })

  test("removeCity should call saveSelectedCity to save data to local storage", () => {
    const cityModel = new CityModel()
    const newCity = createNewCity()
    cityModel.selectedCities = [newCity]

    cityModel.saveSelectedCity = jest.fn()
    cityModel.removeCity(newCity)
    expect(cityModel.saveSelectedCity).toBeCalledTimes(1)
  })
})
