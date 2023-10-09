import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Container, Stack, Typography, TextField, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './productpage.css';


export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [bg,setbg] = useState('white')
  const [recognizedText, setRecognizedText] = useState('');
  const {transcript,browserSupportsSpeechRecognition} = useSpeechRecognition();
  const [typedText, setTypedText] = useState(''); // State for typed text
  console.log(transcript,'in transcript');

  const handleInputChange = (e) => {
    
    setTypedText(e.target.value); // Update the typed text state
   
  };
  
  

  const handleSendMessage = () => {
    // Add the user's message to the chat history
   
    const updatedChatHistory = [...chatHistory, { text: typedText===''?transcript:typedText, isUser: true }];
    

    // Clear the input field
    setInputText('');

    // Simulate a response from a model (you can replace this with your actual logic)
    const response = { text: 'This is a sample response from the model.', isUser: false };

    // Add the model's response to the chat history
    updatedChatHistory.push(response);

    setChatHistory(updatedChatHistory);
  };
  const handleListen = () => {
    setbg((prevBg) => {
      if(prevBg==='white'){
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
        return 'red'
      }
      
        SpeechRecognition.stopListening();
        return 'white'
      
      
    }); // Toggle background color
  
   
  };
  
 
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  

  return (
    <>
      <Helmet>
        <title> Dashboard: Chat | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack spacing={2} style={{alignContent:'center' ,justifyContent:'center'}}>
          <Typography variant="h4">Chat Interface</Typography>
          <div style={{ border: '1px solid #ccc', minHeight: '300px', padding: '10px', borderRadius: '5px', overflowY: 'scroll',backgroundColor:'black' }}>
            {chatHistory.map((message, index) => (
              <div key={index} style={{ textAlign: message.isUser ? 'right' : 'left' }}>
                <Typography variant="body1" style={{ padding: '5px', backgroundColor: message.isUser ? 'black' : 'grey', color: message.isUser ? 'white' : '#fff', borderRadius: '5px' }}>
                  {message.text}
                </Typography>
              </div>
            ))}
          </div>
          
          <div style={{display:'flex',gap:'10px'}}>
          <TextField
            label="Type a message"
            variant="outlined"
            style={{width:'93%'}}
            value={transcript + typedText}
            onChange={handleInputChange}

          />
          <div>
          <Button onClick={handleListen}   style={{width:'100%',height:'100%' ,backgroundColor:bg}} variant="outlined" color="secondary" >
              <MicIcon   className={bg === 'red' ? 'bounce-animation' : ''}/> {/* Display the Mic icon */}
            </Button>
            {isListening && <p>Listening...</p>}
          </div>
          </div>
          <Button  style={{width:'50%',marginLeft:'25%'}} variant="contained" color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Stack>
      </Container>
    </>
  );
}
