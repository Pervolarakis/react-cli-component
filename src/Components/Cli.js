import React, { Component } from 'react';


class Cli extends Component {

    constructor(props) {
        super(props);

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
        this.setState({ value: `${this.state.value} \nyou typed vsk gamise ${input}` })
        console.log(this.state.value.length)
    }

    onEnterPress = async (e) => {

        // console.log(e.keyCode)
        console.log(e.target.selectionStart)

        //if the cursor is not at the end of the text area then do nothing
        if (e.target.selectionStart < this.state.oldValueLength) {
            if (e.keyCode !== 39 && e.keyCode !== 37) {
                e.preventDefault()
            }

        }

        if (e.keyCode === 8) {
            if (e.target.selectionStart === this.state.oldValueLength) {
                e.preventDefault()
            } else {
                this.setState({ newLineValue: this.state.newLineValue.slice(0, -1) })

            }
        }

        //when up or down is pressed
        if (e.keyCode === 38 || e.keyCode === 40) {
            e.preventDefault()
            console.log(this.state.backIndex)
            console.log(this.state.pastCommands.length)


            if (e.keyCode === 38) {
                if (this.state.backIndex < (this.state.pastCommands.length)) {
                    this.setState({ backIndex: this.state.backIndex + 1 })
                } else {
                    return;
                }

            }
            else {
                if (this.state.backIndex > 1) {
                    this.setState({ backIndex: this.state.backIndex - 1 })
                } else {
                    return;
                }
            }

            await this.setState({ value: this.state.value.slice(0, this.state.oldValueLength) })
            this.setState({ newLineValue: this.state.pastCommands[this.state.pastCommands.length - this.state.backIndex] })
            this.setState({ value: `${this.state.value}${this.state.pastCommands[this.state.pastCommands.length - this.state.backIndex]}` })


        }

        //when a character is pressed
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            this.setState({ newLineValue: `${this.state.newLineValue}${String.fromCharCode(e.keyCode).toLowerCase()}` })
        }

        //when enter is pressed
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            if (this.state.newLineValue !== '' && this.state.newLineValue !== undefined) {

                this.setState({ pastCommands: [...this.state.pastCommands, this.state.newLineValue] })
                await this.onSumbit(this.state.newLineValue)
                this.setState({ value: `${this.state.value}\nRoot > ` })

                this.setState({ newLineValue: '' })
                console.log(this.state.value.length)

                this.setState({ oldValueLength: this.state.value.length })
                this.setState({ backIndex: 0 })

            }

        }
    }
    componentDidUpdate() {
        this.textLog.current.scrollTop = this.textLog.current.scrollHeight
    }

    render() {
        return (
            <div style={{ width: 500, height: 300 }}>
                <div style={{ height: 30, width: 520, backgroundColor: "white", borderTopLeftRadius: 5, borderTopRightRadius: 5, display: "flex", flexDirection: "row" }}>
                    <div style={{ width: 15, height: 15, backgroundColor: "#e75448", borderRadius: 60, margin: "5px" }}></div>
                    <div style={{ width: 15, height: 15, backgroundColor: "#e5c30f", borderRadius: 60, margin: "5px" }}></div>
                    <div style={{ width: 15, height: 15, backgroundColor: "#3bb662", borderRadius: 60, margin: "5px" }}></div>
                </div>
                <textarea ref={this.textLog} style={{ fontSize: 15, border: "none", resize: "none", width: 500, height: 300, backgroundColor: "#30353a", padding: 10, color: "white", outline: "none" }} value={this.state.value} onKeyDown={this.onEnterPress} onChange={(e) => this.setState({ value: e.target.value })}>

                </textarea>
            </div>

        )
    }
}

export default Cli;