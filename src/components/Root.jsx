import { Outlet } from "react-router-dom";
import NavBar from "./NavBar"


function Root() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Root