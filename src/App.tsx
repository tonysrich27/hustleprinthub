import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { OrderPage } from './pages/OrderPage';
import { BannerOrderPage } from './pages/BannerOrderPage';
import { YardSignOrderPage } from './pages/YardSignOrderPage';
import { FlyerOrderPage } from './pages/FlyerOrderPage';
import { TShirtOrderPage } from './pages/TShirtOrderPage';
import { CarMagnetOrderPage } from './pages/CarMagnetOrderPage';
import { DecalsOrderPage } from './pages/DecalsOrderPage';
import { CardOrderPage } from './pages/CardOrderPage';
import { VehicleWrapOrderPage } from './pages/VehicleWrapOrderPage';
import { WebsiteOrderPage } from './pages/WebsiteOrderPage';
import { SponsorPage } from './pages/SponsorPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { CategoryPage } from './pages/CategoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="order/banners" element={<BannerOrderPage />} />
          <Route path="order/yard-signs" element={<YardSignOrderPage />} />
          <Route path="order/flyers" element={<FlyerOrderPage />} />
          <Route path="order/t-shirts" element={<TShirtOrderPage />} />
          <Route path="order/car-magnets" element={<CarMagnetOrderPage />} />
          <Route path="order/decals" element={<DecalsOrderPage />} />
          <Route path="order/cards" element={<CardOrderPage />} />
          <Route path="order/vehicle-wraps" element={<VehicleWrapOrderPage />} />
          <Route path="order/website" element={<WebsiteOrderPage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="sponsor" element={<SponsorPage />} />
          <Route path="thank-you" element={<ThankYouPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
