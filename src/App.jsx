import styled from "styled-components";
import { useState, useEffect } from "react";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelecteBtn] = useState("all");
  useEffect(() => {
    //performing network call
    const fetchFoodData = async () => {
      //before making n/w call
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch");
      }
    };
    fetchFoodData();
  }, []);

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelecteBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelecteBtn(type);
  };

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };
  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/Foody Zone.svg" alt="brand_logo" />
          </div>
          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food"
            />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      border-radius: 5px;
      color: white;
      height: 35px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }

  @media (0<width<600px) {
    flex-direction: column;
    height: 120px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  background: #ff4343;
  background: ${({ isSelected }) => (isSelected ? "#db2929" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  color: white;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f72727;
  }
`;
