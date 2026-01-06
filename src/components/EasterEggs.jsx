import React, { useEffect } from "react";
import soundEffects from "../utils/soundEffects";
import { useDevToolsOpen } from "../utils/useDevToolsOpen";
import NyanCat from "./NyanCat";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();

  useEffect(() => {
    if (!isDevToolsOpen) return;
    if (typeof console !== "undefined") {
      console.clear();

      console.log(
        "%c// SYSTEM_LOG: UNEXPECTED_ACCESS",
        "color: #888; font-family: 'Menlo', 'Consolas', monospace; font-size: 12px;"
      );
      console.log(
        "%cHold on a second... You weren't supposed to be in here. 👀",
        "color: #00BFFF; font-size: 22px; font-weight: bold; font-family: 'Arial', sans-serif;"
      );
      setTimeout(() => {
        console.clear();

        // --- The Hook: Presented as a system alert or a direct message. ---
        console.log(
          "%c// SYSTEM_LOG: UNEXPECTED_ACCESS",
          "color: #888; font-family: 'Menlo', 'Consolas', monospace; font-size: 12px;"
        );
        console.log(
          "%cHold on a second... You weren't supposed to be in here. 👀",
          "color: #00BFFF; font-size: 22px; font-weight: bold; font-family: 'Arial', sans-serif;"
        );

        const revealTimeout = setTimeout(() => {
          console.log(
            "%cOkay, fine. You found the secret passage. Curious minds get rewarded, right?\n" +
              "There's a hidden command to unlock this site's true potential.\n" +
              "The password is the name of the person who built this whole thing.",
            "background-color: #f4f4f4; color: #333; padding: 15px; border-left: 5px solid #00BFFF; line-height: 1.6; font-family: 'Arial', sans-serif; font-size: 15px;"
          );
          console.log(
            "%cReady for it? %cJust type my first name and press Enter.",
            "background-color: #f4f4f4; color: #333; padding: 15px; border-left: 5px solid #00BFFF; line-height: 1.6; font-family: 'Arial', sans-serif; font-size: 15px;",
            "color: #00BFFF; font-weight: bold; background-color: #e0e0e0; padding: 2px 6px; border-radius: 4px;"
          );
        }, 800);

        ["jayant", "Jayant", "JAYANT"].forEach((name) => {
          if (Object.hasOwn(window, name)) return;
          Object.defineProperty(window, name, {
            get() {
              clearTimeout(revealTimeout);
              console.clear();
              soundEffects.playMagic();

              console.log(
                "%c✨ UNLOCKED ✨\n\n%cWelcome, Admin. You now have the keys to the kingdom.",
                "color: #00BFFF; font-size: 32px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 191, 255, 0.5);",
                "color: #444; font-size: 16px; font-family: 'Arial', sans-serif;"
              );

              // ... inside the get() function for the Blueprint theme ...

              const warningTimeout = setTimeout(() => {
                // THE FIX: Use two separate console.log calls.
                console.log(
                  "%cJust be careful what you change in here...",
                  "background-color: #FFFBEA; color: #D97706; border-left: 5px solid #FBBF24; padding: 15px 15px 10px 15px; font-size: 16px; font-weight: bold; font-family: 'Arial', sans-serif; border-top-left-radius: 5px; border-top-right-radius: 5px;"
                );
                console.log(
                  "%c⚠️ You're not just editing a website anymore. You're editing my Portfolio.",
                  "background-color: #FFFBEA; color: #D97706; border-left: 5px solid #FBBF24; padding: 10px 15px 15px 15px; font-size: 16px; font-weight: bold; font-family: 'Arial', sans-serif; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"
                );
              }, 2500);

              // ... rest of the code
              window.__easterEggUnlocked = true;
              const catTimeout = setTimeout(() => {
                console.log(
                  "%cAlright, enough with the serious stuff! Want to see my secret project?\n" +
                    "It's a bit... flashy. And involves a cat.",
                  "background-color: #f4f4f4; color: #333; padding: 15px; border-left: 5px solid #9333EA; line-height: 1.6; font-family: 'Arial', sans-serif; font-size: 15px;"
                );
                console.log(
                  "%cIf you're ready for maximum rainbow power, %cjust press 'M' anywhere on the screen...",
                  "background-color: #f4f4f4; color: #333; padding: 15px; border-left: 5px solid #9333EA; line-height: 1.6; font-family: 'Arial', sans-serif; font-size: 15px; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;",
                  "color: #fff; background-color: #9333EA; font-weight: bold; padding: 4px 6px; border-radius: 4px;"
                );
              }, 5500);

              return "Initializing Admin Mode...";
            },
          });
        });
        if (!Object.hasOwn(window, "Bankai")) {
          Object.defineProperty(window, "Bankai", {
            get() {
              console.clear();
              console.log(
                "%c💥 BANKAI!%c Katen Kyokotsu: Karamatsu Shinju 🗡️",
                // Style for "BANKAI!"
                "color: #FF1D1D; background-color: #111; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 8px; border: 2px solid #550000; text-shadow: 0 0 10px red;",
                // Style for the technique name
                "color: #00E5FF; background-color: #1c2b3e; font-size: 18px; font-style: italic; padding: 8px 12px; border-radius: 8px; font-family: 'Georgia', serif;"
              );
              return undefined;
            },
          });
        }
      }, 3000);
    }
  }, [isDevToolsOpen]);

  return <NyanCat />;
};

export default EasterEggs;
