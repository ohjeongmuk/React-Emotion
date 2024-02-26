import { useState, useEffect } from 'react'
import { useSearchParams, NavLink } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import ErrorContainer from '../components/ErrorContainer.jsx'
import WeatherCard from '../components/WeatherCard.jsx'
 /** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'


const api_key = "a10709164e17f1c60d487330e98d7d27"

export default function SearchCity() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const query = searchParams.get("q");
    const [ inputQuery, setInputQuery ] = useState(query || "")
    const [ repos, setRepos ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    
    // pagination react hook
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerpage = 6;
    const [itemsStartIdx, setitemsStartIdx] = useState(0);
    const [itemsEndIdx, setitemsEndIdx] = useState(6);

    // 한줄에 2개의 카드 보여주기
    const itemsPerRow = 2;
    

    const form_container = css`
        text-align: center;
        margin: 20px auto;
        max-width: 300px;
    `

    const input_field = css`
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;

        &::placeholder {
            /* placeholder의 글꼴을 변경합니다. */
            font-family: 'Your Font', sans-serif; /* 여기에 사용할 글꼴을 지정하세요 */
        }
    `
    const submit_button = css`
        background-color: #04AA6D;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        margin-left: 5px;
        cursor: pointer;
    `

    const centerize = css`
        display: flex;
        justify-content: center;
        align-items: center;
    `

    const weather_cardbox = css`
        display: flex;
        justify-content: center;
        align-items: center;
    `

    useEffect(() => {
        const newStartIdx = (currentPage - 1) * itemsPerpage;
        const newEndIdx = currentPage * itemsPerpage;
        setitemsStartIdx(newStartIdx);
        setitemsEndIdx(newEndIdx);
        console.log("cur page:", currentPage)
        console.log("start:", newStartIdx)
        console.log("end:", newEndIdx)
        
    }, [currentPage])

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        //const maxPage = Math.ceil(repos.length / itemsPerpage);
        setCurrentPage(currentPage + 1);   
    }

    // render 이후에 실행된다.페이지가 보여진 이후에
    useEffect(() => {
    // 왜 밖에다 선언?
        const controller = new AbortController();

        async function fetchSearchResults() {
            setLoading(true)
            try {
                // throw new Error("woops!")
                const response_1 = await fetch(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${api_key}`,
                    { signal: controller.signal }
                );

                // 이용할수있게 스트림으로 데이터들이 들어오는중.. 그래서 기다려야함
                const responseBody_1 = await response_1.json(); // access to body
                console.log("==responseBody:", responseBody_1);
                const lat = responseBody_1[0].lat
                const lon = responseBody_1[0].lon
                
                const response_2 = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
                    { signal: controller.signal } 
                )
                
                // 전체 정보를 저장해놓는다
                const responseBody_2 = await response_2.json();
                console.log("==responseBody_2: ", responseBody_2.list)
                setLoading(false)
                setRepos(responseBody_2.list || []);

            } catch (err) {
                if (err.name == "AbortError"){
                    console.log("HTTP Request was aborted!");
                } else {
                    console.error(err);
                    setError(err);
                }
            }
        }

        if (query) {
            fetchSearchResults()
            // success
            .then()
            // error
            .catch()
        }
        return () => controller.abort()
    }, [ query ]) 

    return (
        <>
            <form 
                css={form_container}
                onSubmit={e => {
                    e.preventDefault()
                    setSearchParams({ q: inputQuery })
                }}>
                {/* div 를 사용해서 한줄에 표시 */}
                <div css = {centerize}>
                    <input
                        value={inputQuery} 
                        onChange={e => setInputQuery(e.target.value)}
                        css = {input_field}
                        placeholder="Put any city name"    
                    />
                    <button type="submit" css={submit_button}>Search</button>
                </div>
            </form>
            {/* Spinner OR Error  */}
            {/*<h2>CITY {query}</h2>*/}
            <div css ={centerize}>
                {error && <ErrorContainer />}
                {loading && <Spinner />}
            </div>
            <ul>
                <div style= {{ width: '100%',height: '650px'}}>
                {/* reduce란 무엇인가? */}
                {repos.slice(itemsStartIdx, itemsEndIdx).reduce((rows, item, index) => {
                    if (index % itemsPerRow === 0) rows.push([]);
                        rows[rows.length - 1].push(item);
                    return rows;
                }, []).map((row, rowIndex) => (
                    // justifyContent: 'center'는 화면을 늘릴때 가운데에 위치하도록 만듦
                    <div key={rowIndex} css={weather_cardbox}>
                        {row.map((item) => (
                            <WeatherCard key={item.dt} weatherData={item} />
                        ))}
                    </div>
                ))}
                </div>
            </ul>
            <div css = {centerize}>
                {currentPage != 1 && (
                    <ul>
                        <p onClick={handlePreviousPage} className="pagination-link"><img width="50" height="50" src="https://img.icons8.com/ios/50/circled-left-2.png" alt="circled-left-2"/></p>
                    </ul>
                )}
                {repos.length > itemsEndIdx && (
                    <ul>
                        <p onClick={handleNextPage} className="pagination-link"><img width="50" height="50" src="https://img.icons8.com/ios/50/circled-right-2.png" alt="circled-right-2"/></p>
                    </ul>
                )}
            </div>
        </>
    )
}



