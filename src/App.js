import logo from './logo.svg';
import './App.css';
import FirebaseTestApp from './Testing_Project/FirebaseTestApp';
import CrudOperation from './CrudOperation/CrudOperation';

function App() {
  return (
    <div className="App">
      {/* First Firebase App */}
      {/* <FirebaseTestApp/> */}
      <CrudOperation/>
    </div>
  );
}

export default App;
