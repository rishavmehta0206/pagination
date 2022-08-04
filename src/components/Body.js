import { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import api from "../api/posts";
import Singledata from "./Singledata";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  margin: 10px 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1``;

const Button = styled.div`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: black;
  font-weight: bold;
  cursor: pointer;
`
const Modal = styled.div`
  width: 100%;
  height: 20px;
  text-align: center;
  color: red;
`

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Search = styled.input``;

const DataContainer = styled.div``;

const SingleItem = styled.div`
  margin-top: 20px;
`;

const Body = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [trueValue,setTrueValue] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/employees");
      setData(response.data);
    };
    fetchData();
  }, []);
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const filterFunction = useCallback((data, search) => {
    if (!search) {
      return data;
    } else {
      return data?.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    }
  }, []);
  const filteredResults = useMemo(
    () => filterFunction(data, search),
    [search, filterFunction]
  );

    const returnArr = [1,2]
  return (
    <Container>
      <Singledata filterFunction={filterFunction}/>
      <Wrapper>
        <Button onClick={()=>setTrueValue(!trueValue)}>Change</Button>
        <Modal>{trueValue&&"Hola Amigos"}</Modal>
        <Title>Search</Title>
        <SearchContainer>
          <Search value={search} onChange={onSearchChange} />
          <DataContainer>
            {filteredResults?.map((item) => {
              return <SingleItem key={item.id}>{item.name}</SingleItem>;
            })}
          </DataContainer>
        </SearchContainer>
      </Wrapper>
    </Container>
  );
};

export default Body;
