export type MelbOpenDataParkingResponse = {
  nhits: number
  records: MelbOpenDataParkingRecord[]
}

export type MelbOpenDataParkingRecord = {
  recordid: string
  fields: {
    status_timestamp: string
    parkingbay_id: number
    zone_number: number
    location: number[]
    status_description: "Unoccupied" | "Present"
  }
}

export enum StatusDescription {
  UNOCCUPIED = "Unoccupied",
  PRESENT = "Present",
}

/*
 {
                "status_timestamp": "2023-07-26T20:34:02+00:00",
                "lastupdated": "2023-07-27T00:44:35+00:00",
                "parkingbay_id": 6283,
                "zone_number": 7360,
                "location": [
                    -37.813777354420296,
                    144.97210804500946
                ],
                "status_description": "Unoccupied"
            },
*/
