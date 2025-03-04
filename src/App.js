import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/routes";
// new comment to publish on git hub
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
