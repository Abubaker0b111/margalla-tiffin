import { Link } from 'react-router-dom';
import FeeBanner from '../components/FeeBanner.jsx';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Fresh student meals, prepped in Islamabad</h1>
          <p className="hero-text">
            Individual meals and weekly bundles for university students living in H-11, H-12, G-11 and I-8.
            Collect from our kitchen counter or get it delivered.
          </p>
          <Link className="btn btn-primary btn-large" to="/menu">
            Browse the menu
          </Link>
        </div>
      </section>

      <section className="container section">
        <h2>How it works</h2>
        <ol className="steps">
          <li><strong>Pick your meals.</strong> Search, filter, and compare calories, spice, and stock.</li>
          <li><strong>Check the summary.</strong> See the delivery fee and minimum order before you commit.</li>
          <li><strong>Place your order.</strong> Fill in a short form and get a confirmation.</li>
        </ol>
      </section>

      <section className="container section">
        <FeeBanner />
      </section>
    </>
  );
}
