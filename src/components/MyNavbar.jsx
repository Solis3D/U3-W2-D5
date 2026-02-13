import { Container, Navbar, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = function (props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setCity(props.inputCity.trim());
  };

  return (
    <>
      <Navbar bg="dark-subtle" data-bs-theme="dark">
        <Container fluid className="px-3 py-1">
          <Link to="/">
            <Image src="../assets/images/logoMeteo.png" style={{ width: "150px" }} className="me-4"></Image>
          </Link>
          <Form onSubmit={handleSubmit} className=" d-flex gap-2">
            <Form.Control
              id="location-search"
              type="text"
              placeholder="City..."
              className=" mr-sm-2"
              value={props.inputCity}
              onChange={(e) => props.setInputCity(e.target.value)}
            />
            <Button type="submit" variant="dark">
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
