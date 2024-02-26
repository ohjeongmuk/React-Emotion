import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, NavLink} from 'react-router-dom'
// 새로운 라이브러리 추가
// mutation과 query를 사용할수있도록 해줌
// Cache를 관리하기 위해서 QueryClient 인스턴스를 사용한다. 컴포넌트가 useQuery 훅 안에서 QueryClient 인스턴스에 접근할수도있도록 QueryClientProvider를 컴포넌트 트리 상위에 추가한다.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Root from './pages/Root'
import Home from './pages/HomePage'
import WeatherCard from './components/WeatherCard'
import SearchCity from './pages/SearchPage'
import './index.css'


const queryClient = new QueryClient()

// 같은 페이지를 사용하는 것처럼 보이지만, city=London을 즐겨찾기에 넣는 고객입장에서도 같은 페이지일까?
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "", element: <Home />},
            { path: "search", element: <SearchCity/>}
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client = {queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
)
