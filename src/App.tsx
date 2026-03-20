import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { OrderPage } from './pages/OrderPage';
import { BannerOrderPage } from './pages/BannerOrderPage';
import { YardSignOrderPage } from './pages/YardSignOrderPage';
import { WebsiteOrderPage } from './pages/WebsiteOrderPage';
import { SponsorPage } from './pages/SponsorPage';
import { ThankYouPage } from './pages/ThankYouPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="order/banners" element={<BannerOrderPage />} />
          <Route path="order/yard-signs" element={<YardSignOrderPage />} />
          <Route path="order/website" element={<WebsiteOrderPage />} />
          <Route path="sponsor" element={<SponsorPage />} />
          <Route path="thank-you" element={<ThankYouPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
