import { useEffect, useRef, useState } from "react";
import { submitFeedback } from "../api";

export function CitizenPage({ user }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const successRef = useRef(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (message.length > 500) {
      setError("Feedback must be 500 characters or fewer.");
      return;
    }
    try {
      await submitFeedback({ nric: user.nric, name: user.name, message });
      setSubmitted(true);
      setMessage("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function startAnotherSubmission() {
    setSubmitted(false);
    setError("");
    setMessage("");
  }

  return (
    <main className="page-shell">
      <div className="page-heading">
        <div className="eyebrow">Public feedback</div>
        <h1>What would you like us to know?</h1>
        <p>Tell us about an issue, an idea, or a positive experience in your community.</p>
      </div>
      <section className="form-card">
        {submitted ? (
          <div className="confirmation-panel">
            <div className="success-banner" role="status" tabIndex="-1" ref={successRef}>Thank you. Your feedback has been received.</div>
            <p className="muted">You can share another piece of feedback whenever you are ready.</p>
            <button className="primary-button" type="button" onClick={startAnotherSubmission}>Submit another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="feedback-message">Your feedback</label>
            <textarea id="feedback-message" rows="7" value={message} maxLength="500" onChange={(event) => setMessage(event.target.value.slice(0, 500))} placeholder="Share your feedback here..." aria-describedby="feedback-guidance" aria-invalid={Boolean(error)} />
            <div className="form-footer">
              <div><div className="character-count">{message.length}/500 characters</div><span className="muted" id="feedback-guidance">Please do not include sensitive personal information.</span></div>
              <button className="primary-button">Submit feedback</button>
            </div>
            {error && <p className="error-message" role="alert">{error}</p>}
          </form>
        )}
      </section>
    </main>
  );
}
