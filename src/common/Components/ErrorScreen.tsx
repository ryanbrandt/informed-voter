import React from "react";
import { useLocation } from "react-router";

import { Button, Countdown } from "handsome-ui";

import { history } from "../../routes/index";

type ErrorVariant = 401 | 404 | 500 | 503;

interface Props {
  onResolve?: Function;
  variant?: ErrorVariant;
  message?: string;
}

const ErrorScreen: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const ERROR_TEXT_MAP = {
    401: {
      header: "Unauthorized",
      text: "You are not authorized to access this resource",
    },
    404: {
      header: "Not Found",
      text: "The requested resource was not found",
    },
    500: {
      header: "Unkown Server Error",
      text: "An unexpected server error occurred",
    },
    503: {
      header: "FEC API Service Unavailable",
      text: "The FEC API is currently not available-- try again later",
    },
  };

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

    let header = "We're Having a Moment";
    if (variant && ERROR_TEXT_MAP[variant]) {
      header = ERROR_TEXT_MAP[variant].header;
    }

    return header;
  };

  const _computeErrorMessage = (): string => {
    const { message, variant } = mergedProps;

    let errorMessage = "An unkown error has occurred";
    if (message) {
      errorMessage = message;
    } else if (variant && ERROR_TEXT_MAP[variant]) {
      errorMessage = ERROR_TEXT_MAP[variant].text;
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
