import { useState } from 'react'

import Navbar from './Navbar'
import Home from './Home'
import Login from './Login'
import Register from './Login/Register'
import Home2 from './Home2'
//APP MAIN IS THE REAL APP this is like home
function App() {
  const [isSignInClicked, setIsSignInClicked] = useState(false);

  const handleSignInClick = () => {
    console.log('2332')
    setIsSignInClicked(!isSignInClicked);
  };
  return (<div display='block' >
<Navbar onSignInClick={handleSignInClick} />
<Home onOpenDialog={isSignInClicked ? true: false} />
<Home2/>
  </div>
 
  )
}

export default App
