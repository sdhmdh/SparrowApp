import { useNavigate } from "react-router-dom";
import { useNavigation } from "../context/NavigationContext";
import sparrowLogo from "../assets/sparrow.svg";
import {
  ProductOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../styles/components/sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useNavigation();

  const onLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <aside className={`sidebar ${isSidebarOpen ? "view-mobile" : ""}`}>
        <div className="header">
          <img src={sparrowLogo} alt="Sparrow Logo" />
        </div>
        <div className="content">
          <ul className="content__list">
            <li>
              <span>
                <ProductOutlined style={{ fontSize: 22 }} />
              </span>
              Dashboard
            </li>
            <li>
              <a
                href="https://www.sparrowfi.com/faqs"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <QuestionCircleOutlined style={{ fontSize: 22 }} />
                </span>
                FAQ's
              </a>
            </li>
          </ul>
        </div>
        <button className="logout" onClick={onLogout}>
          Logout
          <LogoutOutlined style={{ marginLeft: 8 }} />
        </button>
      </aside>
      <div
        className={`sidebar-bg ${isSidebarOpen ? "view-mobile" : ""} `}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export { Sidebar };
