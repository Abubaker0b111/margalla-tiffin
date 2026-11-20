import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DataGate from './components/DataGate.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ConfirmationPage from './pages/ConfirmationPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MealDetailsPage from './pages/MealDetailsPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  // Start each new page at the top.
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* These routes need the menu data, so DataGate shows loading/error first */}
          <Route element={<DataGate />}>
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/meals/:id" element={<MealDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
