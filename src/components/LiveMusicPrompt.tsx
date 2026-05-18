import { useEffect, useRef, useState } from "react";
import { Pause, Volume2, VolumeX, X } from "lucide-react";

const YOUTUBE_VIDEO_ID = "YmQ7jRgf4f0";

const LiveMusicPrompt = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [embedUrl, setEmbedUrl] = useState("");
  const [soundOn, setSoundOn] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    const origin = encodeURIComponent(window.location.origin);
    setEmbedUrl(
      `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&disablekb=1&enablejsapi=1&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&origin=${origin}`
    );
  }, []);

  useEffect(() => {
    const updateHeroState = () => {
      setInHero(window.scrollY < window.innerHeight * 0.9);
    };

    updateHeroState();
    window.addEventListener("scroll", updateHeroState, { passive: true });
    window.addEventListener("resize", updateHeroState);
    return () => {
      window.removeEventListener("scroll", updateHeroState);
      window.removeEventListener("resize", updateHeroState);
    };
  }, []);

  const sendCommand = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "https://www.youtube.com"
    );
  };

  const enableSound = () => {
    sendCommand("setVolume", [45]);
    sendCommand("unMute");
    sendCommand("playVideo");
    setSoundOn(true);
  };

  const muteSound = () => {
    sendCommand("mute");
    setSoundOn(false);
  };

  const pauseStream = () => {
    sendCommand("pauseVideo");
    setSoundOn(false);
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 h-px w-px overflow-hidden opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        {embedUrl && (
          <iframe
            ref={iframeRef}
            title="Yashovrat live background stream"
            src={embedUrl}
            allow="autoplay; encrypted-media"
            className="h-px w-px"
          />
        )}
      </div>

      {!dismissed && inHero && (
        <div className="fixed bottom-4 left-1/2 z-[90] w-[calc(100%-2rem)] max-w-[360px] -translate-x-1/2 md:bottom-8">
          <style>{`
            @media (max-width: 767px) {
              .music-prompt-shell {
                padding: clamp(0.5rem, 2.5vw, 0.625rem);
              }
              .music-prompt-row {
                gap: clamp(0.45rem, 2vw, 0.75rem);
              }
              .music-prompt-eyebrow {
                font-size: clamp(0.45rem, 2.15vw, 0.56rem);
                letter-spacing: clamp(0.12em, 0.8vw, 0.24em);
              }
              .music-prompt-copy {
                font-size: clamp(0.62rem, 2.8vw, 0.7rem);
                line-height: 1.05;
              }
              .music-prompt-action {
                height: clamp(2.25rem, 10.5vw, 2.5rem);
                padding-inline: clamp(0.55rem, 2.6vw, 0.75rem);
                gap: clamp(0.3rem, 1.6vw, 0.5rem);
                font-size: clamp(0.48rem, 2.1vw, 0.56rem);
                letter-spacing: clamp(0.1em, 0.55vw, 0.16em);
              }
              .music-prompt-action svg {
                width: clamp(0.7rem, 3.4vw, 0.875rem);
                height: clamp(0.7rem, 3.4vw, 0.875rem);
              }
              .music-prompt-close {
                width: clamp(2.25rem, 10.5vw, 2.5rem);
                height: clamp(2.25rem, 10.5vw, 2.5rem);
              }
              .music-prompt-close svg {
                width: clamp(0.7rem, 3.4vw, 0.875rem);
                height: clamp(0.7rem, 3.4vw, 0.875rem);
              }
            }
            @media (max-width: 340px) {
              .music-prompt-label {
                max-width: 6.7rem;
              }
            }
          `}</style>
          <div className="music-prompt-shell w-full border border-white/20 bg-black/80 px-3 py-2.5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:px-4 md:py-3">
            <div className="music-prompt-row flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="music-prompt-eyebrow font-sans text-[9px] font-black uppercase tracking-[0.24em] text-white/55 md:text-[10px]">
                  Live ambience
                </p>
                <p className="music-prompt-copy mt-0.5 font-sans text-[11px] font-bold leading-snug text-white md:text-xs">
                  Tap for sound.
                </p>
              </div>
              <button
                type="button"
                onClick={soundOn ? muteSound : enableSound}
                className="music-prompt-action flex h-10 shrink-0 items-center justify-center gap-2 border border-white bg-white px-3 font-sans text-[9px] font-black uppercase tracking-[0.16em] text-black transition-opacity duration-300 md:text-[10px]"
              >
                {soundOn ? <VolumeX size={14} strokeWidth={2.5} /> : <Volume2 size={14} strokeWidth={2.5} />}
                <span className="music-prompt-label whitespace-nowrap">{soundOn ? "Mute" : "Sound on"}</span>
              </button>
              <button
                type="button"
                onClick={soundOn ? pauseStream : () => setDismissed(true)}
                className="music-prompt-close flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-white transition-colors duration-300 hover:border-white"
                aria-label={soundOn ? "Pause background stream" : "Hide music prompt"}
              >
                {soundOn ? <Pause size={14} strokeWidth={2.5} /> : <X size={14} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveMusicPrompt;
