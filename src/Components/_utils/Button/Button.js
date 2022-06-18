import './Button.scss';

function Button({content, clickHandler}) {
    return (
        <button className="Button" onClick={clickHandler} >
            {content}
        </button>
    )
}

export default Button;