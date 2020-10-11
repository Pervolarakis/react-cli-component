import React, { Component } from 'react';
import * as socketActions from '../socketio'


class Cli extends Component {

    constructor(props) {
        super(props);
        socketActions.receiveMessages((err, msg) => this.onMessageReceive(msg))
        this.textLog = React.createRef();
    }
    state = {
        value: 'Root > ',
        newLineValue: '',
        pastCommands: [],
        oldValueLength: 7,
        backIndex: 0
    }

    onSumbit = (input) => {
        socketActions.sendMessage(input);
        // this.setState({ value: `${this.state.value} \nyou typed vsk gamise ${input}` })
    }

    onMessageReceive = async (msg) => {
        //when a message is received add it to value and set the new legth
        this.setState({ value: `${this.state.value} \n${msg}\nRoot > ` })
        this.setState({ oldValueLength: this.state.value.length })
    }

    onEnterPress = async (e) => {

        //if the cursor is not at the end of the text area then do nothing
        if (e.target.selectionStart < this.state.oldValueLength) {
            if (e.keyCode !== 39 && e.keyCode !== 37) {
                e.preventDefault()
            }

        }
        //when backspace is being pressed
        if (e.keyCode === 8) {
            if (e.target.selectionStart === this.state.oldValueLength) {
                e.preventDefault()
            }
        }

        //when up or down is pressed
        if (e.keyCode === 38 || e.keyCode === 40) {

            e.preventDefault()
            e.persist();
            //if the button i equal to up we increase the back index by 1
            if (e.keyCode === 38) {
                if (this.state.backIndex < (this.state.pastCommands.length)) {
                    this.setState({ backIndex: this.state.backIndex + 1 })
                } else {
                    return;
                }

            }
            //else we decrease it by one
            else {
                if (this.state.backIndex > 1) {
                    this.setState({ backIndex: this.state.backIndex - 1 })
                } else {
                    return;
                }
            }
            //we get a "copy of the current value so we can change it multiple times"
            await this.setState({ value: this.state.value.slice(0, this.state.oldValueLength) })
            //setting the newline to the currently selected value
            this.setState({ newLineValue: this.state.pastCommands[this.state.pastCommands.length - this.state.backIndex] })
            //adding the current selection to value
            this.setState({ value: `${this.state.value}${this.state.pastCommands[this.state.pastCommands.length - this.state.backIndex]}` })


        }

        //when enter is pressed
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            if (this.state.newLineValue !== '' && this.state.newLineValue !== undefined) {
                //add new line to past commands
                this.setState({ pastCommands: [...this.state.pastCommands, this.state.newLineValue] })
                this.onSumbit(this.state.newLineValue)
                // this.setState({ value: `${this.state.value}\nRoot > ` })
                // this.setState({ oldValueLength: this.state.value.length })
                this.setState({ newLineValue: '' })
                this.setState({ backIndex: 0 })

            }

        }
    }
    componentDidUpdate() {
        this.textLog.current.scrollTop = this.textLog.current.scrollHeight
    }

    render() {
        return (
            <div style={{ width: 600, height: 400, marginTop: 150 }}>
                <div style={{ height: 30, width: 620, backgroundColor: "white", borderTopLeftRadius: 5, borderTopRightRadius: 5, display: "flex", flexDirection: "row" }}>
                    <div style={{ width: 12, height: 12, backgroundColor: "#e75448", borderRadius: 60, margin: "8px" }}></div>
                    <div style={{ width: 12, height: 12, backgroundColor: "#e5c30f", borderRadius: 60, margin: "8px" }}></div>
                    <div style={{ width: 12, height: 12, backgroundColor: "#3bb662", borderRadius: 60, margin: "8px" }}></div>
                </div>
                <textarea ref={this.textLog} style={{ fontSize: 15, border: "none", resize: "none", width: 600, height: 330, backgroundColor: "#30353a", padding: 10, color: "white", outline: "none" }} value={this.state.value} onChange={(e) => this.setState({ value: e.target.value, newLineValue: e.target.value.slice(this.state.oldValueLength) })} onKeyDown={this.onEnterPress} >

                </textarea>
            </div>

        )
    }
}

export default Cli;