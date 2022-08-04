import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 60px;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 5px;
`
const Text = styled.h1`
    font-size: 20px;
`
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid black;
    padding: 10px;
`
const Input = styled.input`
    border: none;
    outline: none;
    border-bottom: 1px solid black;
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-size: 30px;
    font-weight: 700;
`

const Right = styled.div`
    flex: 1;
    text-align: center;
`

const Header = () => {
  return (
    <Container>
        <Wrapper>
            <Left>
                <Text>Search</Text>
                <SearchContainer>
                    <Input></Input>
                    <i className="fa fa-solid fa-magnifying-glass"></i>
                </SearchContainer>
            </Left>
            <Center>
                <Logo>Rishav.</Logo>
            </Center>
            <Right>Right</Right>
        </Wrapper>
    </Container>
  )
}

export default Header