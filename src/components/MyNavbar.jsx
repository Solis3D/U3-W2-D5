import { Container, Navbar, Form, Button, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoMeteo from "../assets/images/logoMeteo.png";

const MyNavbar = function (props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setCity(props.inputCity.trim());
  };

  return (
    <>
      <Navbar bg="dark-subtle" data-bs-theme="dark">
        <Row className=" justify-content-between align-items-center w-100 g-2 g-md-2 py-2 py-md-0">
          <Col xs="4" md="4" lg="2">
            <Link to="/">
              <Image fluid src={logoMeteo} className="ms-1 "></Image>
            </Link>
          </Col>
          <Col xs="7" md="6" lg="5">
            <Form onSubmit={handleSubmit} className=" d-flex gap-2">
              <Form.Control
                id="location-search"
                type="text"
                placeholder="City..."
                className=" mr-sm-2"
                value={props.inputCity}
                onChange={(e) => props.setInputCity(e.target.value)}
              />
              <Button type="submit" variant="dark" className="py-md-3 px-md-5">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Navbar>
    </>
  );
};

export default MyNavbar;
