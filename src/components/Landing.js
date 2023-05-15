import "../styles/Landing.css"
import search from "../images/search.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Landing () {
    const [selected, setSelected] = useState(false)
    const [query, setQuery] = useState("")

    const nav = useNavigate()

    return (
        <div className="landing">
            <div className="title">
                DogDogGo
            </div>
            <div className={`search_bar ${selected ? "selected" : ""}`}>
                <input value={query} onChange={(e) => {setQuery(e.target.value)}} type="text" placeholder="Search the web..." onFocus={() => {setSelected(true)}} onBlur={() => {setSelected(false)}}
                onKeyDown={(e) => {
                    if(e.key === "Enter") {
                        if(query) {
                            nav(`/search/${query}`)
                        }
                    }
                }} />
                <img src={search} alt="Search" />
            </div>
            <div className="misc">
                The worlds first search engine for dogs.
            </div>
        </div>
    )
}