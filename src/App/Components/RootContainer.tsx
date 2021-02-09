import React, { useState, useEffect } from "react";
import { Router } from "react-router";

import { AppContainer, SideMenu } from "handsome-ui";

import routes, { history } from "../../routes";

export type MenuOption = "Home" | "Search Candidates";

const RootContainer = (): React.ReactElement => {
  const HOME_REGEX = /^\/$/;
  const SEARCH_REGEX = /^\/candidate-search$/;

  const [activeMenuItem, setActiveMenuItem] = useState<MenuOption | null>(
    "Home"
  );

  useEffect(() => {
    const { location: mountingLocation } = history;
    const { pathname: mountingPath } = mountingLocation;

    if (!mountingPath.match(HOME_REGEX)) {
      history.replace("/");
    }

    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);

      const { location } = history;
      const { pathname } = location;

      let newActiveMenuItem: MenuOption | null = null;
      if (pathname.match(HOME_REGEX)) {
        newActiveMenuItem = "Home";
      } else if (pathname.match(SEARCH_REGEX)) {
        newActiveMenuItem = "Search Candidates";
      }

      setActiveMenuItem(newActiveMenuItem);
    });

    return () => unlisten();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SIDE_MENU_ITEMS = [
    {
      name: "Home",
      action: () => history.push("/"),
      active: activeMenuItem === "Home",
    },
    {
      name: "Search Candidates",
      action: () => history.push("/candidate-search"),
      active: activeMenuItem === "Search Candidates",
    },
  ];

  return (
    <AppContainer
      className="root-container"
      header={<SideMenu options={SIDE_MENU_ITEMS} open />}
    >
      <Router history={history}>{routes}</Router>
    </AppContainer>
  );
};

export default RootContainer;
