"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="state-panel" role="alert">
      <h1>Something went wrong</h1>
      <p>We couldn’t load this shop content. Please try again.</p>
      <button className="primary-button" type="button" onClick={reset}>Try again</button>
    </div>
  );
}
