import { Private } from './Private';
import { Public } from './Public';
import { LoginHooks } from './Hooks/LoginHooks';
import Psycholog from './Pages/Psycholog/Psycholog';
import Login from './Pages/Login/Login';


function App() {
  // return <Login/>
  const {token} = LoginHooks();
  if (token) {
    return <Private/>
  }
  return <Public/>
}

export default App;
