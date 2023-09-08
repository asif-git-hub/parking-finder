import { HttpClient } from "../clients/http"
import {
  MelbOpenDataParkingResponse,
  StatusDescription,
} from "../types/melb.opendata.types"

export class MelbOpenDataApi {
  httpClient: HttpClient
  rootUrl: string

  constructor() {
    this.httpClient = new HttpClient()
    this.rootUrl =
      "https://data.melbourne.vic.gov.au/api/records/1.0/search/?dataset=on-street-parking-bay-sensors"
  }

  async getEmptySpots(
    longitude: number,
    latitude: number,
    rows: number = 5,
    radiusInKm: number = 250
  ): Promise<MelbOpenDataParkingResponse> {
    console.log("getEmptySpots() called", { longitude, latitude, radiusInKm })
    const status = StatusDescription.UNOCCUPIED

    const q = `q=status_description: ${status}`
    const where = `where=within_distance(location, GEOM'POINT(${latitude} ${longitude})', ${radiusInKm}m`

    const url = `${this.rootUrl}&rows=${rows}&${q}&${where}`

    // https://data.melbourne.vic.gov.au/api/records/1.0/search/?dataset=on-street-parking-bay-sensors&q=status_description: Unoccupied&where=within_distance(location, GEOM'POINT(-37.813777354420296 144.97210804500946)', 3km) 

    const response = await this.httpClient.get(url)

    return response.data
  }
}
