import React, {
  // useEffect,
  useState,
} from "react";

const SearchWeather = () => {
  const apiKey = "294f6f9646abfd275856f168d0c5b743";

  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [dataMain, setDataMain] = useState([]);
  const [yogin, setYogin] = useState(null);
  // const [input, setInput] = useState(search);
  const handleClick = async (e) => {
    e.preventDefault();
    // const city = e.target.elements.city.value;
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const api = await response.json();
    setData(api);
    setDataMain(api.main);
    setYogin(api.clouds.all);
    console.log(api);
  };
  let temp = (dataMain.temp - 273.15).toFixed(0);
  let temp_min = (dataMain.temp_min - 273.15).toFixed(0);
  let temp_max = (dataMain.temp_max - 273.15 + 3).toFixed(0);

  let emoji = null;
  if (typeof data.main !== "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main === "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main === "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else <div>...Loading</div>;
  const sana = new Date();
  const hafta = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  const oy = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentyabr",
    "oktyabr",
    "noyabr",
    "dekabr",
  ];
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <div className="card text-white text-center">
              <img
                src="https://source.unsplash.com/600x900/?nature,water"
                className="card-img"
                alt="..."
              />
              <div className="card-img-overlay">
                <form onSubmit={handleClick}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      className="form-control input-focus-border-none"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="button-addon2"
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                    />
                    <button
                      className="input-group-text"
                      type="submit"
                      id="button-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                {data.length === 0 ? (
                  <p>No data</p>
                ) : (
                  <div className="bg-dark bg-opacity-50 py-3">
                    <h2 className="card-title">{data.name}</h2>
                    <p className="card-text lead">
                      {hafta[sana.getDay()]}, {sana.getDate()}-
                      {oy[sana.getMonth()]}, {sana.getFullYear()}
                    </p>
                    <hr />
                    <i className={`fas ${emoji} fa-4x`}></i>
                    <h1 className="fw-bolder mb-5">{temp}&deg;C</h1>
                    <h3>yog'ingarchilik {yogin}%</h3>
                    <p className="lead fw-bolder mb-0">
                      {data.weather[0].main}
                    </p>
                    <p className="lead">
                      {temp_min}&deg;C | {temp_max}&deg;C
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
