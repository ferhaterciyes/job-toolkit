import { NavLink } from "react-router-dom"
import  "./style.scss"
const Header = () => {
  return (
    <header>
      <div className="header-left">
        <img className="header-img" src="https://freepngimg.com/thumb/jobs/5-2-jobs-picture-thumb.png"/>
      <h2>İş Takip</h2>
      </div>
      <nav>
        <NavLink to={"/"}>İş Listesi </NavLink>
        <NavLink to={"/add"}>İş Ekle</NavLink>
      </nav>
    </header>
  )
}

export default Header
