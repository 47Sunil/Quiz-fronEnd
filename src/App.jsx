import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Welcome, { action } from "./pages/Welcome";
import { Toaster } from "react-hot-toast";
import Lobby from "./pages/Lobby";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Lobbylayout from "./layout/Lobbylayout";
import RoomReady from "./components/RoomReady";
import Quiz, { quesAction } from "./pages/Quiz";
import Result from "./pages/Result";
const queryClient = new QueryClient();
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
      action: action,
      loader: () => {
        localStorage.removeItem("Token");
        return null;
      },
    },
    {
      path: "/lobby",
      element: <Lobbylayout />,
      children: [
        {
          index: true,
          element: <Lobby />,
        },
        {
          path: "room/:id",
          element: <RoomReady />,
        },
      ],
    },
    {
      path: "/quiz/:id",
      element: <Quiz />,
      action: quesAction,
    },
    {
      path: "/result/:id",
      element: <Result />,
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
