import { useState } from "react";

/**
 * The signature motif: a dot sending out expanding rings, standing in
 * for a sonar/echo pulse mapping a dark room — literally what the ECHO
 * system does with sound and visual landmarks for a user who can't see
 * the space around them. Used large on the title slide.
 */
export function EchoPing() {
  const [isActive, setIsActive] = useState(false);

  const triggerScan = () => {
    setIsActive(true);
    window.setTimeout(() => setIsActive(false), 1100);
  };

  return (
    <button
      type="button"
      className={`echo-ping ${isActive ? "is-active" : ""}`}
      aria-label="Trigger echo scan"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onClick={triggerScan}
    >
      <div className="ring" />
      <div className="ring" />
      <div className="ring" />
      <div className="core" />
      <span className="echo-ping-label">Tap to scan</span>
    </button>
  );
}
