import React from "react";
import { useLocation } from "react-router";

import { Button, Countdown } from "handsome-ui";

import { history } from "../../routes/index";

interface Props {
  onResolve?: Function;
  variant?: 401 | 404;
  message?: string;
}

const ErrorScreen: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const { state = {} } = useLocation<Props>();

  const mergedProps: Props = { ...props, ...state };

  const handleRecovery = () => {
    const { onResolve } = mergedProps;

    history.push("/");

    if (onResolve) {
      onResolve();
    }
  };

  const _computeErrorHeader = (): string => {
    const { variant } = state;

    let header = "We're having a moment";
    if (variant === 404) {
      header = "Not Found";
    } else if (variant === 401) {
      header = "Unauthorized";
    }

    return header;
  };

  const _computeErrorMessage = (): string => {
    const { message } = mergedProps;

    let errorMessage = "An Unexpected Error has Occured";
    if (message) {
      errorMessage = message;
    }

    return errorMessage;
  };

  return (
    <div className="app_error-screen">
      <h1>{_computeErrorHeader()}</h1>
      <p>{_computeErrorMessage()}</p>
      <p>We'll refresh the page for you in:</p>
      <Countdown initialCount={10} onCompletion={handleRecovery} />
      <p>Or you can continue manually</p>
      <Button title="Continue" onClick={handleRecovery} inverting />
    </div>
  );
};

export default ErrorScreen;
