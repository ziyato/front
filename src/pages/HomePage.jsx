// HomePage.jsx

import React from 'react';
import './HomePage.css';
import {headers, FoodTable} from '../components/FoodTable.jsx';



const HomePage = () => {

  return (
    <div className="HomePage">
      <div className = 'searchSection'>
        <select className='dropdown'>
          <option value='foodName'>식품명</option>
          <option value='category'>카테고리</option>
        </select>
        <input type='text' className='searchBar'></input>
        <button type='button' className='searchButton'></button>
      </div>
      <FoodTable headers = {headers}/>
    </div>
  );
};

export default HomePage;
