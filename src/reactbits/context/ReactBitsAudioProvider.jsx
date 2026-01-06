import React, { createContext, useCallback, useMemo, useState } from "react";
import soundEffects from "../../utils/soundEffects";

export const ReactBitsAudioContext = createContext({
  muted: false,
  volume: 0.5,
  play: () => {},
  toggleMute: () => {},
  setVolume: () => {},
});

const typeToSound = {
  notification: "notification",
  success: "notification",
  error: "notification",
  magic: "magic",
  click: "click",
};

const ReactBitsAudioProvider = ({ children }) => {
  const [muted, setMuted] = useState(soundEffects.isMuted);
  const [volume, setVolume] = useState(soundEffects.volume);

  const play = useCallback(
    (type = "notification") => {
      const soundName = typeToSound[type] ?? type;
      if (muted) return;
      soundEffects.setVolume(volume);
      soundEffects.play(soundName);
    },
    [muted, volume]
  );

  const toggleMute = useCallback(() => {
    const next = soundEffects.toggleMute();
    setMuted(next);
    return next;
  }, []);

  const updateVolume = useCallback((nextVolume) => {
    const safeVolume = Math.max(0, Math.min(1, nextVolume));
    soundEffects.setVolume(safeVolume);
    setVolume(soundEffects.volume);
  }, []);

  const value = useMemo(
    () => ({
      muted,
      volume,
      play,
      toggleMute,
      setVolume: updateVolume,
    }),
    [muted, play, updateVolume, volume]
  );

  return (
    <ReactBitsAudioContext.Provider value={value}>
      {children}
    </ReactBitsAudioContext.Provider>
  );
};

export default ReactBitsAudioProvider;
