import { Route } from "react-router-dom";
import appRoutes from "./appRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetAppState } from "../Services/redux/reducer";
const PageWrapper = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.state) {
      dispatch(SetAppState(props.state));
    }
  }, [dispatch, props]);

  return <>{props.children}</>;
};

const generateRoute = (routes) => {
  return routes.map((route, index) =>
    route.index ? (
      <Route
        index
        path={route.path}
        element={<PageWrapper state={route.state}>{route.element}</PageWrapper>}
        key={index}
      />
    ) : (
      <Route
        path={route.path}
        element={
          <PageWrapper state={route.child ? undefined : route.state}>
            {route.element}
          </PageWrapper>
        }
        key={index}>
        {route.child && generateRoute(route.child)}
      </Route>
    )
  );
};

export const routes = generateRoute(appRoutes);
