import './App.css';
import Formatter from "./components/Formatter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap";
import {Fragment} from "react";

function App() {
  return (
      <Fragment>
          <Container>
              <Header className="page-header"/>
              <Formatter className="page-body"/>
          </Container>
          <Footer/>
      </Fragment>
  );
}

export default App;
