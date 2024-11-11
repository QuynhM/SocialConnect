import { Link as RouterLink } from "react-router-dom";
// import "../Style.css"
import "./logo.css"

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <div class="logo">
        <h3>Social <span>Connect</span></h3>
    </div>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
