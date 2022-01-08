import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./landingPage.css";
import {Link} from 'react-router-dom'
function LandingPage() {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro">
            <div>
              <h1 className="title">Welcome</h1>
              <p className="subtitle">Login if already a user </p>
            </div>
            <div className="buttonContainer">
            <Link to="/login">
                <Button size="lg" variant="outline-primary" className="landingbutton">
                  Login
                </Button>
            </Link>    
            <Link to="/register">
            <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton">
                  Signup
                </Button>
            </Link>   
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
