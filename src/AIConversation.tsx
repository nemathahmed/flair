import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Fade,
  CircularProgress
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { useWhisper } from '@chengsokdara/use-whisper';

const questions = [
  "Are there any third-party services we need to integrate with?",
  "What are the performance and scalability expectations?",
  "Can you tell me about the user testing plan?",
  "How will we be gathering feedback post-launch?",
  "Are we aligned on the key user flows?",
  "What are the critical design elements, especially for responsive layouts?",
  "How are we handling error scenarios?"
];

const AIConversationScreen = () => {
  const [conversation, setConversation] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAITyping, setIsAITyping] = useState(false);
  const [circleAnimation, setCircleAnimation] = useState(false);

  const { recording, transcript, startRecording, stopRecording } = useWhisper({
    onTranscribe: async (blob) => {
      // In a real application, you would process the audio here
      return { blob, text: "Sample user response" };
    },
  });

  useEffect(() => {
    if (conversation.length === 0) {
      addAIMessage("Hello Victor! I'm your AI assistant for today's meeting. Let's go through some important points for our project. " + questions[0]);
    }
  }, []);

  const addAIMessage = (message) => {
    setIsAITyping(true);
    setTimeout(() => {
      setConversation(prev => [...prev, { sender: 'AI', message }]);
      setIsAITyping(false);
    }, 1500);
  };

  const handleStartRecording = () => {
    startRecording();
    setIsRecording(true);
    setCircleAnimation(true);
  };

  const handleStopRecording = () => {
    stopRecording();
    setIsRecording(false);
    setCircleAnimation(false);
    
    // Simulate processing the user's voice input
    setTimeout(() => {
      const userResponse = "This is a simulated user response.";
      setConversation(prev => [...prev, { sender: 'User', message: userResponse }]);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setTimeout(() => {
          addAIMessage(questions[currentQuestion + 1]);
        }, 1000);
      } else {
        setTimeout(() => {
          addAIMessage("Great! We've covered all the main points. Is there anything else you'd like to discuss?");
        }, 1000);
      }
    }, 1000);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#2E073F', color: 'white', p: 3 }}>
      <Typography variant="h4" gutterBottom>Meeting with AI Assistant</Typography>
      
      {/* <Paper 
        elevation={3} 
        sx={{ 
          flexGrow: 1, 
          mb: 2, 
          p: 2, 
          bgcolor: '#7A1CAC', 
          color: 'white', 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {conversation.map((msg, index) => (
          <Fade in={true} key={index}>
            <Box 
              sx={{ 
                alignSelf: msg.sender === 'AI' ? 'flex-start' : 'flex-end',
                bgcolor: msg.sender === 'AI' ? '#4A0E78' : '#0E4A78',
                borderRadius: 2,
                p: 1,
                mb: 1,
                maxWidth: '70%'
              }}
            >
              <Typography>{msg.message}</Typography>
            </Box>
          </Fade>
        ))}
        {isAITyping && (
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'grey.500' }}>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography>AI is thinking...</Typography>
          </Box>
        )}
      </Paper> */}

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <div style={{ position: 'relative' }}>
          <IconButton
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            style={{
              backgroundColor: '#7A1CAC',
              color: '#FFF',
              width: 80,
              height: 80,
              marginBottom: '20px',
              zIndex: 2,
            }}
          >
            {isRecording ? <StopIcon fontSize="large" /> : <MicIcon fontSize="large" />}
          </IconButton>
          {circleAnimation && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: 'rgba(122, 28, 172, 0.5)',
                animation: 'pulse 2s infinite',
                zIndex: 1,
              }}
            />
          )}
        </div>
      </Box>

      <Paper elevation={3} sx={{ p: 2, bgcolor: '#4A0E78', color: 'white' }}>
        <Typography variant="h6" gutterBottom>Meeting Agenda</Typography>
        <List>
          {questions.map((question, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {index <= currentQuestion ? 
                  <CheckCircleOutlineIcon sx={{ color: 'green' }} /> : 
                  <RadioButtonUncheckedIcon sx={{ color: 'grey.500' }} />
                }
              </ListItemIcon>
              <ListItemText primary={question} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default AIConversationScreen;