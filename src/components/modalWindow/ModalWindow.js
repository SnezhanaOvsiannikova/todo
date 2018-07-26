import React, { Component } from "react";
import Priorities from "../../priorities";
import CancelIco from "../../icons/cancel-ico.svg";
import "./style.css";

class ModalWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueDescription: this.props.editCard ? this.props.editCard.description : "",
            valuePriority: this.props.editCard ? this.props.editCard.priority : "",
        };
        this.state.status = this.props.editCardIndex ? this.props.editCard.status : null;
        this.state.time = this.props.editCardIndex ? this.props.editCard.time : null;
        this.changeValuePriority = this.changeValuePriority.bind(this);
        this.changeValueDescription = this.changeValueDescription.bind(this);
    }
    changeValueDescription(e) {
        this.setState({
            valueDescription: e.target.value
        });
    }
    changeValuePriority(e) {
        this.setState({
            valuePriority: +e.target.value
        });
    }

    render() {
        return(
            <div className="pop-up">
                <img
                    src={CancelIco}
                    width="20"
                    height="20"
                    alt="ico"
                    className="close-icon"
                    onClick={this.props.hideModalWindow}
                />
                <form className="create-card">
                    <h2 className="heading">Description</h2>
                    <textarea
                        className="description"
                        onChange={this.changeValueDescription}
                        value={this.state.valueDescription}
                        disabled={this.props.editCard && this.props.editCard.status === 2}
                    />
                    <h2 className="heading">Priority</h2>
                    {Object.keys(Priorities).map(key => {
                        return <div key={key} className="radio-button">
                                    <input
                                        type="radio"
                                        name="priorities"
                                        id={`priorirty-${key}`}
                                        className="input-priority"
                                        value={key}
                                        checked={this.state.valuePriority === +key}
                                        onChange={this.changeValuePriority}
                                    />
                                    <label htmlFor={`priorirty-${key}`}>{Priorities[key]}</label>
                                </div>
                    })}
                    <div className="btn-holder">
                        {this.props.editCardIndex !== null ?
                            <button
                                onClick={() => {
                                    this.props.create(this.state, this.props.editCardIndex)
                                }}
                                className="btn btn-save"
                                type="button">Save change
                            </button> : null
                        }
                        {this.props.editCardIndex === null ?
                            <button
                                onClick={() => {
                                    this.props.create(this.state, null)
                                }}
                                className="btn"
                                type="button">Create card
                            </button> : null
                        }
                    </div>
                </form>
            </div>
        )
    }
}

export default ModalWindow;