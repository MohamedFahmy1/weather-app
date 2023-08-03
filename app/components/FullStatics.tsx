"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForcastCard from "./ForcastCard";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { CordContext } from "@/store/cordContext";

const FullStatics: React.FC<{ tempUnitC: (status: boolean) => void }> = (
  props
) => {
  const ctx = useContext(CordContext);
  const [tempUnitC, setTempUnitC] = useState(true);
  const tempUnitCHandler = () => {
    setTempUnitC(true);
  };
  const tempUnitFHandler = () => {
    setTempUnitC(false);
  };
  props.tempUnitC(tempUnitC);
  return (
    <section className="fullStatics">
      <div className="buttons">
        <button
          className={tempUnitC ? "active" : undefined}
          onClick={tempUnitCHandler}
        >
          <span className="cele">C</span>
        </button>
        <button
          className={!tempUnitC ? "active" : undefined}
          onClick={tempUnitFHandler}
        >
          <span className="fehr">F</span>
        </button>
      </div>
      <div className="cardsContainer">
        {ctx.currentWeatherData["forecast"]?.["forecastday"].map(
          (card: any, index: number) => {
            if (index !== 0) {
              return (
                <ForcastCard
                  key={card.date}
                  minTempC={
                    tempUnitC
                      ? card["day"]["mintemp_c"]
                      : card["day"]["mintemp_f"]
                  }
                  maxTempC={
                    tempUnitC
                      ? card["day"]["maxtemp_c"]
                      : card["day"]["maxtemp_f"]
                  }
                  icon={card["day"]["condition"]["icon"]}
                  date={card.date}
                  tempUnitC={tempUnitC}
                />
              );
            }
          }
        )}
      </div>
      <h2>Today&apos;s Hightlights</h2>
      <div className="boxContainer">
        <div className="box">
          <p>Wind Status</p>
          <h3>
            {ctx.currentWeatherData["current"]?.["wind_mph"].toFixed()}
            <span>mph</span>
          </h3>
          <div className="windDir">
            <FontAwesomeIcon icon={faLocationArrow} className="icon" />
            <span>{ctx.currentWeatherData["current"]?.["wind_dir"]}</span>
          </div>
        </div>
        <div className="box">
          <p>Humidity</p>
          <h3>
            {ctx.currentWeatherData["current"]?.["humidity"]}
            <span>%</span>
          </h3>
          <div className="prog">
            <span
              style={{
                width: `${ctx.currentWeatherData["current"]?.["humidity"]}%`,
              }}
            ></span>
          </div>
        </div>
        <div className="box">
          <p>Visibility</p>
          <h3>
            {ctx.currentWeatherData["current"]?.["vis_miles"]}{" "}
            <span>miles</span>
          </h3>
        </div>
        <div className="box">
          <p>Air Pressure</p>
          <h3>
            {ctx.currentWeatherData["current"]?.["pressure_mb"]} <span>mb</span>
          </h3>
        </div>
      </div>
      <footer>
        <p>
          created by{" "}
          <a
            href="https://github.com/mohamedFahmy1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mohamed Fahmy
          </a>{" "}
          - fetched data from Weather api
        </p>
      </footer>
    </section>
  );
};

export default FullStatics;
