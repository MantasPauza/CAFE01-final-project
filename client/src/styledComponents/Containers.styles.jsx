import styled from "styled-components";

const LoginContainer = styled.div`
  @media (max-width: 768px) {
    width: 80%;
    height: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    top: 30%;
    overflow: hidden;
    border-radius: 10px;
  }
  ::before {
    content: "";
    position: absolute;
    width: 80%;
    height: 300%;
    background: linear-gradient(0deg, transparent, transparent, #6dc5b9);
    animation: animate 6s linear infinite;
  }
  ::after {
    content: "";
    position: absolute;
    width: 80%;
    height: 300%;
    background: linear-gradient(0deg, transparent, transparent, #6dc5b9);
    animation: animate 6s linear infinite;
    animation-delay: 3s;
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @media (min-width: 768px) and (max-width: 992px) {
    width: 50%;
    height: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    top: 30%;
    overflow: hidden;
    border-radius: 10px;
  }

  @media (min-width: 993px) {
    width: 35%;
    height: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    top: 30%;
    overflow: hidden;
    border-radius: 10px;
  }
  ::before {
    content: "";
    position: absolute;
    width: 80%;
    height: 300%;
    background: linear-gradient(0deg, transparent, transparent, #6dc5b9);
    animation: animate 6s linear infinite;
  }
  ::after {
    content: "";
    position: absolute;
    width: 80%;
    height: 300%;
    background: linear-gradient(0deg, transparent, transparent, #6dc5b9);
    animation: animate 6s linear infinite;
    animation-delay: 3s;
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const HomeContainer = styled.div`
  width: 80%;
  padding: 2rem;
  margin: 0;
  background-color: #211d22;
  color: #fde0a6;
  input {
    background-color: #211d22;
    border: #70c6bb 2px solid;
    color: #fde0a6;
  }
  input:active,
  input:focus {
    background-color: #fde0a6 !important;
    border: #70c6bb 1px solid !important;
  }
  input:active::placeholder,
  input:focus::placeholder {
    color: #211d22 !important;
  }
  input::placeholder {
    color: #fde0a6;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  @media (min-width: 993px) {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const AddUserFormContainer = styled.form`
  padding: 2rem;
  @media (max-width: 768px) {
    max-width: 80%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1em;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    button {
      grid-row: 3;
      grid-column: 1 / 3;
      width: 50%;
      place-self: center;
    }
  }
  @media (min-width: 993px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    button {
      grid-row: 3;
      grid-column: 1 / 3;
      width: 50%;
      place-self: center;
    }
  }
`;

export { LoginContainer, HomeContainer, AddUserFormContainer };
