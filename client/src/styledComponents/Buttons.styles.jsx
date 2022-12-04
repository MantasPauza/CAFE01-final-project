import styled from "styled-components";

const YellowButton = styled.button`
padding: 0.6em 2em;
border: none;
outline: none;
color: #211d22;
background: #fde0a6;
cursor: pointer;
position: relative;
z-index: 0;
border-radius: 10px;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
box-shadow: 0 1px 2px rgba(0,0,0,0.15);
transition: all 0.3s ease-in-out;
  :hover {
    background: #6dc5b9 !important;
    box-shadow: #fde0a6 0px 20px 30px -10px !important;
    color: #211d22 !important;
    :before {
      transform: scale(1.5) !important;
      opacity: 0 !important;
      transition: all 0.3s ease-in-out !important;
    }
    ::after {
      box-shadow: 0 5px 15px #6dc5b9;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
`;

const BlueButton = styled.button`
  padding: 0.6em 2em;
  margin-top: 1em;
  border: none;
  outline: none;
  background: #6dc5b9;
  color:'#372523';
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: all 0.3s ease-in-out;
  :hover {
    background: #fde0a6 !important;
    box-shadow: #6dc5b9 0px 20px 30px -10px !important;
    color: #211d22 !important;
    :before {
      transform: scale(1.5) !important;
      opacity: 0 !important;
      transition: all 0.3s ease-in-out !important;
    }
    ::after {
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
`;

const EditButton = styled.button`
  padding: 0.4em;
  border: none;
  outline: none;
  color: #211d22;
  background: #fde0a6;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  :hover {
    background: #6dc5b9 !important;
    color: #211d22 !important;
  }
`;
const DeleteButton = styled.button`
  padding: 0.4em;
  border: none;
  outline: none;
  color: #211d22;
  background: #fde0a6;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  :hover {
    background: #6dc5b9 !important;
  }
`;

export { BlueButton, EditButton, DeleteButton, YellowButton };
