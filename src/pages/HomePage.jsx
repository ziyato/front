import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { headers, FoodTable } from '../components/FoodTable.jsx';
import pic1 from "../assets/햇반.jpg"; 
import pic2 from "../assets/카레.jpg";

// 유저 정보
const userInfo = {
    user_name: "민지",
    user_id: 4,
    알림기준일수: 3
  };

const HomePage = () => {
    const [items, setItems] = useState([]); // 초기 아이템(식품) 상태를 빈 배열로 설정
    const [filteredItems, setFilteredItems] = useState([]); // 검색된 아이템(식품) 상태를 빈 배열로 설정
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태를 빈 문자열로 설정
    const [searchCriteria, setSearchCriteria] = useState('food_name'); // 검색 기준 초기값 식품명으로 설정


    // DB에서 데이터를 가져오는 비동기 함수
    const getDataFromDB = async (user_id) => {

        // 실제 DB 호출 로직을 여기에 추가하기

        // 예시 데이터 객체 
        const data = [
            {
                food_id: 1,
                food_name: "햇반",
                food_pic: pic1,
                category: "밥",
                item_amount: 1,
                purchase_date: "2024-02-19T15:00:00.000Z",
                expiration_date: "2024-12-11T15:00:00.000Z",
                user_id: 4
            },
            {
                food_id: 5,
                food_name: "카레이름",
                food_pic: pic2,
                category: "카테카테",
                item_amount: 2,
                purchase_date: "2024-04-09T15:00:00.000Z",
                expiration_date: "2024-05-17T15:00:00.000Z",
                user_id: 4
            },
            {
                food_id: 3,
                food_name: "육회비빔밥",
                food_pic: "",
                category: "밥",
                item_amount: 1,
                purchase_date: "2024-04-17T15:00:00.000Z",
                expiration_date: "2024-05-16T15:00:00.000Z",
                user_id: 4
            }
        ];

        return data.filter(item => item.user_id === user_id); // user_id에 해당하는 데이터 반환, 없으면 빈 배열 반환
    };

    // 컴포넌트가 마운트될 때 데이터 로드
    useEffect(() => {
        // 비동기 데이터 가져오기 함수
        const fetchData = async () => {
            const data = await getDataFromDB(userInfo.user_id); // 비동기 함수 호출하여 데이터 가져오기
            setItems(data); // 상태 업데이트
            setFilteredItems(data); // 초기 필터링된 항목 설정 (검색할 때 필터링 됨)
        };

        fetchData(); // 데이터 가져오는 함수 호출
    }, []);

    // 아이템 삭제, 삭제 후 아이템 상태 업데이트 기능 함수
    const handleDelete = (selectedItems) => {
        // 선택된 항목 제외한 나머지 항목 필터링
        const newItems = items.filter(item => !selectedItems.includes(item.food_name));
        setItems(newItems); // 상태 업데이트
        setFilteredItems(newItems); // 필터링된 항목 업데이트
    };

    // 검색 키워드 변경 시 호출되는 함수
    const handleSearchKeywordChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    // 검색 버튼 클릭 또는 엔터 키 입력 시 호출되는 함수
    const handleSearch = () => {
      // 검색어 소문자로 변환하여 저장
      const keyword = searchKeyword.toLowerCase();
      // 검색 기준을 선택한 기준으로 설정
      const criteria = searchCriteria;
      // 아이템 필터링 후 검색어와 일치하는 항목 찾기
      const filtered = items.filter(item => {
          if (item[criteria]) {
              return item[criteria].toLowerCase().includes(keyword);
          }
          return false;
      });
      // 검색된 결과 상태에 반영
      setFilteredItems(filtered);
    };

    return (
        <div className="HomePage">
            <div className='searchSection'>
                {/* 검색 기준 선택할 수 있는 드롭다운 */}
                <select 
                    className='dropdown'
                    onChange={(e) => setSearchCriteria(e.target.value)}
                >
                    <option value='food_name'>식품명</option>
                    <option value='category'>카테고리</option>
                </select>
                <input 
                    type='text' 
                    className='searchBar' 
                    value={searchKeyword}
                    onChange={handleSearchKeywordChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                    type='button' 
                    className='searchButton' 
                    onClick={handleSearch}
                >
                </button>
            </div>
            <div className='tableInfo'>
                <span> {userInfo.user_name} 님의 냉장고 </span> {/* DB의 username 이랑 연결해야 함 */}
                <div>
                    <button type='button' className='recipeSearch'>레시피 검색</button>
                    <button type='button' className='deleteFood' onClick={() => FoodTable.handleDelete()}>
                      삭제
                    </button>
                </div>
            </div>
            <FoodTable
                headers={headers}
                items={filteredItems}
                setItems={setItems}
                onDelete={handleDelete}
                userInfo={userInfo}
            />
        </div>
    );
};

export default HomePage;