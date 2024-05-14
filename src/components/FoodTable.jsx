import React from "react";


const headers = [
    {
        text: '사진',
        value: 'foodPic'
    },
    {
        text: '식품명',
        value: 'foodName'
    },
    {
        text: '카테고리',
        value: 'category'
    },
    {
        text: '유통기한',
        value: 'expirationDate'
    },
    {
        text: '수량',
        value: 'itemAmount'
    }
  ];

  function FoodTable({ headers }) {
    return(
        <div className="table-container"> 
            <table className="foodTable">
                <thead>
                    <tr>
                        {
                            headers.map((header) =>
                            <th key={header.text}>
                                {header.text}
                            </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {

                    }
                </tbody>
            </table>
        </div>
    )
}


export {headers, FoodTable};