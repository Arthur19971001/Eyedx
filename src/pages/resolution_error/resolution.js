import {ReactComponent as Error} from "../../images/resoluation_error.svg";
import {ReactComponent as Logo} from "../../images/logo_eyedx.svg";
import "./resolution.css";

export const ResolutionError = () => {

    const header = (
        <div className = {'login_view_logo_div_FHD'}>
            <Logo className = {"login_view_logo"}/>
        </div>
    )

    const message = (
        <div className = 'resoulution_error_img'>
            <Error/>
        </div>
    )

    return (
        <div className = {'login_view_header_FHD'}>
            {header}
            {message}
        </div>
    )
}
