import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { headers, FoodTable } from "../components/FoodTable.jsx";

import pic1 from "../assets/햇반.jpg";
import pic2 from "../assets/카레.jpg";
import pic3 from "../assets/된찌.jpg";
import pic4 from "../assets/마라탕.jpg";
import pic5 from "../assets/탕후루.jpg";
import ToastModal from "../components/ToastModal/ToastModal";
import { getFoodDataAll, getSearchFood } from "../apis/getFoodAPI.js";
import { useNavigate } from "react-router-dom";

// 식품 데이터 예시
export const data = [
  {
    food_id: 1,
    food_name: "햇반",
    food_pic: pic1,
    category: "밥",
    item_amount: 1,
    purchase_date: "2024-02-19T15:00:00.000Z",
    expiration_date: "2024-12-11T15:00:00.000Z",
    user_id: 4,
  },
  {
    food_id: 2,
    food_name: "카레이름",
    food_pic: pic2,
    category: "카테카테",
    item_amount: 2,
    purchase_date: "2024-04-09T15:00:00.000Z",
    expiration_date: "2024-05-17T15:00:00.000Z",
    user_id: 4,
  },
  {
    food_id: 3,
    food_name: "육회비빔밥",
    food_pic: "",
    category: "밥",
    item_amount: 1,
    purchase_date: "2024-05-17T15:00:00.000Z",
    expiration_date: "2024-05-22T15:00:00.000Z",
    user_id: 4,
  },
  {
    food_id: 4,
    food_name: "된장찌개",
    food_pic: pic3,
    category: "국",
    item_amount: 1,
    purchase_date: "2024-05-19T15:00:00.000Z",
    expiration_date: "2024-06-07T15:00:00.000Z",
    user_id: 4,
  },
  {
    food_id: 5,
    food_name: "마라탕",
    food_pic: pic4,
    category: "탕",
    item_amount: 1,
    purchase_date: "2024-05-15T15:00:00.000Z",
    expiration_date: "2024-06-01T15:00:00.000Z",
    user_id: 4,
  },
  {
    food_id: 6,
    food_name: "탕후루",
    food_pic: pic5,
    category: "간식",
    item_amount: 4,
    purchase_date: "2024-05-16T15:00:00.000Z",
    expiration_date: "2024-05-25T15:00:00.000Z",
    user_id: 4,
  },
];


const HomePage = ({ user, setRecipeFood }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [items, setItems] = useState([]); // 초기 아이템(식품) 상태를 빈 배열로 설정
  const [searchCategory, setSearchCategory] = useState("food_name"); // 검색 기준 초기값 식품명으로 설정
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태를 빈 문자열로 설정
  const [selectedFoodNames, setSelectedFoodNames] = useState([]);

  const [sortCriteria, setSortCriteria] = useState("expiration_date"); // 정렬 기준 초기값 유통기한으로 설정
  const [sortDirection, setSortDirection] = useState(true); // 정렬 방향 초기값 오름차순으로 설

  const [isModalOpen, setModalOpen] = useState(false);
  const changeModal = () => setModalOpen(!isModalOpen);

  // 검색 키워드 변경 시 호출되는 함수
  const handleSearchKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleRecipeSearch = () => {
    setRecipeFood(selectedFoodNames); // 선택된 음식 이름을 설정
    navigate("/recipe"); // /recipe 페이지로 이동
  };

  //첫 실행 시 DB에서 데이터 받아오기
  const fetchData = async () => {
    try {
      const foodData = await getDataFromDB(user.user_id); // 식품 데이터 받아오기
      const sortedData = sortItems(foodData, sortCriteria, sortDirection); // 초기 식품 데이터 정렬 (유통기한 기준, 오름차순)
      setItems(sortedData); // 아이템 상태 업데이트
    } catch (error) {
      console.error(error);
    }
  };

  // DB에서 검색한 데이터를 가져오기
  async function searchData(user_id, searchCategory, searchKeyword) {
    console.log(searchKeyword);
    console.log(searchKeyword.trim());
    try {
      const result = await getSearchFood(
        user_id,
        searchCategory,
        searchKeyword.trim()
      );
      setItems(result);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  // DB에서 유저의 전체 음식 데이터를 가져오는 비동기 함수
  async function getDataFromDB(user_id) {
    if (user !== null) {
      try {
        const result = await getFoodDataAll(user_id);
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
      }
    }
  }

  // 정렬 기준, 방향에 맞게 정렬하는 함수
  const sortItems = (items, criteria, direction) => {
    return items.sort((a, b) => {
      if (criteria === "expiration_date") {
        return direction
          ? new Date(a[criteria]) - new Date(b[criteria])
          : new Date(b[criteria]) - new Date(a[criteria]); // 정렬 기준이 유통기한이면 날짜 비교
      } else {
        return direction
          ? a[criteria].localeCompare(b[criteria])
          : b[criteria].localeCompare(a[criteria]); // 정렬 기준이 식품명 or 카테고리면 문자열 비교
      }
    });
  };

  // 아이템 삭제, 삭제 후 아이템 상태 업데이트 기능 함수
  const handleDelete = (selectedItems) => {
    const selectedItemIds = selectedItems.map((item) => item.food_id); // 선택된 항목의 food_id 배열 생성
    // 선택된 항목 제외한 나머지 항목 필터링
    setItems(items.filter((item) => !selectedItemIds.includes(item.food_id))); // 상태 업데이트
  };

  const addItem = (newItem) => {
    // 현재 식품 목록 중 가장 최근에 등록된 식품의 food_id 찾기
    const latestFoodId =
      items.length > 0 ? Math.max(...items.map((item) => item.food_id)) : 0;
    // 새로 등록될 식품의 food_id
    newItem.food_id = latestFoodId + 1;
    // 새로운 아이템 추가한 아이템 배열
    let updatedItems = [...items, newItem];
    // 정렬 기준 기본값에 따라 다시 정렬한 아이템 배열
    updatedItems = sortItems(updatedItems, sortCriteria, sortDirection);
    setItems(updatedItems);
  };

  // HomePage 컴포넌트 처음 렌더링되고 화면에 표시될 때 데이터 로드
  useEffect(() => {
    fetchData();
  }, []); // user_id 변경 시에만 데이터 다시 로드?

  return (
    <div className="HomePage">
      <button className="bg-amber-500" onClick={() => setItems(data)}>
        임시 음식 추가
      </button>
      <button onClick={() => console.log(selectedFoodNames)}>asdf</button>
      <div className="searchSection">
        {/* 검색 기준 선택할 수 있는 드롭다운 */}
        <select
          className="dropdown"
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="food_name">식품명</option>
          <option value="category">카테고리</option>
        </select>
        <input
          type="text"
          className="searchBar"
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          //   onKeyPress={(e) => e.key === "Enter" && searchData(searchCategory, searchKeyword)}
        />
        <button
          type="button"
          className="searchButton"
          onClick={() => {
            searchData(user.user_id, searchCategory, searchKeyword);
          }}
        />
      </div>
      <div className="tableInfo">
        <span> 👤 {user.username} 님의 냉장고 </span>
        <div>
          <button
            type="button"
            className="recipeSearch"
            onClick={() => {
              handleRecipeSearch();
            }}
          >
            레시피 검색
          </button>
          <button
            type="button"
            className="deleteFood"
            onClick={() => FoodTable.handleDelete()}
          >
            삭제
          </button>
        </div>
      </div>
      <div className="foodTableComponent">
        <div className="scrollableBox">
          <FoodTable
            headers={headers}
            items={items}
            setItems={setItems}
            onDelete={handleDelete}
            user={user}
            sortItems={sortItems}
            sortCriteria={sortCriteria}
            sortDirection={sortDirection}
            setSortCriteria={setSortCriteria}
            setSortDirection={setSortDirection}
            setSelectedFoodNames={setSelectedFoodNames}
          />
        </div>
      </div>
      <div className="addFood">
        <button onClick={changeModal}>+</button>
        <ToastModal
          isOpen={isModalOpen}
          onClose={changeModal}
          addItem={addItem}
          user_id={user.user_id}
        />
      </div>
    </div>
  );
};
export default HomePage;