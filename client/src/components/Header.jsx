import logo from './assets/1.png'

const Header = () => {
  return (
      <div className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
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
              <span className="fs-3 fw-medium ms-4">Project Manager</span>
          </a>

          <ul className="nav nav-pills">
              <li className="nav-item">
                  <a
                      href="#"
                      className="nav-link fw-medium text-dark"
                      aria-current="page">
                      Clients
                  </a>
              </li>
              <li className="nav-item">
                  <a href="#" className="nav-link fw-medium text-dark">
                      Projects
                  </a>
              </li>
          </ul>
      </div>
  );
}

export default Header
