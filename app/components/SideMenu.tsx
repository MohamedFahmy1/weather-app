import { CordContext } from "@/store/cordContext";
import {
  faAngleRight,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
const SideMenu: React.FC<{
  sideMenuStatus: boolean;
  closeSideMenu: () => void;
}> = ({ sideMenuStatus, closeSideMenu }) => {
  const [touched, setTouched] = useState(false);
  const [searched, setSearched] = useState(false);
  const ctx = useContext(CordContext);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const cityName = cityInputRef.current!.value.trim();
    ctx.addCord(cityName);
  };
  const cairoForcastHandler = () => {
    ctx.addCord("cairo");
    ctx.currentWeather(30.033333, 31.233334);
    setSearched(true);

    closeSideMenu();
  };
  const alexForcastHandler = () => {
    ctx.addCord("alexandria");
    ctx.currentWeather(31.205753, 29.924526);
    setSearched(true);
    closeSideMenu();
  };
  const aswanForcastHandler = () => {
    ctx.addCord("aswan");
    ctx.currentWeather(24.088938, 32.89983);
    setSearched(true);
    closeSideMenu();
  };

  useEffect(() => {
    const getUserLocation = () => {
      if (!touched || !searched) {
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
          setTouched(true);
          setSearched(true);
        }
      } else {
        const { lat, lon } = ctx.cord;
        ctx.currentWeather(lat, lon);
      }
    };
    getUserLocation();
  }, [ctx, touched, searched]);

  return (
    <aside className={sideMenuStatus ? "sideMenu active" : "sideMenu"}>
      <div className="close" onClick={closeSideMenu}>
        <FontAwesomeIcon icon={faXmark} className="icon" />
      </div>
      <form onSubmit={submitHandler}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
        <input
          type="text"
          placeholder="search loaction ex: cairo"
          ref={cityInputRef}
        />
        <input type="submit" value="Search" onClick={closeSideMenu} />
      </form>
      <ul>
        <h2>Frequently Searched:</h2>
        <li onClick={cairoForcastHandler}>
          Cairo
          <FontAwesomeIcon icon={faAngleRight} />
        </li>
        <li onClick={alexForcastHandler}>
          Alexandria
          <FontAwesomeIcon icon={faAngleRight} />
        </li>
        <li onClick={aswanForcastHandler}>
          Aswan
          <FontAwesomeIcon icon={faAngleRight} />
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
