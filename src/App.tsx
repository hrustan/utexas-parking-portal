import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { PermitsPage } from './pages/PermitsPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { CitationsPage } from './pages/CitationsPage';
import { AccountPage } from './pages/AccountPage';
import { PurchaseFlowPage } from './pages/purchase/PurchaseFlowPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="permits" element={<PermitsPage />} />
        <Route path="permits/new" element={<PurchaseFlowPage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="citations" element={<CitationsPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
