import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { calculateDaysLeft } from "../components/FoodTable.jsx";
import "./FoodDetailPage.css";
import CompleteModal from "../components/CompleteModal/CompleteModal.jsx";
import { data } from "./Homepage.jsx";
import { getFoodData, postFoodTips } from "../apis/getFoodAPI.js";

const FoodDetailPage = ({ propsUserData }) => {
  const navigate = useNavigate();
  const { food_id } = useParams();
  const [foodDetail, setFoodDetail] = useState({}); //음식 데이터
  const [foodTip, setFoodTip] = useState(); //음식 데이터
  // 수정 가능한 값(수량, 구매 날짜, 유통 기한)을 위한 상태
  const [editableDetail, setEditableDetail] = useState({
    item_amount: "",
    purchase_date: "",
    expiration_date: "",
  });

  const [memo, setMemo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!propsUserData) {
      navigate("/login");
    }
    getFoodData(propsUserData.user_id, food_id).then((response) => {
      console.log(
        `${propsUserData.username}님의 ${food_id}번 음식 : `,
        response[0]
      );
      setFoodDetail(response[0]);
      setEditableDetail({
        item_amount: response[0].item_amount,
        purchase_date: response[0].purchase_date,
        expiration_date: response[0].expiration_date,
      });
    });

    // 페이지 로드 시 로컬 스토리지? 에서 메모 불러오기 ?.. <-- 이건 왜하는건지 모르겠음
    const savedMemo = localStorage.getItem(`memo_${food_id}`);
    if (savedMemo) {
      setMemo(savedMemo);
    }
  }, []);

  // food_id에 해당하는 데이터를 가져오는 함수
  // useEffect(() => {
  //   const fetchFoodDetail = () => {
  //     // 여기서 data 배열에서 food_id에 해당하는 데이터를 찾습니다.
  //     const detail = data.find(item => item.food_id === parseInt(food_id));
  //     if (detail) {
  //       setFoodDetail(detail);
  //       setEditableDetail({
  //         item_amount: detail.item_amount,
  //         purchase_date: detail.purchase_date,
  //         expiration_date: detail.expiration_date,
  //       });

  //       // 페이지 로드 시 로컬 스토리지? 에서 메모 불러오기 ?..
  //       const savedMemo = localStorage.getItem(`memo_${food_id}`);
  //       if (savedMemo) {
  //         setMemo(savedMemo);
  //       }
  //     } else {
  //       console.log(`Food with id ${food_id} not found in data array.`);
  //     }
  //   };
  //   fetchFoodDetail();
  // }, [food_id]);

  // 메모 입력값 업데이트하는 함수
  const handleMemoChange = (e) => {
    const lines = e.target.value.split("\n");
    if (lines.length <= 6 && lines.every((line) => line.length <= 100)) {
      setMemo(e.target.value);
    }
  };

  // 메모 저장하는 함수
  const handleMemoSave = () => {
    localStorage.setItem(`memo_${food_id}`, memo);
    setSuccessMessage("메모가 저장되었습니다.");
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false); // 3초 후 모달 닫기기
    }, 1000);
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

    setSuccessMessage("수정이 완료되었습니다.");
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };

  // 수정된 값들을 업데이트하는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableDetail((prevDetail) => ({
      ...prevDetail,
      [name]:
        name === "purchase_date" || name === "expiration_date"
          ? value + "T00:00:00.000Z"
          : value,
    }));
  };

  const daysLeft = calculateDaysLeft(foodDetail.expiration_date);
  const alert_date = 3;

  return (
    <>
      <div className="foodDetailPage">
        <div className="undoSection">
          <button className="undoButton" onClick={() => navigate(-1)} />
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
            <div className="detailRow">
              <span className="detailInfo">◦ 식품명 :&nbsp;&nbsp;</span>
              <span className="foodName">{foodDetail.food_name}</span>
            </div>
            <div className="detailRow">
              <span className="detailInfo">◦ 카테고리 :&nbsp;&nbsp;</span>
              <span className="category">{foodDetail.category}</span>
            </div>
            <div className="detailRow">
              <span className="detailInfo">◦ 수량 :&nbsp;&nbsp;</span>
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
            <div className="detailRow">
              <span className="detailInfo">◦ 구입 날짜 :&nbsp;&nbsp;</span>
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
              <span className="detailInfo">◦ 유통 기한 :&nbsp;&nbsp;</span>
              <input
                className="editableInput"
                type="date"
                name="expiration_date"
                value={editableDetail.expiration_date.split("T")[0]}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="detailRow">
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
              <button className="saveButton" onClick={handleSave}>
                수정
              </button>
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
            <button className="memoSaveButton" onClick={handleMemoSave}>
              작성
            </button>
          </div>
        </div>
        <div className="tipSection">
          <span>◦ Tip</span>
          <div className="chatGPTSection">
            {foodTip ? (
              <textarea
                className="w-full h-full bg-inherit p-4 leading-7"
                value={foodTip}
                readOnly
              />
            ) : (
              <button
                onClick={() => {
                  setFoodTip("잠시만 기다려주세요...");
                  postFoodTips(foodDetail.food_name).then((response) => {
                    setFoodTip(response);
                  });
                }}
              >
                버튼을 눌러 팁 확인하기
              </button>
            )}
          </div>
        </div>
      </div>
      {/* 모달창 */}
      <CompleteModal
        isModalOpen={isModalOpen}
        message={successMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FoodDetailPage;
