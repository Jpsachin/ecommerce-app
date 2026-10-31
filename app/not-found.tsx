import Link from "next/link";

export default function NotFound() {
  return (
    <div className="state-panel">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The product or page you’re looking for doesn’t exist.</p>
      <Link className="primary-button" href="/">Return home</Link>
    </div>
  );
}
