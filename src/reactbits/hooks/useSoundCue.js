import { useContext, useMemo } from "react";
import { ReactBitsAudioContext } from "../context/ReactBitsAudioProvider";

const useSoundCue = (defaultType = "notification") => {
  const audio = useContext(ReactBitsAudioContext);

  const play = useMemo(
    () =>
      (type = defaultType) => {
        audio.play(type);
      },
    [audio, defaultType]
  );

  return {
    muted: audio.muted,
    volume: audio.volume,
    play,
    toggleMute: audio.toggleMute,
    setVolume: audio.setVolume,
  };
};

export default useSoundCue;
