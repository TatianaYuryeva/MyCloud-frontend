import { NavLink } from "react-router-dom";

function Menu({loginStatus}) {
  return (
    <nav className="menu">
        <NavLink to="/login" className="menu__item">
          <button className="btn login-btn">{loginStatus ? 'Выйти' : 'Войти'}</button>
        </NavLink>
    </nav>
  );
}

export default Menu