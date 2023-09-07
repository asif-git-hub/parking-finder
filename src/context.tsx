import {
  MelbOpenDataParkingResponse,
} from "./types/melb.opendata.types"
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"

export type AppContextType = {
  destination: string
  setDestination: Dispatch<SetStateAction<string>>

  longitude: number | undefined
  setLongitude: Dispatch<SetStateAction<number | undefined>>

  latitude: number | undefined
  setLatitude: Dispatch<SetStateAction<number | undefined>>

  parkingData: MelbOpenDataParkingResponse | undefined
  setParkingData: Dispatch<
    SetStateAction<MelbOpenDataParkingResponse | undefined>
  >
}

const defaultState: AppContextType = {
  destination: "",
  setDestination: () => {},

  longitude: undefined,
  setLongitude: () => {},

  latitude: undefined,
  setLatitude: () => {},

  parkingData: undefined,
  setParkingData: () => {},
}

export const AppContext = createContext<AppContextType>(defaultState)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [destination, setDestination] = useState("")

  const [longitude, setLongitude] = useState<number | undefined>(undefined)
  const [latitude, setLatitude] = useState<number | undefined>(undefined)

  const [parkingData, setParkingData] = useState<
    MelbOpenDataParkingResponse | undefined
  >(undefined)

  return (
    <AppContext.Provider
      value={{
        destination,
        setDestination,
        longitude,
        setLongitude,
        latitude,
        setLatitude,
        parkingData,
        setParkingData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
