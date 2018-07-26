import React from "react";
import Priorities from "../../priorities";
import DeleteIco from "../../icons/delete-ico.svg";
import "./style.css";

const cardDate = (time) => {
    const newDate = new Date(time);
    const month = newDate.getMonth()+1;
    const year = newDate.getFullYear();
    const day  = newDate.getDate();
    const hours = newDate.getHours();
    const minutes = (newDate.getMinutes()<10?'0':'') + newDate.getMinutes();
    const fullDate = `${year}/${month}/${day} ${hours}:${minutes}`;

    return fullDate;
};

const priorityColor = (el) => {
    if(el.priority === 1) {
        return "green";
    } else if(el.priority === 2) {
        return "yellow";
    } else if(el.priority === 3) {
        return "red";
    }
};

const Card = (props) => {
    return(
        <div className="wrapper-card ">
            {props.status === 3 || props.status === 4 ?
                <img
                    src={DeleteIco}
                    width="20"
                    height="20"
                    alt="ico"
                    className="close-icon"
                    onClick={() => {
                        props.deleteCard(props.cardIndex);
                    }}
                /> : null
            }
            <div className="wrap-block">
                <div>{props.card.description}</div>
                <div className={`${priorityColor(props.card)} priorities`}>{Priorities[props.card.priority]}</div>
            </div>
            <div className="data">{cardDate(props.card.time)}</div>
            <div className="btn-block">
                {props.status === 1 || props.status === 2 ?
                    <div>
                        <button className="btn button" onClick={() => {
                            props.editCard(props.cardIndex);
                        }}>Edit</button>
                        <button className="btn button" onClick={() => {
                            props.abortedCard(props.cardIndex);
                        }}>Abort</button>
                    </div>  : null

                }
                {props.status !== 4 ?
                    <button className="btn" onClick={() => {
                        props.moveCard(props.cardIndex);
                    }}>Next step</button> : null
                }
            </div>
        </div>
    )
};

export default Card;