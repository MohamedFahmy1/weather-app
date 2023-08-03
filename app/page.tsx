"use client";
import CordContextProvider, { CordContext } from "@/store/cordContext";
import FullStatics from "./components/FullStatics";
import TodayWeather from "./components/TodayWeather";
import { useContext, useState } from "react";
export default function Home() {
  const [tempUnitCel, setTempUnitCel] = useState(true);
  const ctx = useContext(CordContext);
  const tempUnitC = (status: boolean) => {
    setTempUnitCel(status);
  };
  // useEffect(() => {
  //   // Check if geolocation is supported by the browser
  //   if ("geolocation" in navigator) {
  //     // Prompt user for permission to access their location
  //     navigator.geolocation.getCurrentPosition(
  //       // Success callback function
  //       (position) => {
  //         // Get the user's latitude and longitude coordinates
  //         const lat = position.coords.latitude;
  //         const lng = position.coords.longitude;
  //         // Do something with the location data, e.g. display on a map
  //         ctx.replaceCord(lat, lng);
  //         ctx.currentWeather(lat, lng);
  //       },
  //       // Error callback function
  //       (error) => {
  //         // Handle errors, e.g. user denied location sharing permissions
  //         console.error("Error getting user location:", error);
  //       }
  //     );
  //   } else {
  //     // Geolocation is not supported by the browser
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // }, [ctx]);
  return (
    <main>
      <CordContextProvider>
        <TodayWeather tempUnitCel={tempUnitCel} />
        <FullStatics tempUnitC={tempUnitC} />
      </CordContextProvider>
    </main>
  );
}
