import Squares from "../components/Squares";
import Button from "../components/Button";

const Home = () => {
  return (
    <section>
      <div className="button-container">
        <Button onClick={() => {}} label="Add Square" />
        <Button onClick={() => {}} label="Clear All Squares" />
      </div>
      <div className="container">
        <Squares />
      </div>
    </section>
  );
};

export default Home;
