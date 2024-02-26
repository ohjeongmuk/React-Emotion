import { useState, useEffect } from 'react'
import { useSearchParams, NavLink, Outlet } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import ErrorContainer from '../components/ErrorContainer.jsx'
import WeatherCard from '../components/WeatherCard.jsx'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

const api_key = "a10709164e17f1c60d487330e98d7d27"



const topnavStyle = css` 
    background-color: #333;
    overflow: hidden;

    /* Style the links inside the navigation bar */
    a {
      float: left;
      display: block;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
    }
    
    /* Change the color of links on hover */
    a:hover {
      background-color: #ddd;
      color: black;
    }
    
    /* Add an active class to highlight the current page */
    a.active {
      background-color: #04AA6D;
      color: white;
    }
    
    /* Hide the link that should open and close the topnav on small screens */
    .icon {
      display: none;
    }
`


export default function Root() {
    return (
        <div>
            <div css={topnavStyle} id="myTopnav">
                <NavLink to = "/"><i class="fa fa-home"></i></NavLink>
                <NavLink to = "/search"><i class="fa fa-search"></i></NavLink>
            </div>
            <Outlet />
        </div>
    )
}
