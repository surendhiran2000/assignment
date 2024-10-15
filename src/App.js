import React, { useState } from 'react';
import { Button, Box, LinearProgress } from '@mui/material';

const App = () => {
  const [num, setNum] = useState(0); // Current number
  const [history, setHistory] = useState([0]); // Stores number history for undo/redo
  const [currentStep, setCurrentStep] = useState(0); // Tracks current position in history

  // Function to update the number and manage history for undo/redo
  const updateNumber = (newValue) => {
    const newHistory = [...history.slice(0, currentStep + 1), newValue];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    setNum(newValue);
  };

  // Increment number (max 150)
  const increment = () => {
    if (num < 150) {
      updateNumber(num + 1);
    }
  };

  // Decrement number (min 0)
  const decrement = () => {
    if (num > 0) {
      updateNumber(num - 1);
    }
  };

  // Undo last change
  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setNum(history[currentStep - 1]);
    }
  };

  // Redo undone change
  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      setNum(history[currentStep + 1]);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <h1>Number: {num}</h1>
      
      {/* Decrement and Increment buttons */}
      <Button variant="contained" color="primary" onClick={decrement} sx={{ m: 1 }}>
        Subtract 1
      </Button>
      <Button variant="contained" color="secondary" onClick={increment} sx={{ m: 1 }}>
        Add 1
      </Button>

      {/* Undo and Redo buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <Button variant="outlined" onClick={undo} disabled={currentStep === 0}>
          Undo
        </Button>
        <Button variant="outlined" onClick={redo} disabled={currentStep === history.length - 1} sx={{ ml: 2 }}>
          Redo
        </Button>
      </Box>

      {/* Progress bar that updates based on the number */}
      <LinearProgress
        variant="determinate"
        value={(num / 150) * 100} // Progress value as percentage of 150
        sx={{ height: 10, my: 2, transition: 'width 0.5s ease' }} // Smooth transition for progress bar
      />
    </Box>
  );
};

export default App;
