import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";

const defaultState = [];

function kanbanBoard(state = defaultState, action) {
    if(action.type === "ADD_CARD_LIST") {
        return action.payload;
    }
    if(action.type === "ADD_CARD") {
        return [
            action.payload,
            ...state
        ];
    }
    if(action.type === "DELETE_CARD") {
        const newArray = [...state];

        newArray.splice(action.payload, 1);
        return newArray;
    }
    if(action.type === "MOVE_CARD") {
        const newArray = [...state];

        newArray[action.payload].status += 1;
        return newArray;
    }
    if(action.type === "ABORTED_CARD") {
        const newArray = [...state];

        newArray[action.payload].status = 4;
        return newArray;
    }
    if(action.type === "EDIT_CARD") {
       const newArray = [...state];

       newArray[action.payload.index] = action.payload.card;
       return newArray;
    }
    return state;
}
const store = createStore(kanbanBoard);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();