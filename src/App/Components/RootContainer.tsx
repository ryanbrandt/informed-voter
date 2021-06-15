import React from "react";
import { Router } from "react-router";

import { AppContainer } from "handsome-ui";

import routes, { history } from "../../routes";
import { WindowSizeContext } from "../context";
import { useWindowSize } from "../hooks";
import AppSideMenu from "../Subcomponents/AppSideMenu";

export type MenuOption = "Home" | "Search Candidates";

const RootContainer = (): React.ReactElement => {
  const windowSize = useWindowSize();

  return (
    <WindowSizeContext.Provider value={windowSize}>
      <AppContainer className="root-container" header={<AppSideMenu />}>
        <Router history={history}>{routes}</Router>
      </AppContainer>
    </WindowSizeContext.Provider>
  );
};

export default RootContainer;
