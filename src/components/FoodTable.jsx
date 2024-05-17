import React, { useState } from "react";

// 테이블 헤더 정의 (고정)
const headers = [
    { text: '사진', value: 'foodPic' },
    { text: '식품명', value: 'foodName' },
    { text: '카테고리', value: 'category' },
    { text: '유통기한', value: 'expirationDate' },
    { text: '수량', value: 'itemAmount' }
];

// 남은 일수 계산하는 함수
const calculateDaysLeft = (expirationDate) => {
    const today = new Date().setHours(0, 0, 0, 0); // 현재 날짜 (시간을 0시 0분 0초로 설정)
    const expireDate = new Date(expirationDate).setHours(0, 0, 0, 0); // 유통기한 날짜 (시간을 0시 0분 0초로 설정)
    const remainingTime = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24)); // 유통기한까지 남은 일수
    return remainingTime; 
}

// FoodTable 컴포넌트 정의
function FoodTable({ headers, items, onDelete, userInfo }) {
    const {알림기준일수} = userInfo;
    const [selection, setSelection] = useState(new Set()); // 선택된 항목 관리하는 state
    const headerKey = headers.map(header => header.value); // 헤더의 value 값 배열로 변환

    // 삭제 버튼 클릭 시 호출되는 함수
    const handleDelete = () => {
        const selectedItems = Array.from(selection); // 선택된 항목 배열로 변환
        onDelete(selectedItems); // 선택된 항목 삭제 처리
        setSelection(new Set()); // 선택 상태 초기화

        // 체크박스 선택 해제
        const checkboxes = document.querySelectorAll('.foodTable tbody input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    };

    // FoodTable에 handleDelete 함수 연결
    FoodTable.handleDelete = handleDelete;
    
    // 체크박스 선택 상태 변경 함수
    const onChangeSelect = (value) => {
        const newSelection = new Set(selection);
        if (newSelection.has(value)) {
            newSelection.delete(value); // 이미 선택된 항목이면 선택 해제
        } else {
            newSelection.add(value); // 선택되지 않은 항목이면 선택 추가
        }
        setSelection(newSelection); // 선택 상태 업데이트
    };

    // 전체 선택 체크박스 상태 변경 함수
    const onChangeSelectAll = (e) => {
        if (e.target.checked) {
            // checked가 true인 경우 전체 선택
            const allCheckedSelection = new Set(
                items.map((item) => item.foodName)
            );
            setSelection(allCheckedSelection);
        } else {
            setSelection(new Set()); // 전체 선택 해제
        }
    };

    // 전체 선택 여부 확인 함수
    const isSelectedAll = () => {
        return items.length > 0 && selection.size === items.length;
    }

    return (
        <div className="tableContainer">
            <table className="foodTable">
                <thead className="tableHeader">
                    <tr>
                        <th>
                            <input 
                              type="checkbox"
                              checked={isSelectedAll()}
                              onChange={onChangeSelectAll}
                            />
                        </th> {/* 전체 선택 체크박스 헤더에 추가 */}
                        {headers.map((header) =>
                            <th key={header.text}>{header.text}</th> // 테이블 헤더 출력
                        )}
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
                            className={selection.has(item.foodName) ? 'select_row' : ''}     
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    disabled={item.disabled}
                                    checked={selection.has(item.foodName)}
                                    onChange={() => onChangeSelect(item.foodName)}
                                />
                            </td>
                            {headerKey.map((key, idx) => (
                                <td key={idx}
                                    style= {{
                                        // 알림 기준 일수보다 남은 일수가 적으면 배경색 변경 
                                        backgroundColor: key === 'expirationDate' ?
                                        (calculateDaysLeft(item.expirationDate) <= 알림기준일수 ? '#FFCDCD' : 'transparent') : 'transparent'
                                    }}
                                > 
                                    {key === 'foodPic' ? (
                                        // 식품 이미지 출력
                                        item[key] ? (
                                            <img
                                                src={item[key]}
                                                alt =""
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                        ) : (
                                            // 식품 이미지 등록 안 된 경우 없다고 출력
                                            <div 
                                                style ={{ width: '100%', height: '100px', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>
                                                No Images
                                            </div>
                                        )     
                                    ) : (
                                        key === 'expirationDate' ? (
                                            // 유통기한 관련 정보 출력
                                            <>
                                                <span className="expirationDateText">
                                                    {item[key]} 
                                                    <br />
                                                </span>
                                                {calculateDaysLeft(item.expirationDate) < 0 && (
                                                    // 유통기한 지난 경우
                                                    <span style={{ color: 'red' }}>
                                                        (유통기한 지남, D+{Math.abs(calculateDaysLeft(item.expirationDate))})
                                                    </span>
                                                )}
                                                {calculateDaysLeft(item.expirationDate) >= 0 && (
                                                    <>
                                                        {calculateDaysLeft(item.expirationDate) <= 알림기준일수 && (
                                                            // 유통기한 안 지났지만 알림 기준 일수보다 남은 일수가 적은 경우
                                                            <span style={{ color: 'red'}}> (D-{calculateDaysLeft(item.expirationDate)})</span>
                                                        )}
                                                        {calculateDaysLeft(item.expirationDate) > 알림기준일수 && (
                                                            <span> (D-{calculateDaysLeft(item.expirationDate)})</span>                               
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