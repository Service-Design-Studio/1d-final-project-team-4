import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core'
import { containerClasses, TextField } from "@mui/material";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {store, useGlobalState} from 'state-pool';
import '@fontsource/montserrat';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom'

function Ask(){
    const history = useHistory()
    const [conversation_id] = useGlobalState("conversation_id");
    const [question, setQuestion] = useState('');

    const location = useLocation();

    function vibrate() {
        if (!window) {
            return;
        }
        if (!window.navigator) {
            return;
        }
        if (!window.navigator.vibrate) {
            return;
        }
        window.navigator.vibrate(250);
    }

    function longvibrate() {
        if (!window) {
            return;
        }
        if (!window.navigator) {
            return;
        }
        if (!window.navigator.vibrate) {
            return;
        }
        window.navigator.vibrate(400);
    }

    window.addEventListener('deviceorientation', function(e) {
        // alert(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
        var B = e.beta;
        if (location.pathname == "/ask"){
            if (B > 150){
                
                console.log(question)
                if (question === ''){
                    alert("Please key in something into the text field")
                    longvibrate();
                }
                else {
                    axios.post('https://sign-ai-service-x4uj6fmx2a-as.a.run.app/chats.json',{"conversation_id": conversation_id, "sender": "Police", "message": question, crossdomain: true })
                    history.push('/translate');
                    vibrate();
                }
            }
        }
        
    });
    
    const askButton = () => {
        console.log(question)
        if (question === ''){
            alert("Please key in something into the text field")
            longvibrate();
        }
        else {
            axios.post('https://sign-ai-service-x4uj6fmx2a-as.a.run.app/chats.json',{"conversation_id": conversation_id, "sender": "Police", "message": question, crossdomain: true})
            history.push('/translate');
        }
    }
    return(
        <div>
            <h1 style={{marginTop: '25px', fontFamily: 'Montserrat', textTransform: "None", fontSize: '20px', color: '#26580F'}}>
                Please nod if you understand
            </h1>

            <div>
                <TextField
                    id="asking"
                    label="Questions to ask..."
                    multiline = {true}
                    rows={7}
                    hintText="Enter Question Here..."
                    style={{width: 350, height: 440, alignContent: "center", margin: '15px', fontSize: 50, fontFamily: 'Montserrat', textTransform: "None"}}
                    value={question}
                    onChange={(event) => {setQuestion(event.target.value)}}
                    multiline InputProps={{style: {fontSize: 50}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 20}}} // font size of input label
                    />
            </div>
            <div>
                <Button 
                    id = "ask_submit"
                    onClick={askButton} 
                    startIcon={<SendIcon/>}
                    style={{backgroundColor: '#F49619', width: 300, color: '#FFFFFF', borderRadius: '12px', margin: '2px', marginTop: '50px', height: '50px', fontFamily: 'Montserrat'}}
                    >Continue</Button>
            </div>
        </div>
    )
}
export default Ask;