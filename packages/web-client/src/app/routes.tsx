import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import LoginPage from "../components/LoginPage";


export default createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <div>not found</div>,
    },
    {
        path: "login",
        element: <LoginPage/>,
    },
]);