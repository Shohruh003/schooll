import { Private } from './Private';
import { Public } from './Public';


function App() {
  const token = localStorage.getItem('token');
  if (token) {
    return <Private/>
  }
  return <Public/>
}

export default App;
