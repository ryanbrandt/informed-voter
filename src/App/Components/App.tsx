import React from "react";
import { Provider } from "react-redux";

import configureStore from "../../store/store";

import RootContainer from "./RootContainer";

const App = (): React.ReactElement => {
  const { store } = configureStore();

  return (
    <Provider store={store}>
      <div className="App">
        <RootContainer />
      </div>
    </Provider>
  );
};

export default App;
