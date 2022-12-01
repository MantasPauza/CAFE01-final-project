import styled from "styled-components";

const FlashyButton = styled.button`
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
    :before {
        content: "";
        background: linear-gradient(
            45deg,
            #ff0000,
            #ff7300,
            #fffb00,
            #48ff00,
            #00ffd5,
            #002bff,
            #7a00ff,
            #ff00c8,
            #ff0000
        );
        position: absolute;
        top: -2px;
        left: -2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(5px);
        -webkit-filter: blur(5px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: glowing-button-85 20s linear infinite;
        transition: opacity 0.3s ease-in-out;
        border-radius: 10px;
    }
    @keyframes glowing-button-85 {
        0% {
            background-position: 0 0;
        }
        50% {
            background-position: 400% 0;
        }
        100% {
            background-position: 0 0;
        }
    }
    :after {
        z-index: -1;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: #222;
        left: 0;
        top: 0;
        border-radius: 10px;
    }
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

export { FlashyButton, FormSubmitButton, EditButton, DeleteButton };
