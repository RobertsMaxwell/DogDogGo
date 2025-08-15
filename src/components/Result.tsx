import "../styles/Result.css"

export default function Result (props: any) {
    return (
        <div className="result" onClick={() => {window.location.href = props.url}}>
            <a href={props.url} className="title">{props.title}</a>
            <p className="url">{props.url}</p>
            <p className="desc">{props.desc}</p>
        </div>
    );
}