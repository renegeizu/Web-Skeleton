import React from "react";
import Strings from "../strings";

const Loading: React.FC = (): JSX.Element => {
  return <div>{Strings.t("global.loading")}</div>;
};

export default Loading;
