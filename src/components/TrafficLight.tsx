import * as React from 'react';
import { Box, Chip } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const TrafficLight = ({ status }: { status: { recording: boolean; speaking: boolean; transcribing: boolean } }) => {
  return (
<>

              <Chip
                icon={<CircleIcon  style={{  color: status.speaking ? '#D8E9A8' : '#6B728E' }} sx={{ color: status.speaking ? '#FFFF00' : '#7A1CAC' }} />}
                label="Speaking"
                variant="outlined"
                size='small'
                sx={{ marginRight: 2,marginLeft: 2, color:'#CBE4DE' }}
              />
              <Chip
                icon={<CircleIcon style={{  color: status.speaking ? '#D8E9A8' : '#6B728E' }} sx={{ color: status.transcribing ? '#00FF00' : '#7A1CAC' }} />}
                label="Transcribing"
                variant="outlined"
                size='small'
                sx={{ marginRight: 2, color:'#CBE4DE' }}
              />
     

</>
  );
};

export default TrafficLight;
