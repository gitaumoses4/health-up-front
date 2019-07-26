import React, { Component } from 'react';
import './Home.scss';
import logo from '../../assets/images/logo.svg';
import banner1 from '../../assets/images/home_banner_1.svg';
import banner2 from '../../assets/images/home_banner_2.svg';
import Button from '../../components/Button';
import twitter from '../../assets/images/twitter.png';
import instagram from '../../assets/images/instagram.png';
import snapchat from '../../assets/images/snapchat.png';
import T from '../../utils/Translation';

const socialMediaLinks = [
  {
    icon: twitter,
    link: 'https://twitter.com/@healthupup',
  },
  {
    icon: instagram,
    link: 'https://instagram.com/healthupup',
  },
];
class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <div className="nav">
          <div className="logo">
            <img src={logo} alt="" />
            <span>{T.health_up}</span>
          </div>
          <div className="buttons">
            <Button link="/register">
              {T.register}
            </Button>
            <Button secondary link="/login">
              {T.login}
            </Button>
            <Button secondary link="/login/ambulance">
              {T.ambulance_login}
            </Button>
          </div>
        </div>
        <div className="container">
          <div className="banner">
            <div className="info">
              <h4 className="title">{T.vision.toUpperCase()}</h4>
              <p className="text">
                {T.vision_statement}
              </p>
            </div>
            <img src={banner2} alt="" />
          </div>
          <div className="banner">
            <img src={banner1} alt="" />
            <div className="info">
              <h4 className="title">{T.objectives}</h4>
              <p className="text">
                <ol>
                  <li>{T.objective_statement_1}</li>
                  <li>{T.objective_statement_2}</li>
                  <li>{T.objective_statement_3}</li>
                </ol>
              </p>
            </div>
          </div>
          <div className="info-banner">
            <h4 className="title">{T.preventive}</h4>
            <p className="content">
              {T.preventive_message}
            </p>
          </div>
          <div className="info-banner">
            <h4 className="title">{T.safe}</h4>
            <p className="content">
              {T.safe_message}
            </p>
          </div>
        </div>
        <div className="footer">
          <div className="socialMedia">
            {
              socialMediaLinks.map(({ link, icon }) => (
                <a href={link} className="item" key={link}>
                  <img src={icon} alt="" />
                </a>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
