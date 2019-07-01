import React, { Component } from 'react';
import './Home.scss';
import logo from '../../assets/images/logo.svg';
import banner1 from '../../assets/images/home_banner_1.svg';
import banner2 from '../../assets/images/home_banner_2.svg';
import Button from '../../components/Button';
import twitter from '../../assets/images/twitter.png';
import instagram from '../../assets/images/instagram.png';
import snapchat from '../../assets/images/snapchat.png';

const socialMediaLinks = [
  {
    icon: twitter,
    link: 'https://twitter.com/@healthup'
  },
  {
    icon: instagram,
    link: 'https://instagram.com/healthup'
  },
  {
    icon: snapchat,
    link: 'https://snapchat.com/healtup'
  }
];
class Home extends Component{
  render(){
    return (
      <div className="home-page">
        <div className="nav">
          <div className="logo">
            <img src={logo} alt="" />
            <span>Health Up</span>
          </div>
          <div className="buttons">
            <Button link="/register">
              Register
            </Button>
            <Button secondary link="/login">
              Login
            </Button>
          </div>
        </div>
        <div className="container">
          <div className="banner">
            <div className="info">
              <h4 className="title">VISION</h4>
              <p className="text">
                Achieving the objectives of Vision 2030 in the health aspect
              </p>
            </div>
            <img src={banner2} alt="" />
          </div>
          <div className="banner">
            <img src={banner1} alt="" />
            <div className="info">
              <h4 className="title">OBJECTIVES</h4>
              <p className="text">
                <ol>
                  <li>To protect the healthy person from the disease</li>
                  <li>Providing the paramedic with the individual's health status</li>
                  <li>A complete health file for each person</li>
                </ol>
              </p>
            </div>
          </div>
          <div className="info-banner">
            <h4 className="title">Preventive</h4>
            <p className="content">
              Our goal is to protect the healthy person from all genetic diseases and others by reminding him to do the necessary
              tests and avoid what may cause the disease
            </p>
          </div>
          <div className="info-banner">
            <h4 className="title">Safe</h4>
            <p className="content">
              Our site is characterized by providing the paramedic with the state of health of the injured easily
              to be able to carry out the emergency operation properly
            </p>
          </div>
        </div>
        <div className="footer">
          <div className="socialMedia">
            {
              socialMediaLinks.map(({ link, icon}) => (
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
