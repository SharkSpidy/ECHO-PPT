/**
 * The signature motif: a dot sending out expanding rings, standing in
 * for a sonar/echo pulse mapping a dark room — literally what the ECHO
 * system does with sound and visual landmarks for a user who can't see
 * the space around them. Used large on the title slide.
 */
export function EchoPing() {
  return (
    <div className="echo-ping" aria-hidden="true">
      <div className="ring" />
      <div className="ring" />
      <div className="ring" />
      <div className="core" />
    </div>
  );
}
