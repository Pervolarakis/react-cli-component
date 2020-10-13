import React, { useState, useEffect } from 'react';
import * as socketActions from '../socketio'


const Cli = props => {

    //setting all the state
    const [value, setValue] = useState('You > ');
    const [newLineValue, setNewLineValue] = useState('');
    const [pastCommands, setPastCommands] = useState([]);
    const [oldValueLength, setOldValueLength] = useState(6);
    const [backIndex, setBackIndex] = useState(0);
    const textLog = React.createRef();

    //on componentDidMount mount the eventemmiters to the component
    useEffect(() => {
        socketActions.receiveMessages((err, msg) => onMessageReceive(msg))
    }, [])


    //componentDidUpdate for text area autoscroll
    useEffect(() => {
        textLog.current.scrollTop = textLog.current.scrollHeight;
    })

    //every time backIndex is changed (on up or down arrow key press) change the text
    useEffect(() => {
        if (backIndex !== 0) {
            //set current value to an older command
            setNewLineValue(pastCommands[pastCommands.length - backIndex])
            //change the text to match new text
            setValue(`${value.slice(0, oldValueLength)}${pastCommands[pastCommands.length - backIndex]}`)
        }

    }, [backIndex])

    useEffect(() => {
        console.log(value, oldValueLength)
    }, [oldValueLength])

    //when a message is received append it to the console
    const onMessageReceive = (msg) => {
        console.log(msg.length)
        setValue(previousMessages => `${previousMessages.slice(0, previousMessages.lastIndexOf('You'))}${msg}\nYou > `)
        setOldValueLength(previeousLength => previeousLength + msg.length + 1)
    }

    //on submit
    const onSumbit = (input) => {
        if (input === 'clear') {
            setValue('Root > ');
            setOldValueLength(7);

        } else {
            // setOldValueLength(previeousLength => previeousLength + input.length)
            socketActions.sendMessage(input);
        }
    }

    //when a button is pressed
    const onButtonPress = async (e) => {

        //if the cursor is not at the end of the text area then do nothing
        if (e.target.selectionStart < oldValueLength) {
            if (e.keyCode !== 39 && e.keyCode !== 37) {
                e.preventDefault()
            }

        }

        //when backspace is being pressed
        if (e.keyCode === 8) {
            if (e.target.selectionStart === oldValueLength) {
                e.preventDefault()
            }
        }

        //when up or down is pressed
        if (e.keyCode === 38 || e.keyCode === 40) {
            e.preventDefault()
            //if the button i equal to up we increase the back index by 1
            if (e.keyCode === 38) {
                if (backIndex < pastCommands.length) {
                    setBackIndex(backIndex + 1);
                } else {
                    return;
                }

            }
            //else we decrease it by one
            else {
                if (backIndex > 1) {
                    setBackIndex(backIndex - 1);
                } else {
                    return;
                }
            }
        }

        //when enter is pressed
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            if (newLineValue !== '' && newLineValue !== undefined) {
                onSumbit(newLineValue)
                setPastCommands([...pastCommands, newLineValue]);
                setNewLineValue('');
                setBackIndex(0);

            }

        }
    }


    return (
        <div style={{ width: 600, height: 400, marginTop: 150 }}>
            <div style={{ height: 30, width: 620, backgroundColor: "white", borderTopLeftRadius: 5, borderTopRightRadius: 5, display: "flex", flexDirection: "row" }}>
                <div style={{ width: 12, height: 12, backgroundColor: "#e75448", borderRadius: 60, margin: "8px" }}></div>
                <div style={{ width: 12, height: 12, backgroundColor: "#e5c30f", borderRadius: 60, margin: "8px" }}></div>
                <div style={{ width: 12, height: 12, backgroundColor: "#3bb662", borderRadius: 60, margin: "8px" }}></div>
            </div>
            <textarea ref={textLog} spellCheck="false" style={{ fontSize: 15, border: "none", resize: "none", width: 600, height: 330, backgroundColor: "#30353a", padding: 10, color: "white", outline: "none" }} value={value} onChange={(e) => { setValue(e.target.value); setNewLineValue(e.target.value.slice(oldValueLength)) }} onKeyDown={onButtonPress} >

            </textarea>
        </div>

    )

}

export default Cli;