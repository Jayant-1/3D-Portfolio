import { BrowserRouter } from "react-router-dom";

import {
  About,
  Achievement,
  Contact,
  Feedbacks,
  Hero,
  Navbar,
  Preloader,
  StarsCanvas,
  Works,
} from "./components";
import EasterEggs from "./components/EasterEggs";
import ElasticCursor from "./components/ElasticCursor";
import SkillKeyboard from "./components/SkillKeyboard";
import ReactBitsAudioProvider from "./reactbits/context/ReactBitsAudioProvider";
import ReactBitsCursorProvider from "./reactbits/context/ReactBitsCursorProvider";

const App = () => {
  return (
    <ReactBitsCursorProvider>
      <ReactBitsAudioProvider>
        <Preloader>
          <BrowserRouter>
            <div
              className="relative z-0"
              style={{ backgroundColor: "hsl(222.2 84% 4.9%)" }}
            >
              <ElasticCursor />
              <EasterEggs />
              <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Navbar />
                <Hero />
              </div>
              <StarsCanvas />
              <About />
              <Works />
              <Achievement />
              <SkillKeyboard />
              <Feedbacks />
              <div className="relative z-0">
                <Contact />
              </div>
            </div>
          </BrowserRouter>
        </Preloader>
      </ReactBitsAudioProvider>
    </ReactBitsCursorProvider>
  );
};

export default App;
