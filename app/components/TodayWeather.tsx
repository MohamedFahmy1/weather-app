"use client";
import {
  faLocationCrosshairs,
  faCloud,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import SideMenu from "./SideMenu";
import { useContext, useState } from "react";
import { CordContext } from "@/store/cordContext";
const TodayWeather: React.FC<{ tempUnitCel: boolean }> = (props) => {
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const ctx = useContext(CordContext);
  const openSideMenuHandler = () => {
    setSideMenuActive(true);
  };
  const closeSideMenuHandler = () => {
    setSideMenuActive(false);
  };
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          ctx.replaceCord(lat, lng);
          ctx.currentWeather(lat, lng);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  };
  const date = new Date(ctx.currentWeatherData.location?.localtime);
  return (
    <section className="todayWeather">
      <SideMenu
        sideMenuStatus={sideMenuActive}
        closeSideMenu={closeSideMenuHandler}
      />
      <FontAwesomeIcon icon={faCloud} className="cloud cloud1" />
      <FontAwesomeIcon icon={faCloud} className="cloud cloud2" />
      <FontAwesomeIcon icon={faCloud} className="cloud cloud3" />
      <FontAwesomeIcon icon={faCloud} className="cloud cloud4" />
      <div className="buttons">
        <button className="search" onClick={openSideMenuHandler}>
          Search For Places
        </button>
        <button className="location" onClick={getUserLocation}>
          <FontAwesomeIcon icon={faLocationCrosshairs} className="icon" />
        </button>
      </div>
      <div className="weatherImage">
        {ctx.currentWeatherData.current && (
          <Image
            src={`https:${(ctx.currentWeatherData.current?.condition.icon).replaceAll(
              "64",
              "128"
            )}`}
            alt="weather"
            width={240}
            height={240}
          />
        )}
      </div>
      <p className="temper">
        {props.tempUnitCel
          ? ctx.currentWeatherData.current?.temp_c.toFixed() | 0
          : ctx.currentWeatherData.current?.temp_f.toFixed()}{" "}
        <span className="cele">{props.tempUnitCel ? "C" : "F"}</span>
      </p>
      <p className="description">
        {ctx.currentWeatherData.current?.condition.text}
      </p>
      <div className="date">
        <span>Today </span>
        {"."}
        <span>
          {" "}
          {ctx.currentWeatherData.location &&
            date?.toLocaleDateString("en-US", { weekday: "short" })}
          ,{" "}
          {ctx.currentWeatherData.location &&
            date?.toLocaleString("en-US", { day: "2-digit" })}{" "}
          {ctx.currentWeatherData.location &&
            date?.toLocaleString("en-US", { month: "short" })}
        </span>
      </div>
      <div className="city">
        <FontAwesomeIcon icon={faLocationDot} className="icon" />
        <span>
          {ctx.currentWeatherData.location?.name},
          {ctx.currentWeatherData.location?.region}
        </span>
      </div>
    </section>
  );
};

export default TodayWeather;
