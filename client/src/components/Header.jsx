import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import logo from "./assets/1.png";
import { Menu } from "antd";
import PersonIcon from "@mui/icons-material/Person";
import {
    AppstoreOutlined,
} from "@ant-design/icons";

const Header = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: "Clients",
            key: "clients",
            icon: (
                <PersonIcon
                    color="dark"
                    style={{
                        height: "1.5rem",
                        width: "1.5rem",
                        verticalAlign: "-.5rem",
                    }}
                />
            ),
        },
        {
            label: "Projects",
            key: "projects",
            icon: (
                <AppstoreOutlined 
                />
            ),
        },
    ];
    const [current, setCurrent] = useState("");
    const onClick = (e) => {
        console.log(e.key);
        navigate(`/${e.key}`);
        setCurrent(e.key);
    };
    return (
        <>
            <div className="justify-content-center border-bottom">
                <a
                    href="/"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <img
                        src={logo}
                        className="image-fluid"
                        alt="logo"
                        width={"60px"}
                        height={"60px"}
                    />
                    <span className="fs-2 fw-medium ms-4">Verity Manage</span>
                </a>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                    style={{fontSize:'large'}}
                />

                {/* <ul className="nav nav-pills">
                <li className="nav-item">
                    <a
                        href="/clients"
                        className="btn btn-lg border fw-medium text-dark me-2"
                        aria-current="page">
                        Clients
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        href="/projects"
                        className="btn btn-lg border nav-link fw-medium text-dark">
                        Projects
                    </a>
                </li>
            </ul> */}
            </div>
            <Outlet />
        </>
    );
};

export default Header;
