import { useEffect, useState } from "react";
import { Col, Row, Spinner, Image, Button, Container } from "react-bootstrap";

const Forecast = function (props) {
  const endPointID = "e8d9d533ad663ec69241f0622eb2ba64";
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${endPointID}&units=metric`;

  const [isLoading, setIsLoading] = useState(true);
  const [currentMeteoData, setCurrentMeteoData] = useState(null);

  const getForecastMeteo = function () {
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore recupero dati Meteo");
        }
      })
      .then((meteoData) => {
        setCurrentMeteoData(meteoData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Errore", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getForecastMeteo();
  }, [props.city]);

  useEffect(() => {
    if (!currentMeteoData) return;
    console.log(currentMeteoData);
  }, [currentMeteoData]);

  let dailyMeteo = null;

  if (currentMeteoData) {
    dailyMeteo = currentMeteoData.list.reduce((acc, item) => {
      const day = item.dt_txt.slice(0, 10);

      if (!acc[day]) {
        acc[day] = [];
      }

      acc[day].push(item);

      return acc;
    }, {});

    console.log("Daily", dailyMeteo);
  }

  return (
    <Row className=" g-2 gap-5 justify-content-center mb-4 px-3 px-md-0">
      {isLoading && (
        <div className=" text-center p-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>{" "}
        </div>
      )}

      {!isLoading && (
        <div className="text-center my-3">
          <h1 className="text-capitalize">{props.city}</h1>
          <h3>5 days Forecast</h3>
          <hr className="mt-3" />
        </div>
      )}

      {!isLoading &&
        dailyMeteo &&
        Object.entries(dailyMeteo).map(([day, hours]) => (
          <Col xs={12} md={5} lg="1" key={day} className="rounded p-3" style={{ backgroundColor: "#40648E" }}>
            <h4 className="mb-3 fs-3">{day}</h4>
            <hr />

            {hours.map((hour) => (
              <div key={hour.dt}>
                <div className=" d-flex align-items-center justify-content-between">
                  <p className=" d-inline m-0">
                    {hour.dt_txt.slice(11, 16)} – {Math.round(hour.main.temp)} C°
                  </p>
                  <Image src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}></Image>
                </div>
                <p className="m-0 text-capitalize">{hour.weather[0].description}</p>
                <hr />
              </div>
            ))}
          </Col>
        ))}
    </Row>
  );
};

export default Forecast;
