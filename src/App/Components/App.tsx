import React from "react";
import { Provider } from "react-redux";

import configureStore from "../../store/store";

import ErrorBoundary from "./ErrorBoundary";
import RootContainer from "./RootContainer";

const App = (): React.ReactElement => {
  const { store } = configureStore();

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div className="App">
          <RootContainer />
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
