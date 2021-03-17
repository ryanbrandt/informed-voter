import React from "react";

import { Chevron, Row, Github, WorldWideWeb } from "handsome-ui";

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

  const _renderNextSection = (): React.ReactNode => {
    return (
      <div
        className="landing_start"
        onClick={() => history.replace("/candidate-search")}
      >
        Get Informed
        <Chevron className="landing_next-chevron" width={50} height={50} />
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
      {_renderNextSection()}
    </div>
  );
};

export default Landing;
