import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../Style.css';
// import "./welcome.css"

const WelcomePage = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate()
  
    const onButtonClick = () => {
      navigate('/login');
    }


    return (
      <div className="mainContainer" style={{background:"linear-gradient(to bottom, var(--color-light) 65%, var(--color-secondary) 73%, var(--color-primary))"}} >
        <div className="welcome">
          <div>Welcome to</div>
        </div>
        <div class="logoWelcome" >
              <h3>Social <span>Connect</span></h3>
          </div>
        <div className="buttonContainer">
          <input
            className="inputButton"
            type="button"
            onClick={onButtonClick}
            value={loggedIn ? 'Log out' : 'Log in'}
          />
          {loggedIn ? <div>Your email address is {email}</div> : <div />}
        </div>
      </div>
    )
  }
  

export default WelcomePage
