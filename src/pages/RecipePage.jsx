import React, { useRef } from "react";
import "./RecipePage.css";

const RecipePage = ({ location, recipeFood }) => {
  const { state } = location || {};
  const { selectedItems } = state || {};

  const recipeBoxRef = useRef(null);

  const handleCopy = () => {
    if (recipeBoxRef.current) {
      const range = document.createRange();
      range.selectNodeContents(recipeBoxRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      alert("레시피 내용이 복사되었습니다!");
    }
  };

  return (
    <div className="RecipePage">
      <div className="RecipeHeader">
        {recipeFood && recipeFood.length > 0 && (
          <h2> {recipeFood.join(", ")}을 이용한 레시피</h2>
        )}
      </div>
      <div className="RecipeBox" ref={recipeBoxRef}>
        {/* 여기에 추천 레시피 내용을 추가합니다 */}
        <p>된장찌개와 탕후루를 활용한 레시피:

된장찌개 라면: 먼저 물을 끓여 라면을 삶습니다. 그리고 라면이 삶아지면 된장찌개의 된장, 고추장, 다진 마늘, 간장을 넣어 육수를 만들어요. 라면에 된장찌개 육수를 부어주고, 탕후루, 두부, 고명(파, 고추 등)을 올려 완성하세요.
된장찌개와 마라탕을 활용한 레시피:

마라된장찌개: 마라탕 양념과 된장을 섞어 마라된장을 만듭니다. 된장찌개의 육수를 끓이고, 마라된장을 넣어 간을 맞춰줍니다. 마라된장찌개에는 고기(소고기나 돼지고기), 두부, 감자, 양파, 얼갈이나 다른 야채 등을 넣어 조리하세요.
탕후루와 마라탕을 활용한 레시피:

마라탕후루: 먼저 고기(소고기나 돼지고기)와 채소(양파, 얼갈이, 버섯 등)를 준비합니다. 물을 끓이고 탕후루를 넣어 육수를 만듭니다. 마라탕 양념과 함께 육수에 고기와 채소를 넣어 끓여주면 마라탕후루가 완성돼요.</p>
      </div>
      <button className="copyButton" onClick={handleCopy}>
        복사
      </button>
      <ul>
        {selectedItems &&
          selectedItems.map((itemName, index) => (
            <li key={index}>{itemName}</li>
          ))}
      </ul>
      {/* 여기에 선택된 음식을 이용한 레시피 검색 또는 표시 등의 로직을 추가할 수 있습니다. */}
    </div>
  );
};

export default RecipePage;
