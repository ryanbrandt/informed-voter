import {
  createStore,
  applyMiddleware,
  compose,
  CombinedState,
  Store,
} from "redux";
import createSagaMiddleware from "redux-saga";

import { SearchAction } from "../CandidateSearch/actions";
import { SearchState } from "../CandidateSearch/reducer";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(): {
  store: Store<
    CombinedState<{
      search: SearchState;
    }>,
    SearchAction
  >;
} {
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  const composeEnhancers =
    process.env.NODE_ENV === "development"
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : (f: any) => f;
  const store = createStore(rootReducer, composeEnhancers(...enhancers));
  sagaMiddleware.run(rootSaga);

  return { store };
}
