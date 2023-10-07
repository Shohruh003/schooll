import React from 'react';
import { useState, createContext } from "react";

export const PupilEmotionContext = createContext();

export const PupilEmotionProvider = ({children}) => {
  const [pupilEmotion, setPupilEmotion] = useState();

  return (
    <PupilEmotionContext.Provider value={{pupilEmotion, setPupilEmotion}}>
      {children}
    </PupilEmotionContext.Provider>
  );
};