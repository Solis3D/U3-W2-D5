import { useEffect, useState } from "react";
import { Col, Row, Spinner, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const endPointID = "e8d9d533ad663ec69241f0622eb2ba64";

const CurrentMeteo = function (props) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${endPointID}` + `&units=metric`;
  const [isLoading, setIsLoading] = useState(true);
  const [currentMeteoData, setCurrentMeteoData] = useState(null);

  const getCurrentMeteo = function () {
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
    if (!props.city?.trim()) return;
    setIsLoading(true);
    getCurrentMeteo();
    props.setInputCity("");
  }, [props.city]);

  useEffect(() => {
    if (!currentMeteoData) return;
    console.log(currentMeteoData);
  }, [currentMeteoData]);

  return (
    <Row className="mt-5 justify-content-center mx-2">
      <Col xs="auto" md={8} lg={5} className="bg-dark-subtle flex-column rounded">
        {isLoading && (
          <div className=" text-center p-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {!isLoading && currentMeteoData && (
          <>
            <h1 className="text-center mt-2">
              {currentMeteoData.name} - ({currentMeteoData.sys.country})
            </h1>
            <hr className="my-4 mx-2" />
            <Row className="my-4 px-2 px-lg-4 align-items-stretch g-2 gap-2">
              <Col className="rounded">
                <p className=" fs-4">Info</p>
                <hr className="me-md-4" />
                <p className=" fs-6 mb-2">Humidity: {currentMeteoData.main.humidity}%</p>
                <p className="fs-6 mb-2">Max Temperature: {Math.round(currentMeteoData.main.temp_max)} C°</p>
                <p className="fs-6 mb-2">Min Temperature: {Math.round(currentMeteoData.main.temp_min)} C°</p>
                <p className="fs-6 mb-2">Feels Like: {Math.round(currentMeteoData.main.feels_like)} C°</p>
                <p className="fs-6 mb-2">Sea level: {currentMeteoData.main.sea_level} m</p>
              </Col>
              <Col className="rounded" style={{ backgroundColor: "#40648E" }}>
                <div className=" text-center">
                  <p className=" fs-3 fw-bold">Current Weather</p>
                  <p className=" fs-4 m-0 text-capitalize">
                    {currentMeteoData.weather[0].description} | {Math.round(currentMeteoData.main.temp)}C°
                  </p>
                  <Image src={`https://openweathermap.org/img/wn/${currentMeteoData.weather[0].icon}@2x.png`}></Image>
                  <p className="mb-2">Wind speed: {currentMeteoData.wind.speed} m/s</p>
                </div>
              </Col>
            </Row>
            <hr className="my-4 mx-2" />
            <div className=" d-flex justify-content-center mb-3">
              <Link to="/Forecast" className="text-center">
                <Button variant="dark" className=" btn-outline-primary text-light">
                  View Forecast
                </Button>
              </Link>
            </div>
          </>
        )}
      </Col>
    </Row>
  );
};

export default CurrentMeteo;
