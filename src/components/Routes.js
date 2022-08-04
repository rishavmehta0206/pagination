import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom"

const Container = styled.div`
  height: 70px;
`;
const Wrapper = styled.div`
  padding: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  background-color: black;
  color: white;
  gap: 20px;
  &>a{
    text-decoration: none;
    color: white;
  }
`;



const Routes = () => {
  return (
    <Container>
      <Wrapper>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/form">Form</NavLink>
      </Wrapper>
    </Container>
  );
};

export default Routes;
