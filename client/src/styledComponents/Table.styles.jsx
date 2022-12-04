import styled from "styled-components";

const AttendeeTable = styled.table`
  overflow: hidden;
  width: 100%;
  thead {
    display: table;
    width: 100%;
    table-layout: fixed;
    overflow: hidden;
  }
  th,
  td {
    border: none !important;
    overflow: hidden;
    text-align: center;
  }
  tr:first-child {
    border-top: none !important;
  }
  tr {
    border-bottom: 1px solid #e3e3e3;
  }
  td {
    margin: 0.5rem 0.5rem;
    box-sizing: border-box;
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

export { AttendeeTable };
