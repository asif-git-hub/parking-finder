import React, { useEffect, useMemo, useRef } from "react"
import { useGlobalContext } from "../context"
import { MelbOpenDataApi } from "../api/melb.opendata"
import { ParkingInfo } from "../components/ParkingInfo"
import useScript from "../hooks/use.script"
import { getEnvVar } from "../utils/common.utils"

const api = new MelbOpenDataApi()

const GOOGLE_API_KEY = getEnvVar("REACT_APP_GOOGLE_API_KEY")

export function Home() {
  const {
    destination,
    setDestination,
    parkingData,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    setParkingData,
  } = useGlobalContext()

  const autoCompleteRef = useRef<google.maps.places.Autocomplete>()
  const destinationInputRef = useRef<HTMLInputElement>(null)

  const googleScript = useScript(
    // By default, Google Places will attempt to guess your language based on your country.
    `https://maps.googleapis.com/maps/api/js?language=en&key=${GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`
  )

  const inputAutocompleteOptions = useMemo(
    () => ({
      componentRestrictions: { country: "au" },
      fields: ["name", "geometry.location"],
    }),
    []
  )

  useEffect(() => {
    // Conditions to ensure that no multiple instances of the
    if (
      autoCompleteRef.current ||
      googleScript === "loading" ||
      !destinationInputRef.current ||
      !window.google ||
      !window.google.maps ||
      !window.google.maps.places
    ) {
      return
    }

    if (googleScript === "error") {
      // Report error
      return
    }

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      destinationInputRef.current,
      inputAutocompleteOptions
    )

    autoCompleteRef.current.addListener("place_changed", () => {
      if (!autoCompleteRef.current) {
        return
      }

      // Retrieve the selected location with the `getPlace` method.
      const place = autoCompleteRef.current?.getPlace()
      setLatitude(place.geometry?.location?.lat())
      setLongitude(place.geometry?.location?.lng())

      setDestination(place.name!)
    })
  }, [googleScript, inputAutocompleteOptions, handleSubmit])

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("Submitting: ", destination)
    if (latitude && longitude) {
      const data = await api.getEmptySpots(longitude, latitude)
      setParkingData(data)
      console.log(parkingData)

    }
  }

  const handleDestinationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Dont allow users to input
    setDestination(e.target.value)
  }

  return (
    <div>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          <h3>City Parking Finder</h3>
          <div className="form-control">
            <input
              id="destination"
              type="text"
              name="destination"
              className="grocery"
              ref={destinationInputRef}
              placeholder="e.g Patricia Coffee"
              value={destination}
              required={true}
              autoFocus={true}
              onChange={handleDestinationInput}
            />
            <button type="submit" className="submit-btn">
              Let's Go
            </button>
          </div>
        </form>
      </section>
      {/* Parking Data */}
      {parkingData?.records.map((record) => {
        return (
          <ParkingInfo
            key={record.recordid}
            bayId={record.fields.parkingbay_id}
            info={record.fields.status_timestamp}
            zoneId={record.fields.zone_number}
            location={record.fields.location}
          ></ParkingInfo>
        )
      })}
    </div>
  )
}
