import CurrentMeteo from "./CurrentMeteo";

const Home = function (props) {
  return <CurrentMeteo city={props.city} setInputCity={props.setInputCity} />;
};

export default Home;
