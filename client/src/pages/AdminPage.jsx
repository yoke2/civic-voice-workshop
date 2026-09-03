import { useEffect, useState } from "react";
import { getFeedback } from "../api";

export function AdminPage({ user }) {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getFeedback(user).then((response) => setFeedback(response.feedback)).catch((requestError) => setError(requestError.message));
  }, [user]);

  const visibleFeedback = feedback.filter((item) => {
    const searchText = `${item.name} ${item.message}`.toLowerCase();
    return searchText.includes(query.trim().toLowerCase());
  });

  return (
    <main className="page-shell admin-shell">
      <div className="page-heading">
        <div className="eyebrow">Admin workspace</div>
        <h1>Feedback inbox</h1>
        <p>A simple view of feedback received from members of the public.</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      <section className="feedback-list">
        <div className="list-header"><strong>Latest feedback</strong><span>{visibleFeedback.length} items</span></div>
        <label className="search-field" htmlFor="feedback-search">
          Search feedback
          <input id="feedback-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names or messages" />
        </label>
        {visibleFeedback.map((item) => (
          <article className="feedback-row" key={item.id}>
            <div>
              <div className="feedback-meta">{item.name} · {new Date(item.createdAt).toLocaleDateString()}</div>
              <p>{item.message}</p>
            </div>
            <span className="status-pill">{item.status}</span>
          </article>
        ))}
        {!error && visibleFeedback.length === 0 && <p className="empty-state">No feedback matches your search.</p>}
      </section>
    </main>
  );
}
