import { Private } from './Private';
import { Public } from './Public';
import { LoginHooks } from './Hooks/LoginHooks';


function App() {
  const {token} = LoginHooks();
  if (token) {
    return <Private/>
  }
  return <Public/>
}

export default App;
