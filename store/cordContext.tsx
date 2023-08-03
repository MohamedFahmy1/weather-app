"use client";
import React, { useState } from "react";

type cordContextObj = {
  cord: { lat: number; lon: number };
  currentWeatherData: any;
  addCord: (cityName: string) => void;
  currentWeather: (lat: number, lan: number) => void;
  replaceCord: (lat: number, lon: number) => void;
};
interface Props {
  children: React.ReactNode;
}

export const CordContext = React.createContext<cordContextObj>({
  cord: { lat: 0, lon: 0 },
  currentWeatherData: {},
  addCord: (cityName) => {},
  currentWeather: (lat: number, lan: number) => {},
  replaceCord: (lat, lon) => {},
});

const CordContextProvider: React.FC<Props> = (props) => {
  const [cord, setCord] = useState<{ lat: number; lon: number }>({
    lat: 30.033333,
    lon: 31.233334,
  });
  const [currentWeatherData, setCurrentWeatherData] = useState<any>({});

  const addCordination = async (cityName: string) => {
    const cordApi = `https://api.weatherapi.com/v1/current.json?key=5825769423934d579fd132338230208&q=${cityName}&aqi=no`;
    try {
      const response = await fetch(cordApi);
      if (!response.ok) {
        throw new Error("Failed To Connent To Link");
      }
      const responseData = await response.json();
      setCord({
        lat: responseData["location"]["lat"],
        lon: responseData["location"]["lon"],
      });
    } catch (error) {
      console.error("failed to fetch data");
    }
  };
  const currentWeather = async (lat: number, lon: number) => {
    const apiLink = `https://api.weatherapi.com/v1/forecast.json?key=5825769423934d579fd132338230208&q=${lat},${lon}&days=6&aqi=no&alerts=no`;
    try {
      const response = await fetch(apiLink);
      if (!response.ok) {
        throw new Error("Failed To Connent To Link");
      }
      const responseData = await response.json();
      setCurrentWeatherData(responseData);
    } catch (error) {
      console.error("failed to fetch data");
    }
  };
  const replaceCordintaion = (lat: number, lon: number) => {
    setCord({ lat: lat, lon: lon });
  };
  const contextValue: cordContextObj = {
    addCord: addCordination,
    currentWeather: currentWeather,
    replaceCord: replaceCordintaion,
    cord: cord,
    currentWeatherData: currentWeatherData,
  };
  return (
    <CordContext.Provider value={contextValue}>
      {props.children}
    </CordContext.Provider>
  );
};

export default CordContextProvider;
