import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Registration';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container id='form_container' className={'d-flex flex-column w-50 gap-2 align-items-center'} >
      <Login/>
      <Register />
    </Container>
  );
}

export { App };
