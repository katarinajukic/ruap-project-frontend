import React, { Component } from "react";
import UserService from "../service/user-service";
import '../css/home.css';
import { Link } from "react-router-dom";
import lungCancerImage from "./lc.jpg"; 

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      
      <div>
        <header className="jumbotron4">
          <h3>Welcome to our Lung Cancer Prediction Platform!</h3>
        </header>
        <img src={lungCancerImage} alt="Lung Cancer" className="lung-cancer-image" />
        <center>
        <p1>
          Lung cancer is a serious health issue, and early detection is crucial for effective treatment.<br /> Our predictive model utilizes advanced technology to assess various risk factors and provide insights into potential risks.
          </p1>
          <br />
          <p2>
          <br/>
          Take control of your health. Predict your lung cancer risk now!
        </p2>
        </center>
          <Link to="/user" type="submit" className="btn btn-primary btn-center mx-auto d-block">
            Predict Now
          </Link>
      </div>
    );
  }
}
