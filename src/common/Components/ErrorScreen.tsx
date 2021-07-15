import React from "react";

import { Button, Countdown } from "handsome-ui";

import { history } from "../../routes/index";

interface Props {
  onResolve?: Function;
  message?: string;
}

const ErrorScreen: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const handleRecovery = () => {
    const { onResolve } = props;

    history.push("/");

    if (onResolve) {
      onResolve();
    }
  };

  const _computeErrorMessage = (): string => {
    const { message } = props;

    let errorMessage = "An Unexpected Error has Occured";
    if (message) {
      errorMessage = message;
    }

    return errorMessage;
  };

  return (
    <div className="app_error-screen">
      <h1>We're having a moment</h1>
      <p>{_computeErrorMessage()}</p>
      <p>We'll refresh the page for you in:</p>
      <Countdown initialCount={10} onCompletion={handleRecovery} />
      <p>Or you can continue manually</p>
      <Button title="Continue" onClick={handleRecovery} inverting />
    </div>
  );
};

export default ErrorScreen;
