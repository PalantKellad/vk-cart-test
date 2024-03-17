import './MainTitle.css'
import logo from '../../assets/images/logo.webp'

export function MainTitle() {
    return (
        <div className="main-title">
            <img className="main-title__logo" src={logo} alt="Логотип магазина «Синяя пятница»" width="120" height="120" />
            <div className="main-title__heading">
                <h1 className="main-title__name">«Синяя пятница»</h1>
                <p className="main-title__slogan">магазин для шопоголиков</p>
            </div>

        </div>

    )
}