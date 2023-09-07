import React from "react"

export type ParkingInfoType = {
  bayId: number
  zoneId: number
  info: string
  location: number[]
}

export function ParkingInfo({ bayId, zoneId, info, location}: ParkingInfoType) {
    const googleLink = `https://www.google.com/maps?q=${location[0]},${location[1]}`
  return (
    <div className="parking-info-container">
      <p>
        Bay Id: {bayId}
        <br></br>
        <a className="takeme-link" href={googleLink} target="_blank" rel="noreferrer">Take me there</a>
      </p>
    </div>
  )
}
