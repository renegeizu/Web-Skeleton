import { generatePath } from "react-router";

export enum ROUTES {
  home = "home",
}

type RoutesType = `${ROUTES}`;

const routeBuilder = (path: RoutesType): RouteBuilderType => {
  const generate = (path: string, parameters = {}) => {
    return generatePath(path, parameters);
  };

  const routes: RouteType = {
    home: {
      route: "/",
      generate: () => {
        return generate("/");
      },
    },
  };

  return routes[path];
};

type RouteType = {
  home: RouteBuilderType;
};

type RouteBuilderType = {
  route: string;
  generate: () => string;
};

export default routeBuilder;
