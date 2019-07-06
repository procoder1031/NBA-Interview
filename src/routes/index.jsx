
import Main from "../../src/components/Main";
import EditProfile from "../../src/components/Edit"
import Favourites from "../../src/components/Favourites"

var indexRoutes = [
  { path: "/edit/:playerId", name: "Edit", component: EditProfile },
  { path: "/favourite", name: "Favourites", component: Favourites },
  { path: "/", name: "Home", component: Main }
];

export default indexRoutes;
