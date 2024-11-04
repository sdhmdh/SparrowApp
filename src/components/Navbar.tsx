import { useNavigation } from "../context/NavigationContext";
import sparrowLogo from "../assets/sparrow.svg";
import "../styles/components/navbar.scss";

const Navbar = () => {
  const { isSidebarOpen, toggleSidebar } = useNavigation();

  return (
    <div className="navbar">
      <label className="navbar__hamburger">
        <input
          type="checkbox"
          className="navbar__hamburger-checkbox"
          checked={isSidebarOpen}
        />
        <span
          className="navbar__hamburger-lines"
          onClick={toggleSidebar}
        ></span>
      </label>
      <div className="navbar__logo">
        <img src={sparrowLogo} alt="Sparrow Logo" />
      </div>
    </div>
  );
};

export { Navbar };
