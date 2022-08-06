import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const InputContainer = styled.div`
  border: 1px solid black;
  padding: 10px 17px;
  display: flex;
  gap: 10px;
`;
const Input = styled.input`
  width: 320px;
  border: none;
  outline: none;
  border-bottom: 1px solid black;
`;
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  font-weight: bolder;
  border-radius: 5px;
  transition: 0.4s all;
  &:hover {
    transform: scale(1.1);
  }
`;
const EmpContainer = styled.div``;
const Wrapper = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
`;

const UserContainer = styled.div`
  display: flex;
  width: 520px;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Usertext = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
`;
const Icon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContainer = styled.div`
  background-color: ${(props) => props.bg};
  color: ${(props) => props.mainColor};
`;

const ModalText = styled.h1`
  font-size: 30px;
`;

const SearchContainer = styled.div`
  margin: 20px 0px;
`;
const SearchWrapper = styled.div`
  width: 100%;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchInput = styled.input`
  width: 60%;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

const filterFunction = (users, query) => {
  if (!query) {
    return users;
  }
  return users.filter((user) => {
    return user.name.toLowerCase().includes(query.toLowerCase());
  });
};
const Productpage = () => {
  const { dispatch, users } = useContext(AppContext);
  const [editId, setEditId] = useState(0);
  const [query, setQuery] = useState("");
  const [emp, setEmp] = useState({
    name: "",
  });
  const [modalhandler, setModalHandler] = useState({
    message: "",
    bg: "",
    active: false,
    mainColor: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3004/employees");
      const json = await response.data;
      dispatch({ type: "FETCH_DATA", payload: json });
    };
    fetchData();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (emp.name != " ") {
      if (editId) {
        const response = await axios.put(
          "http://localhost:3004/employees/" + editId,
          emp
        );
        const data = await response.data;
        dispatch({ type: "EDIT_EMP", payload: data });
        handleModal("Data Edited", "green", true, "black");
        setEditId(0);
      } else {
        const response = await axios.post(
          "http://localhost:3004/employees",
          emp
        );
        const data = await response.data;
        dispatch({ type: "ADD_EMP", payload: data });
        handleModal("Data Added", "green", true, "black");
        setEditId(0);
      }
    } else {
      handleModal("Empty Input", "red", true, "black");
    }

    setEmp({ ...emp, name: " " });
  };
  const deleteUser = async (id) => {
    await axios.delete("http://localhost:3004/employees/" + id);
    handleModal("Data Deleted", "red", true, "black");
    dispatch({ type: "DELETE_EMP", payload: id });
  };

  const editUser = (id) => {
    setEditId(id);
    setEmp({
      ...emp,
      name: users.find((user) => {
        return user.id === id;
      }).name,
    });
  };
  const filteredResults = filterFunction(users, query);
  useEffect(() => {
    const timer = setTimeout(() => {
      handleModal("", "", false, "");
    }, 3000);
    return () => clearTimeout(timer);
  }, [users]);

  const handleModal = (
    message = "",
    bg = "",
    active = false,
    mainColor = ""
  ) => {
    setModalHandler({
      ...modalhandler,
      message: message,
      bg: bg,
      active: active,
      mainColor: mainColor,
    });
  };

  return (
    <Container>
      <ModalContainer modalhandler={modalhandler}>
        {modalhandler.active && <ModalText>{modalhandler.message}</ModalText>}
      </ModalContainer>
      <form onSubmit={submitForm}>
        <InputContainer>
          <Input
            value={emp.name}
            onChange={(e) => setEmp({ ...emp, name: e.target.value })}
            type="text"
          />
          <Button type="submit">
            {editId > 0 ? "Edit Employee" : "Add Employee"}
          </Button>
        </InputContainer>
      </form>
      {users.length > 0 && (
        <EmpContainer>
          <SearchContainer>
            <SearchWrapper>
              <SearchInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <i className="fa fa-solid fa-magnifying-glass"></i>
            </SearchWrapper>
          </SearchContainer>
          {filteredResults.length>0 ?<Wrapper>
            {filteredResults?.map((user) => {
              return (
                <UserContainer key={user.id}>
                  <Usertext>{user.name}</Usertext>
                  <ButtonContainer style={{ display: "flex", gap: "10px" }}>
                    <Icon onClick={() => deleteUser(user.id)}>
                      <i className="fa fa-solid fa-trash"></i>
                    </Icon>
                    <Icon>
                      <i
                        onClick={() => editUser(user.id)}
                        className="fa fa-solid fa-pen-to-square"
                      ></i>
                    </Icon>
                  </ButtonContainer>
                </UserContainer>
              );
            })}
          </Wrapper>:<h2>Search result not found!!!</h2>}
        </EmpContainer>
      )}
    </Container>
  );
};

export default Productpage;
