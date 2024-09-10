import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Button, Box, Switch } from '@mui/material';
import { useWhisper } from '@chengsokdara/use-whisper';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HistoryIcon from '@mui/icons-material/History';
import SendIcon from '@mui/icons-material/Send';
import { Fade } from '@mui/material';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [circleAnimation, setCircleAnimation] = useState(false);
  const [transcriptText, setTranscriptText] = useState("");
  const [startMessageVisible, setStartMessageVisible] = useState(true);

  const fullTranscript = "Hey Victor, just wanted to clarify a few things before we dive into the final stages. Are there any third-party services we need to integrate with, and what are the performance and scalability expectations? Also, could you tell me what the user testing plan is and how we will be gathering feedback post-launch? Let us make sure we are aligned on the key user flows and any critical design elements, especially for responsive layouts and error handling. Thanks!";

  const { recording, transcript, startRecording, stopRecording } = useWhisper({
    onTranscribe: async (blob) => {
      // Implement your custom transcription logic here
      return { blob, text: fullTranscript };
    },
  });

  const handleStartRecording = () => {
    startRecording();
    setIsRecording(true);
    setCircleAnimation(true);
    setShowTranscript(true);
    setShowSummary(false);
    setTranscriptText("");
    setStartMessageVisible(false);
  };

  const handleStopRecording = () => {
    stopRecording();
    setIsRecording(false);
    setCircleAnimation(false);
    setTranscriptText(fullTranscript);
  };

  useEffect(() => {
    if (!isRecording && showTranscript) {
      const timer = setTimeout(() => {
        setShowSummary(true);
      }, 1000); // Show summary shortly after recording stops
      return () => clearTimeout(timer);
    }
  }, [isRecording, showTranscript]);

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setTranscriptText(prev => {
          const nextSpace = fullTranscript.indexOf(' ', prev.length + 1);
          return fullTranscript.slice(0, nextSpace > -1 ? nextSpace : undefined);
        });
      }, 200); // Adjust speed as needed
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  // New effect for fading the start message in and out
  useEffect(() => {
    if (!isRecording) {
      const interval = setInterval(() => {
        setStartMessageVisible(prev => !prev);
      }, 1500); // Toggle visibility every 1.5 seconds
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  return (
    <Grid container style={{ minHeight: '100vh', backgroundColor: '#2E073F', padding: 10 }}>
      <Grid item xs={6} container direction="column" alignItems="center" justifyContent="center">
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
                borderRadius: '200%',
                backgroundColor: 'rgba(122, 28, 172, 0.5)',
                animation: 'pulse 2s infinite',
                zIndex: 1,
              }}
            />
          )}
        </div>
      </Grid>

      <Grid item xs={6}>
        <Card sx={{ 
          minHeight: "100vh", 
          backgroundColor: '#7A1CAC', 
          color: '#FFF',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {!isRecording && !showTranscript && (
              <Fade in={startMessageVisible} timeout={800}>
                <Typography variant="h4" align="center" sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '75%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  textShadow: '0 0 10px rgba(255,255,255,0.5)',
                }}>
                  Start to speak
                </Typography>
              </Fade>
            )}

            {showTranscript && (
              <Fade in={showTranscript}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 3 }}>
                    {transcriptText}
                  </Typography>
                </Box>
              </Fade>
            )}

            {showSummary && (
              <Fade in={showSummary}>
                <Box>
                  <Card sx={{ backgroundColor: '#7A1CAC', color: '#FFF', mb: 4, boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 3 }}>
                        Discussion Points For Meeting
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {[
                          "What are additional third-party service integration required?",
                          "What are the scalability and performance expectations?",
                          "What is the User testing plan?",
                          "What is the Post-launch feedback gathering strategy?"
                        ].map((point, index) => (
                          <Box key={index} sx={{ 
                            backgroundColor: '#7A1CAC', 
                            p: 1, 
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center'
                          }}>
                            <Switch defaultChecked color="default" />
                            <Typography variant="body1" sx={{ ml: 2 }}>
                              {point}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    p: 2, 
                  }}>
                    {[
                      { icon: <AttachFileIcon />, label: "Add Attachment" },
                      { icon: <HistoryIcon />, label: "Past Meetings" },
                      { icon: <SendIcon />, label: "Send Link" }
                    ].map((action, index) => (
                      <Button 
                        key={index} 
                        color="inherit" 
                        sx={{ 
                          ml: 2, 
                          backgroundColor: '#2E073F',
                          '&:hover': {
                            backgroundColor: '#4A4A4A',
                          },
                          padding: 1,
                          borderRadius:'50px'
                        }}
                      >
                        {action.icon}
                        <Typography sx={{ fontSize: 12, ml: 1 }}>{action.label}</Typography>
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Fade>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}