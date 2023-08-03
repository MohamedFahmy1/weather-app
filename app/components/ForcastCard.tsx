import Image from "next/image";

const ForcastCard: React.FC<{
  minTempC: number;
  maxTempC: number;
  icon: string;
  date: string;
  tempUnitC: boolean;
}> = ({ minTempC, maxTempC, icon, date, tempUnitC }) => {
  let forcast = new Date(date);
  let today = new Date();
  if (today.getDay() + 1 === forcast.getDay()) {
  }
  return (
    <div className="forcastCard">
      <p>
        {today.getDay() + 1 !== forcast.getDay()
          ? forcast?.toLocaleDateString("en-US", { weekday: "short" })
          : "Tomorrow"}
        ,{" "}
        {today.getDay() + 1 !== forcast.getDay()
          ? forcast?.toLocaleString("en-US", { day: "2-digit" })
          : ""}{" "}
        {today.getDay() + 1 !== forcast.getDay()
          ? forcast?.toLocaleString("en-US", { month: "short" })
          : ""}
      </p>
      <Image
        src={`https:${icon.replaceAll("64", "128")}`}
        alt="weather"
        width={100}
        height={100}
      />
      <div className="temp">
        <span>
          {Math.floor(maxTempC)}
          <span className="cele">{tempUnitC ? "C" : "F"}</span>
        </span>
        <span>
          {Math.floor(minTempC)}
          <span className="cele">{tempUnitC ? "C" : "F"}</span>
        </span>
      </div>
    </div>
  );
};

export default ForcastCard;
