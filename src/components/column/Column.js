import React from "react";
import Card from "../card/Card";
import "./style.css";

const Column = (props) => {
    const stateArr = props.cards;
    const compare = (a, b) => {
        return b.priority - a.priority;
    };
    stateArr.sort(compare);

    return(
        <div className={props.className}>
            <h2 className="title">{props.name}</h2>
            {props.cards.map((el, i) => {
                if(el.status === props.status) {
                    return <Card
                        key={i}
                        card={el}
                        status={el.status}
                        deleteCard={props.deleteCard}
                        cardIndex={i}
                        moveCard={props.moveCard}
                        abortedCard={props.abortedCard}
                        editCard={props.editCard}
                    />;
                }
                return null;
            })}
        </div>
    )
};

export default Column;