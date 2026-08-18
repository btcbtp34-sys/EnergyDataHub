import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CopilotFAB() {
  const { setIsCopilotOpen } = useTheme();

  return (
    <button className="copilot-fab" onClick={() => setIsCopilotOpen((prev) => !prev)} title="BTC Energy AI">
      <dotlottie-wc
        src="https://lottie.host/54025fb2-c33e-461e-9263-c236f7c99cfd/QXnxthIE1F.json"
        style={{ width: '64px', height: '64px', pointerEvents: 'none' }}
        autoplay
        loop
      ></dotlottie-wc>
      <span className="fab-badge"></span>
    </button>
  );
}
