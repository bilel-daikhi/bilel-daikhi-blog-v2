import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/routes";
import { AuthProvider } from "./hooks/auths";
// new comment to publish on git hub 2
function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
