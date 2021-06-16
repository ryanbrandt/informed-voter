import React from "react";

import { Chevron, Row, Github, WorldWideWeb, Button } from "handsome-ui";

import { history } from "../../routes";

import VotingBoxSvg from "../../assets/Svg/VotingBoxSvg";

const Landing = (): React.ReactElement => {
  const SRC_URL = "https://github.com/ryanbrandt/informed-voter";
  const FEC_API_URL = "https://api.open.fec.gov/developers";

  const handleLinkClick = (url: string): void => {
    if (url) {
      const newWindow = window.open(url);

      if (newWindow) {
        newWindow.opener = null;
      }
    }
  };

  const _renderLinkSection = (): React.ReactNode => {
    return (
      <Row version="space-evenly" className="landing_link-section">
        <div className="landing_link" onClick={() => handleLinkClick(SRC_URL)}>
          Source Code
          <Github />
        </div>
        <div
          className="landing_link"
          onClick={() => handleLinkClick(FEC_API_URL)}
        >
          FEC API Documentation
          <WorldWideWeb />
        </div>
      </Row>
    );
  };

  const _renderSearchSection = (): React.ReactNode => {
    return (
      <div className="landing_search-container">
        <Button
          className="landing_start"
          title="Get Started"
          onClick={() => history.replace("/candidate-search")}
          inverting
          round
        />
      </div>
    );
  };

  return (
    <div className="landing_container">
      <div className="landing_title">Welcome to Informed Voter!</div>
      <div className="landing_content">
        Get the facts about federal candidates campaign funding and spending
        with aggregated Federal Election Comittee data.
      </div>
      <VotingBoxSvg className="landing_svg" />
      {_renderLinkSection()}
      {_renderSearchSection()}
    </div>
  );
};

export default Landing;
