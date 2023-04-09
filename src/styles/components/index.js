import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
  padding: 6rem;
  height: 100vh;
  max-width: 984px;
  margin: auto;
  @media (max-width: 600px) {
    padding: 2rem;
  }
`;

export const GridContainer = styled.section`
  display: grid;
  grid-template-columns: 0fr 1fr 0fr;
  gap: 20px;
  width: 100%;
  background-color: hsl(0, 0%, 100%);
  padding: 1.4rem;
  align-items: start;
  border-radius: 8px;

  @media (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
  }

  @media (max-width: 375px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
  }
`;

export const ReplayContainer = styled.section`
  display: flex;
  gap: 40px;
  width: 92%;
  @media (max-width: 600px) {
    gap: 6px;
    width: 96%;
  }
`;

export const FigureContainer = styled.figure`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FontContainer = styled.span`
  font-family: 'Rubik', sans-serif;
`;

export const AsideContainer = styled.aside`
  background-color: hsl(228, 33%, 97%);
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border-radius: 8px;
`;
