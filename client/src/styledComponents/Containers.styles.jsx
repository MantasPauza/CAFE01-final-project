import styled from "styled-components";

const LoginContainer = styled.div`
@media (min-width: 768px) {
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
    background: #1228A4;
    border-radius: 10px;
}
::before {
    content: "";
    position: absolute;
    width: 80%;
    height: 300%;
    background: linear-gradient(0deg, transparent, 
        transparent, #D4A10B);
    animation: animate 6s linear infinite;
}
::after {
    content: "";
    position: absolute;
    width: 80%;
    height: 300%;
    background: linear-gradient(0deg, transparent, 
        transparent, #D4A10B);
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

export { LoginContainer };