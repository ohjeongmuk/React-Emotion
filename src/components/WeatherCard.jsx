import React from 'react';
import { useState } from 'react'
import { NavLink  } from 'react-router-dom';
 /** @jsxImportSource @emotion/react */
 import { jsx, css } from '@emotion/react'

const ToFahrenheit = (t) => {
    const  f = (t-273.15)  * 9 / 5 + 32;
    return f.toFixed(1)
}

const ToCelcius = (t) => {
    return (t-273.15).toFixed(1)
}

const capital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const date = (weatherDate) => {
    const dateObj = new Date(weatherDate);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // 년, 월, 일, 시간, 분을 추출합니다.
    const year = dateObj.getFullYear();
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();

    // 시간을 AM/PM 형식으로 변경합니다.
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // 0시를 12시로 표시합니다.
    
    // 분을 두 자리 숫자로 변환합니다.
    minute = minute < 10 ? '0' + minute : minute;

    // 최종적으로 형식을 조합하여 반환합니다.
    const formattedDate = `${month} ${day}, ${hour}:${minute} ${ampm}`;

    return formattedDate;
}



const image_container = css`
    width: 130px; /* 이미지 컨테이너의 너비를 조정합니다. */
    height: 90px; /* 이미지 컨테이너의 높이를 조정합니다. */
    border-radius: 50%; /* 둥근 형태로 이미지 컨테이너를 만듭니다. */
    //border: 2px dashed fff//rgba(4, 170, 109, 0.45); /* 점선 테두리를 추가하고 색상의 투명도를 조절합니다. */
    overflow: hidden; /* 이미지 영역을 컨테이너로 감쌉니다. */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

const image_style = css`
    width: 100%; /* 이미지의 너비를 100%로 설정합니다. */
    height: auto; /* 이미지의 높이를 자동으로 조정합니다. */
`
const card_style = css`
    padding: 20px;
    margin: 10px; /* 모든 카드 간격 추가 */
    border-radius: 10px;
    width: 415px;
    border: 1px solid #ddd; /* 테두리 스타일 */
    background-color: #fff; /* 배경색 */
    font-family: 'Gill Sans', sans-serif; /* 글꼴 변경 */
    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.1); /* 그림자 효과 */
    font-size: 12px;
`
const font_p1 = css`
    font-size: 14px;
`

const font_p2 = css`
    font-size: 16px;
    text-align: right; /* 텍스트를 오른쪽으로 정렬합니다. */
`

const selected_unit = css`
    color: black;
    font-weight: bold;
`
const unselected_unit = css`
    color: #808080;
`




const WeatherCard = ({weatherData}) => {
    const [ unitC, setUnitC ] = useState(true);
    const [ unitF, setUnitF ] = useState(false);
    const [ unit, setUnit ] = useState(true); 
    
    const handleUnitC = () => {
        setUnitC(true);
        setUnit(true)
        setUnitF(false);
    };

    const handleUnitF = () => {
        setUnitC(false);
        setUnit(false)
        setUnitF(true);
    };


// {ToFahrenheit(weatherData.main.temp_max)}

    return (
        <div css = {card_style} style ={{display: "flex"}}>
            {/*<li key={weatherData.dt_txt}> */}
            {/* 날짜 아래에 이미지 그림 */}
            <div css={{ marginRight: '7px', marginLeft: '5px' }}>
                {date(weatherData.dt_txt)}
                <div css={image_container}>
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="Weather Icon"
                        css={image_style} /* 이미지에 스타일을 적용합니다. */
                    />
                </div>
            </div>
            <div css={{ marginLeft: '7px', width: '300px'}}>
                <div css={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p css = {font_p1}>highest &nbsp;</p>
                    <h2>{unit ? ToCelcius(weatherData.main.temp_max) : ToFahrenheit(weatherData.main.temp_max) } &nbsp;</h2>
                    <p css = {font_p1}>lowest &nbsp;</p>
                    <h2>{unit ? ToCelcius(weatherData.main.temp_min) : ToFahrenheit(weatherData.main.temp_min) } &nbsp;</h2>
                    <h2 onClick = {handleUnitF} css={unit ? unselected_unit : selected_unit}> °F  </h2>
                    <h2> &nbsp; &nbsp;|&nbsp; </h2>
                   <h2 onClick = {handleUnitC} css={unit ? selected_unit : unselected_unit}> °C </h2>
                </div>
                <div css={font_p2}>
                    <p>Precipitation: {(weatherData.pop * 100).toFixed(0)}%</p>
                    <p>{capital(weatherData.weather[0].description)}</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard;