import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 80vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  flex: 1;
  height: 100%;
  background-color: black;
`;
const Side = styled.div``;

const Item = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`
const Text = styled.h1`
    font-size: 15px;
    color: white;
`

const Content = styled.div`
  flex: 4;
`;

const Sidebar = () => {
  return (
    <Container>
      <Wrapper>
        <Side>
          <Item>
            <Text>Store</Text>
            <i style={{color:'white'}} className="fa fa-solid fa-tag"></i>
          </Item>
          <Item>
            <Text>Library</Text>
            <i style={{color:'white'}} className="fa fa-solid fa-book"></i>
          </Item>
          <Item>
            <Text>Events</Text>
            <i style={{color:"white"}} className="fa fa-solid fa-basketball"></i>
          </Item>
        </Side>
      </Wrapper>
      <Content>
        
      </Content>
    </Container>
  );
};

export default Sidebar;
