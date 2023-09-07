import { AxiosHeaders, AxiosResponse } from "axios"
import axios from "axios"

export class HttpClient {
  async get(url: string, headers?: AxiosHeaders): Promise<AxiosResponse> {
    const response = await axios({
      method: "get",
      url,
      headers,
    })

    return response
  }
}
