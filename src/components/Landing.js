import "../styles/Landing.css"

export default function Landing () {
    return (
        <div className="landing">
            <div className="title">
                DogDogGo
            </div>
            <div className="search_bar">
                <input type="text" />
            </div>
            <div className="misc">
                The worlds first search engine for dogs.
            </div>
        </div>
    )
}