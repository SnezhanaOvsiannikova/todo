import React, { Component } from "react";
import { connect } from "react-redux";

//components
import Column from "../column/Column";
import ModalWindow from "../modalWindow/ModalWindow";
import "./style.css";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            editCardIndex: null,
            editCard: null
        };
        this.createCard = this.createCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.moveCard = this.moveCard.bind(this);
        this.abortedCard = this.abortedCard.bind(this);
        this.editCard = this.editCard.bind(this);
        this.showModalWindow = this.showModalWindow.bind(this);
        this.hideModalWindow = this.hideModalWindow.bind(this);
    }

    componentDidUpdate(){
        localStorage.setItem("card_list", JSON.stringify(this.props.cards));
    }

    componentDidMount(){
        const array = localStorage.getItem("card_list");

        try {
            if (array) {
                this.props.addCardList(JSON.parse(array));
            }
        } catch (e){
            console.log(e);
        }
     }

    createCard(state, index) {
        const description = state.valueDescription;
        const priority = +state.valuePriority;
        const status = index === null ? 1 : state.status;
        const time = index === null ? (new Date()).getTime() : state.time;

        if (index === null) {
            this.props.addCard({
                description,
                priority,
                status,
                time
            });
        } else {
            this.props.editCard({
                description,
                priority,
                status,
                time
            }, index);
        }
        this.setState({
            isOpen: false
        })
    }
    deleteCard(index) {
        this.props.deleteCard(index);
    }
    moveCard(index) {
        this.props.moveCard(index);
    }
    abortedCard(index) {
        this.props.abortedCard(index);
    }
    editCard(index) {
        this.setState({
            isOpen: true,
            editCardIndex: index,
            editCard: this.props.cards[index]
        });

        console.log(this.props.cards[index].status);
    }
    hideModalWindow = () => {
        this.setState({
            isOpen: false
        });
    };
    showModalWindow = () => {
        this.setState({
            isOpen: true,
            editCardIndex: null,
            editCard: null
        });
    };
    render() {
        return (
            <div className="container">
                <div className="board">
                    <Column
                        className="column-board"
                        name="Do It"
                        cards={this.props.cards}
                        status={1}
                        deleteCard={this.deleteCard}
                        moveCard={this.moveCard}
                        abortedCard={this.abortedCard}
                        editCard={this.editCard}
                    />
                    <Column
                        className="column-board"
                        name="Doing"
                        cards={this.props.cards}
                        status={2}
                        deleteCard={this.deleteCard}
                        moveCard={this.moveCard}
                        abortedCard={this.abortedCard}
                        editCard={this.editCard}
                    />
                    <Column
                        className="column-board"
                        name="Done"
                        cards={this.props.cards}
                        status={3}
                        deleteCard={this.deleteCard}
                        moveCard={this.moveCard}
                        abortedCard={this.abortedCard}
                        editCard={this.editCard}
                    />
                    <Column
                        className="column-board"
                        name="Aborted"
                        cards={this.props.cards}
                        status={4}
                        deleteCard={this.deleteCard}
                        moveCard={this.moveCard}
                        abortedCard={this.abortedCard}
                        editCard={this.editCard}
                    />
                </div>
                <div className="btn-holder">
                    <button className="btn" onClick={this.showModalWindow}>New task</button>
                </div>
                {this.state.isOpen === true ?
                        <ModalWindow
                            create={this.createCard}
                            showModalWindow = {this.showModalWindow}
                            hideModalWindow = {this.hideModalWindow}
                            editCardIndex={this.state.editCardIndex}
                            editCard={this.state.editCard}
                        /> : null
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        cards: state
    }),
    dispatch => ({
        addCardList: (cards) => {
            dispatch({
                type: "ADD_CARD_LIST",
                payload: cards
            })
        },
        addCard: (card) => {
            dispatch({
                type: "ADD_CARD",
                payload: card
            })
        },
        deleteCard: (index) => {
            dispatch({
                type: "DELETE_CARD",
                payload: index
            })
        },
        moveCard: (index) => {
            dispatch({
                type: "MOVE_CARD",
                payload: index
            })
        },
        abortedCard: (index) => {
            dispatch({
                type: "ABORTED_CARD",
                payload: index
            })
        },
        editCard: (card, index) => {
            dispatch({
                type: "EDIT_CARD",
                payload: {
                    card,
                    index
                }
            })
        }
    })
)(Board);
