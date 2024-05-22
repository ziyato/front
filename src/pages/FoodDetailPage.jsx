import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calculateDaysLeft } from "../components/FoodTable.jsx";
import "./FoodDetailPage.css";
import pic5 from "../assets/탕후루.jpg";

// FoodDetailPage.jsx 수정해야 할 부분
// 각 식품마다 상세 페이지.. 데이터 연결하는 부분

const FoodDetailPage = () => {
    const { food_id } = useParams(); 
    const navigate = useNavigate();

    // 초기 식품 데이터 예시로 설정
    const [foodDetail, setFoodDetail] = useState({
      food_id: 6,
      food_name: "탕후루",
      food_pic: pic5,
      category: "간식",
      item_amount: 4,
      purchase_date: "2024-05-16T15:00:00.000Z",
      expiration_date: "2024-05-25T15:00:00.000Z",
      user_id: 4,
    });

    // 수정 가능한 값(수량, 구매 날짜, 유통 기한)을 위한 상태
    const [editableDetail, setEditableDetail] = useState({
        item_amount: foodDetail.item_amount,
        purchase_date: foodDetail.purchase_date,
        expiration_date: foodDetail.expiration_date,
      });

    const daysLeft = calculateDaysLeft(foodDetail.expiration_date);
    const alert_date = 5;
    const [memo, setMemo] = useState("");

    // 페이지 로드 시 로컬 스토리지? 에서 메모 불러오기 ?.. 
    useEffect(() => {
        const savedMemo = localStorage.getItem(`memo_${food_id}`);
        if (savedMemo) {
            setMemo(savedMemo);
        }
    }, [food_id]);

    // 메모 입력값 업데이트하는 함수
    const handleMemoChange = (e) => {
        const lines = e.target.value.split("\n");
        if (lines.length <= 6 && lines.every(line => line.length <= 100)) {
            setMemo(e.target.value);
        }
    };

    // 메모 저장하는 함수
    const handleMemoSave = () => {
        localStorage.setItem(`memo_${food_id}`, memo);
        console.log("Memo saved:", memo);
    };
    
    // 수정된 값을 저장하는 함수
    const handleSave = () => {
        console.log("수정 전 데이터 :", foodDetail);
        setFoodDetail({
            ...foodDetail,
            item_amount: parseInt(editableDetail.item_amount, 10), 
            purchase_date: editableDetail.purchase_date,
            expiration_date: editableDetail.expiration_date,
        });
        // 여기서 수정된 값으로 데이터를 업데이트 해야 함
        console.log("수정 후 저장된 데이터 :", {
            ...foodDetail, 
            item_amount: parseInt(editableDetail.item_amount, 10),
            purchase_date: editableDetail.purchase_date,
            expiration_date: editableDetail.expiration_date,
        });
    };

    // 수정된 값들을 업데이트하는 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableDetail((prevDetail) => ({
            ...prevDetail,
            [name]: name === "purchase_date" || name === "expiration_date" ? value + "T00:00:00.000Z" : value,
        }));
    };

    return (
        <>
        <div className="foodDetailPage">
            <div className="undoSection">
                <button className="undoButton" onClick={() => navigate(-1)}/>
            </div>
            <div className="foodDetail">
                <div className="detailImage">
                    {foodDetail.food_pic ? (
                        <img src={foodDetail.food_pic} alt={foodDetail.food_name} />
                    ) : (
                        <span>No Images</span>
                    )}
                </div>
                <div className="detailText">
                    <span className="detailTitle">ℹ️&nbsp;{foodDetail.food_name}</span>
                    <div>
                        <span>◦ 식품명 :&nbsp;&nbsp;</span>
                        <span className="foodName">{foodDetail.food_name}</span>
                    </div>
                    <div>
                        <span>◦ 카테고리 :&nbsp;&nbsp;</span>
                        <span className="category">{foodDetail.category}</span>
                    </div>
                    <div>
                        <span>◦ 수량 :&nbsp;&nbsp;</span>
                            <input
                                className="editableInput"
                                type="number"
                                name="item_amount"
                                min="1"
                                value={editableDetail.item_amount}
                                onChange={handleInputChange}
                                required
                            />
                    </div>
                    <div>
                        <span>◦ 구입 날짜 :&nbsp;&nbsp;</span> 
                            <input
                                className="editableInput"
                                type="date"
                                name="purchase_date"
                                value={editableDetail.purchase_date.split("T")[0]}
                                onChange={handleInputChange}
                                required
                            />
                    </div>
                    <div className="expirationDateWrapper">
                        <span>◦ 유통 기한 :&nbsp;&nbsp;</span>
                        <input
                            className="editableInput"
                            type="date"
                            name="expiration_date"
                            value={editableDetail.expiration_date.split("T")[0]}
                            onChange={handleInputChange}
                            required
                        />
                        <span className="remainingTime"> 
                            {daysLeft < 0 && (
                                <span style={{ color: "red" }}>
                                    (유통기한 지남, D+{Math.abs(daysLeft)})
                                </span>
                            )}
                            {daysLeft >= 0 && (
                                <>
                                    {daysLeft <= alert_date ? (
                                        <span style={{ color: "red" }}>(D-{daysLeft})</span>
                                    ) : (
                                        <span>(D-{daysLeft})</span>
                                    )}
                                </>
                            )}
                        </span>
                    </div>
                    <div className="saveSection">
                        <button className="saveButton" onClick={handleSave}>수정</button>
                    </div>
                </div>
            </div>
            <div className="memoSection">
                <span> ◦ 메모 </span>
                <div className="memoTextWrapper">
                    <textarea
                        className="memoText"
                        rows="6"
                        value={memo}
                        onChange={handleMemoChange}
                    ></textarea>
                </div>
                <div className="memoSave">
                <button className="memoSaveButton" onClick={handleMemoSave}>작성</button>
                </div>
            </div>
            <div className="tipSection">
                <span>◦ Tip</span>
                <div className="chatGPTSection">
                    <span>여기에다가 ChatGPT 연결</span>
                </div>
            </div>
        </div>
        </>
    );
};

export default FoodDetailPage;