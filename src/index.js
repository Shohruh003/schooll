import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { PupilProvider } from './context/PupilContext';
import { TeacherProvider } from './context/TeacherContext';
import { PupilEmotionProvider } from './context/PupilEmotion';
import { PupilCountProvider } from './context/PupilCount';
import { PupilClassProvider } from './context/PupilClass';
import { OriginalUsersProvider } from './context/OriginalUsers';
import { GendersProvider } from './context/Genders';
import { ClassesProvider } from './context/Classes';
import { AgeRangeProvider } from './context/AgeRange';
import { TeacherCountProvider } from './context/TeacherCount';
import { ClassListProvider } from './context/ClassList';
import { LoginProvider } from './context/loginContext';
import { ThemeProvider } from './context/ThemeContext';
import { DecodeProvider } from './context/DecodeContext';
import { PositionProvider } from './context/PositionContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <PupilProvider>
      <TeacherProvider>
        <PupilEmotionProvider>
          <PupilCountProvider>
            <PupilClassProvider>
              <OriginalUsersProvider>
                <GendersProvider>
                  <ClassesProvider>
                    <AgeRangeProvider>
                      <TeacherCountProvider>
                      <ClassListProvider>
                        <LoginProvider>
                        <ThemeProvider>
                        <DecodeProvider>
                        <PositionProvider>
                          <App/>
                        </PositionProvider>
                        </DecodeProvider>
                        </ThemeProvider>
                        </LoginProvider>
                      </ClassListProvider>
                      </TeacherCountProvider>
                    </AgeRangeProvider>
                  </ClassesProvider>
                </GendersProvider>
              </OriginalUsersProvider>
            </PupilClassProvider>
          </PupilCountProvider>
        </PupilEmotionProvider>
      </TeacherProvider>
    </PupilProvider>
  </Router>
);

