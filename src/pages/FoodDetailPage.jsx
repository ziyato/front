import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calculateDaysLeft } from "../components/FoodTable.jsx";
import "./FoodDetailPage.css";
import pic5 from "../assets/탕후루.jpg";

const FoodDetailPage = () => {
    const { food_id } = useParams(); 
    const navigate = useNavigate();
    const [foodDetail, setFoodDetail] = useState(// 식품 데이터 예시
    {
      food_id: 6,
      food_name: "탕후루",
      food_pic: pic5,
      category: "간식",
      item_amount: 4,
      purchase_date: "2024-05-16T15:00:00.000Z",
      expiration_date: "2024-05-25T15:00:00.000Z",
      user_id: 4,
    });

    

    const daysLeft = calculateDaysLeft(foodDetail.expiration_date);
    const alert_date = 5; // 유저 별로 갖고 있는 알림 기준 일수

    return (
        <>
        <div className="foodDetailPage">
            <div className="undoSection">
                <button className="undoButton" onClick={() => navigate(-1)}/>
            </div>
            <div className="foodDetail">
                <div className="detailImage">
                    {foodDetail.food_pic? (
                            <img src={foodDetail.food_pic} alt={foodDetail.food_name}/>
                        ) : (
                            <span>No Images</span>
                        )}
                </div>
                <div className="detailText">
                        <span className="foodName">{foodDetail.food_name}</span>
                        <span className="category">◦ 카테고리 : {foodDetail.category}</span>
                        <span className="itemAmount">◦ 수량 : {foodDetail.item_amount}</span>
                        <span className="purchase_date">◦ 구입 날짜 : {foodDetail.purchase_date.split("T")[0]}</span>
                        <span className="expiration_date">◦ 유통 기한 : {foodDetail.expiration_date.split("T")[0]}
                        {daysLeft < 0 && (
                            <span style ={{color: "red"}}>
                                (유통기한 지남, D+{Math.abs(daysLeft)})
                            </span>
                        )}
                        {daysLeft >= 0 && (
                            <>
                                {daysLeft <= alert_date ? (
                                    <span style={{color: "red"}}>(D-{daysLeft})</span>
                                ) : (
                                    <span> (D-{daysLeft})</span>
                                )}    
                            </>
                        )}
                        </span> 
                </div>
            </div>
        </div>
        </>        
    );
};

export default FoodDetailPage;