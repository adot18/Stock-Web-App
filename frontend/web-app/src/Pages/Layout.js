import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Layout = () => {
  return(
    <main>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </main>
  )
}

export default Layout;
