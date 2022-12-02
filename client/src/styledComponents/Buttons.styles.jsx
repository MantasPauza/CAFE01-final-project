import styled from "styled-components";

const LogInButton = styled.button`
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: #1228A4;
  
  
    
    background: linear-gradient(45deg, #D4A10B, #8a8a8a);
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
    background: linear-gradient(45deg, #8E92CD, #1228A4) !important;
    box-shadow: rgb(163 158 0) 0px 20px 30px -10px !important;
    color: #D4A10B !important;
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

const FormSubmitButton = styled.button`
  width: 30%;
  grid-row: auto;
  grid-column: 3/1;
  place-self: center;
  border-radius: 10px;
  border: none;
  outline: none;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background: #465fff66;
  color: white;
`;

const EditButton = styled.button`
  width: 30%;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background: #465fff66;
  color: white;
`;
const DeleteButton = styled.button`
  width: 30%;
  border-radius: 50px;
  border: none;
  background-image: linear-gradient(
    to right,
    #eb3941,
    #f15e64,
    #e14e53,
    #e2373f
  );
  box-shadow: 0 5px 15px rgba(242, 97, 103, 0.4);
  border-radius: 50px !important;
  transition: all 0.4s ease-in-out !important;
  :focus {
    outline: none !important;
  }
  :hover {
    background-position: 100% 0 !important;
    transition: all 0.4s ease-in-out !important;
  }
`;

export { LogInButton, FormSubmitButton, EditButton, DeleteButton };
