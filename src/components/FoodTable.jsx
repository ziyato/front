import React, { useState, useEffect } from "react";

// 테이블 헤더 정의 (고정)
const headers = [
    { text: '사진', value: 'food_pic' },
    { text: '식품명', value: 'food_name' },
    { text: '카테고리', value: 'category' },
    { text: '유통기한', value: 'expiration_date' },
    { text: '수량', value: 'item_amount' }
];

// 남은 일수 계산하는 함수
const calculateDaysLeft = (expirationDate) => {
    const today = new Date(); 
    const expireDate = new Date(expirationDate);
    today.setUTCHours(0, 0, 0, 0); // 현재 날짜 시간을 00:00:00으로 설정
    expireDate.setUTCHours(0, 0, 0, 0); // 유통기한 날짜 시간 00:00:00으로 설정
    const remainingTime = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24)); // 남은 일수 계산
    return remainingTime; 
};

// FoodTable 컴포넌트 정의
function FoodTable({ headers, items, onDelete, userInfo, s}) {
    // userInfo로부터 알림기준일수 추출
    const {알림기준일수} = userInfo;

    const [selection, setSelection] = useState([]); // 선택된 항목들 관리하는 state
    const headerKey = headers.map(header => header.value); // 헤더의 value 값 배열로 변환
    
    // 정렬 관련 상태인데 어려워서 아직 구현 못 했음 다시 짜야 함..
    // const [isAscending, setIsAscending] = useState(true); // 오름차순 여부
    const [sortDirections, setSortDirections] = useState({}); 

    // 정렬 방향 초기화
    useEffect(() => {
        const initialSortDirections = {};
        headers.forEach(header => {
            initialSortDirections[header.value] = true; // 초기 정렬 방향을 오름차순으로 설정
        });
        setSortDirections(initialSortDirections);
    }, [headers]);

    // 정렬 방향 변경 함수
    const toggleSortDirection = (column) => {
        setSortDirections(prevState => ({
            ...prevState,
            [column]: !prevState[column]
        }));
    };

    // 헤더 렌더링 함수 (정렬 기능 추가해야 함)
    const renderHeaderWithSort = () => {
        return headers.map((header) => (
            <th key={header.text}>
                {header.text}
                {/* 정렬 버튼 추가 */}
                {header.text === '식품명' || header.text === '카테고리' || header.text === '유통기한' ? (
                    <button style={{paddingLeft:'10px'}}
                            onClick={() => toggleSortDirection(header.value)}>
                        {sortDirections[header.value] ? '▲' : '▼'}
                    </button>
                ) : null}
            </th>
        ));
    };

    // 삭제 버튼 클릭 시 호출되는 함수
    const handleDelete = () => {
        const selectedItems = items.filter(item => selection.includes(item.food_id)); // 선택된 항목만 필터링하여 배열 생성
        onDelete(selectedItems); // 선택된 항목 삭제
        setSelection([]); // 선택 상태 초기화

        // 체크박스 선택 해제
        const checkboxes = document.querySelectorAll('.foodTable tbody input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    };

    // FoodTable에 handleDelete 함수 연결
    FoodTable.handleDelete = handleDelete;
    
    // 체크박스 선택 상태 변경 함수
    const onChangeSelect = (food_id) => {
        let newSelection;
        if (selection.includes(food_id)) {
            newSelection = selection.filter(selected_id => selected_id !== food_id); // 이미 선택된 항목이면 선택 해제
        } else {
            newSelection = [...selection, food_id]; // 선택되지 않은 항목이면 선택 추가
        }
        setSelection(newSelection); // 선택 상태 업데이트
    };

    // 전체 선택 체크박스 상태 변경 함수
    const onChangeSelectAll = (e) => {
        if (e.target.checked) {
            const allCheckedSelection = items.map(item => item.food_id); // 모든 아이템의 food_id 배열 추출
            setSelection(allCheckedSelection); // 전체 선택 상태
        } else {
            setSelection([]); // 선택 해제 상태
        }
    };

    // 전체 선택 여부 확인 함수
    const isSelectedAll = () => {
        return items.length > 0 && selection.length === items.length;
    }

    // 선택된 항목 확인 (지워도 됨)
    useEffect(() => {
        console.log(selection);
    }, [selection]);

    return (
        <div className="tableContainer">
            <table className="foodTable">
                <thead className="tableHeader">
                    <tr>
                        {/* 전체 선택 체크박스 */}
                        <th>
                            <input 
                              type="checkbox"
                              checked={isSelectedAll()}
                              onChange={onChangeSelectAll}
                            />
                        </th>
                        {/* 테이블 헤더 출력 */}
                        {renderHeaderWithSort()}
                    </tr>
                </thead>
                <tbody>
                    {/* 아이템 없는 경우 화면에 없다고 표시 */}
                    {items.length === 0 ? (
                        <tr className="noItemsRow" style={{height: '80px'}}>
                            <td colSpan={headers.length + 1}>등록된 식품이 없습니다.</td>
                        </tr>
                    ) : (
                        // 아이템 있는 경우 각 아이템 테이블에 출력
                        items.map((item, index) => (
                        <tr
                            key={index}
                            className={selection.includes(item.food_id) ? 'select_row' : ''}     
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selection.includes(item.food_id)}
                                    onChange={() => onChangeSelect(item.food_id)}
                                />
                            </td>
                            {headerKey.map((key, idx) => (
                                <td key={idx}
                                    style= {{
                                        // 알림 기준 일수보다 남은 일수가 적으면 배경색 변경 
                                        backgroundColor: key === 'expiration_date' ?
                                        (calculateDaysLeft(item.expiration_date) <= 알림기준일수 ? '#FFCDCD' : 'transparent') : 'transparent'
                                    }}
                                >
                                    {key === 'food_pic' ? (
                                        // 식품 이미지 출력
                                        item[key] ? (
                                            <img
                                                src={item[key]}
                                                alt =""
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                        ) : (
                                            // 식품 이미지 없는 경우 No Images 출력
                                            <div 
                                                style ={{ width: '100%', height: '100px', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>
                                                No Images
                                            </div>
                                        )     
                                    ) : (
                                        key === 'expiration_date' ? (
                                            // 유통기한 관련 정보 출력
                                            <>
                                                <span className="expirationDateText">
                                                    {item[key].split('T')[0]} {/* 날짜만 표시 */} 
                                                    <br />
                                                </span>
                                                {calculateDaysLeft(item.expiration_date) < 0 && (
                                                    // 유통기한 지난 경우
                                                    <span style={{ color: 'red' }}>
                                                        (유통기한 지남, D+{Math.abs(calculateDaysLeft(item.expiration_date))})
                                                    </span>
                                                )}
                                                {calculateDaysLeft(item.expiration_date) >= 0 && (
                                                    <>
                                                        {calculateDaysLeft(item.expiration_date) <= 알림기준일수 && (
                                                            // 유통기한 안 지났지만 알림 기준 일수보다 남은 일수가 적은 경우
                                                            <span style={{ color: 'red'}}> (D-{calculateDaysLeft(item.expiration_date)})</span>
                                                        )}
                                                        {calculateDaysLeft(item.expiration_date) > 알림기준일수 && (
                                                            <span> (D-{calculateDaysLeft(item.expiration_date)})</span>                               
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            item[key]
                                        )
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export { headers, FoodTable };