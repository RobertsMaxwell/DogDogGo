import "../styles/Serp.css"
import Search from "../images/search.png"
import Result from "../components/Result"
import PreResult from "../components/PreResult"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dropdown from "../images/dropdown.png"

export default function Serp () {
    const [results, setResults] = useState(null)
    const [stats, setStats] = useState(null)
    const [nextPage, setNextPage] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [loadingNext, setLoadingNext] = useState(false)
    const [language, setLanguage] = useState("Dog")
    const [langDropdown, setLangDropdown] = useState(false)

    const { query } = useParams()
    const nav = useNavigate()

    useEffect(() => {
        let langCookie = document.cookie.indexOf("language=")
        if(langCookie !== -1) {
            let langVal = ""
            for(let i = langCookie + 9; i < document.cookie.length; i++) {
                if(document.cookie[i] === ";") {
                    break
                } else {
                    langVal += document.cookie[i]
                }
            }
            setLanguage(langVal)
        }

        setSearchQuery(query)
        fetch(`https://customsearch.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY}&cx=f5ac147254d7346db&q=${query}`)
        .then(res => res.json())
        .then(data => {
            setResults(data.items.map(ele => {return {title: ele.title, url: ele.link, desc: ele.snippet}}))
            setStats({time: data.searchInformation.formattedSearchTime, amount: data.searchInformation.formattedTotalResults})
            setNextPage(data.queries.nextPage[0].startIndex)
        })
    }, [])

    useEffect(() => {
        document.cookie = `language=${language}; path=/`
    }, [language])

    return (
        <div className="SERP">
            <div className="header">
                <div className="container">
                    <div className="logo" onClick={() => {nav("/")}}>
                        DogDogGo
                    </div>
                    <div className="search_bar">
                            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search the web..." onKeyDown={e => {
                                if(e.key === "Enter") {
                                    if(searchQuery) {
                                        nav(`/search/${searchQuery}`)
                                        window.location.reload()
                                    }
                                }
                            }} />
                            <img src={Search} alt="Search" className="search_icon" onClick={() => {
                                if(searchQuery) {
                                    nav(`/search/${searchQuery}`)
                                    window.location.reload()
                                }
                            }} />
                    </div>
                </div>
                <div className="language">
                    <div onClick={() => {setLangDropdown(!langDropdown)}} className="selected"><p>{`Language: ${language}`}</p><img src={dropdown} alt="dropdown" /></div>
                    {langDropdown ? <div className="lang_drop">
                        <div onClick={() => {
                            setLanguage("Dog")
                            setLangDropdown(false)
                        }}>Dog</div>
                        <div onClick={() => {
                            setLanguage("English")
                            setLangDropdown(false)
                        }}>English</div>
                    </div>
                    : <></>}
                </div>
            </div>
            <div className="results">
                {stats ? <p className="info">{`${stats.amount} results found in ${stats.time} seconds`}</p> : <div className="preStats"></div>}
                {results ?
                <>
                    {results.map((ele, i) => <Result key={i} title={language === "Dog" ? convertToDog(ele.title) : ele.title} url={ele.url} desc={language === "Dog" ? convertToDog(ele.desc) : ele.desc} />)}
                    <div className="more">
                        <button disabled={loadingNext || nextPage > 40} onClick={() => {
                            if(!loadingNext && nextPage) {
                                setLoadingNext(true)
                                fetch(`https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyD-zkZnphdRIQDptJ-0uIkfuwH7TmBrtRs&cx=f5ac147254d7346db&q=${query}&start=${nextPage}`)
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data)
                                    setResults(results.concat(data.items.map(ele => {return {title: ele.title, url: ele.link, desc: ele.snippet}})))
                                    setNextPage(data.queries.nextPage[0].startIndex)
                                    setLoadingNext(false)
                                })
                            }
                        }}>Show more results</button>
                    </div>
                </>
                :
                <>
                    <PreResult />
                    <PreResult />
                    <PreResult />
                    <PreResult />
                    <PreResult />
                    <PreResult />
                    <PreResult />
                    <PreResult />
                    <PreResult />
                    <PreResult />
                </>
                }
            </div>
        </div>
    );
}

const convertToDog = function (str) {
    const woof = ["a", "b" , "c", "p", "q", "u", "v", "w", "t", "h", "i"]
    const bark = ["d", "e", "f", "g", "r", "s", "x", "y", "z"]
    const ruff = ["j", "k", "l",]
    const growl = ["m", "n", "o"]

    let res = ""

    for(let i = 0; i < Math.ceil(str.length / 4); i++) {
        if(woof.includes(str[i].toLowerCase())) {
            res += "Woof" + (str[i] === str[i].toLowerCase() ? " " : "! ")
        } else if (bark.includes(str[i].toLowerCase())) {
            res += "Bark" + (str[i] === str[i].toLowerCase() ? " " : "! ")
        } else if (ruff.includes(str[i].toLowerCase())) {
            res += "Ruff" + (str[i] === str[i].toLowerCase() ? " " : "! ")
        } else if (growl.includes(str[i].toLowerCase())) {
            res += "Growl" + (str[i] === str[i].toLowerCase() ? " " : "! ")
        }
    }

    return res
}