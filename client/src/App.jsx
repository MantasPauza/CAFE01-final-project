import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Registration';
import { Container } from 'react-bootstrap';
import { useFadeIn } from './custom_hooks/useFadeIn';
import { useRef, useState } from 'react';



function App() {

  const [login, setLogin] = useState(true);

  // create a log in function that will set the login state to true and use given id to show according user page
  const logIn = (id) => {
    setLogin(true);
  }
  const logOut = (id) => {
    setLogin(false);
  }
  const ref = useRef();
  useFadeIn(ref, logIn);
  useFadeIn(ref, logOut);

  return (
    <div className="App">
      <Container>
        <div ref={ref}>
          {login ? <Login logIn={logIn} /> : <Register logOut={logOut} />}
          <Register />
        </div>
      </Container>
    </div>
  );



/*   const [showLogin, setShowLogin] = useState(false);
  const ref = useRef();
  useFadeIn(ref, 1000);
  return (
    <Container ref={ref} id='form_container' className={'d-flex flex-column w-50 gap-2 align-items-center'} >
      <Login show={showLogin} />
      <Register />
    </Container>
  ); */
}

export { App };
