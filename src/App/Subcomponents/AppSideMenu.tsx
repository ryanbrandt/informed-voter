import React, { useState, useEffect } from "react";

import { SideMenu } from "handsome-ui";

import { history } from "../../routes";

export type MenuOption = "Home" | "Search Candidates";

const AppSideMenu = (): React.ReactElement => {
  const HOME_REGEX = /^\/$/;
  const SEARCH_REGEX = /^\/candidate-search$/;

  const computeActiveMenuItem = (): MenuOption | null => {
    const { location } = history;
    const { pathname } = location;

    let newActiveMenuItem: MenuOption | null = null;
    if (pathname.match(HOME_REGEX)) {
      newActiveMenuItem = "Home";
    } else if (pathname.match(SEARCH_REGEX)) {
      newActiveMenuItem = "Search Candidates";
    }

    return newActiveMenuItem;
  };

  const [activeMenuItem, setActiveMenuItem] = useState<MenuOption | null>(
    computeActiveMenuItem()
  );

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);

      setActiveMenuItem(computeActiveMenuItem());
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

  return <SideMenu options={SIDE_MENU_ITEMS} />;
};

export default AppSideMenu;
