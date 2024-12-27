import { useRoutes } from "react-router-dom";
import { routesArray } from "./router";

function App() {
  let routesElement = useRoutes(routesArray);
  return (
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
  );
}

export default App;
