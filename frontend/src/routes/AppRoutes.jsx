import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProtectedRoute, { PublicOnlyRoute } from '../components/ProtectedRoute';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import GigDetails from '../pages/GigDetails';
import Dashboard from '../pages/Dashboard';
import Explore from '../pages/Explore';
import PostGig from '../pages/PostGig';
import Profile from '../pages/Profile';
import HowItWorks from '../pages/HowItWorks';
import Settings from '../pages/Settings';
import Applications from '../pages/Applications';
import ContractSigning from '../pages/ContractSigning';
import ActiveContract from '../pages/ActiveContract';
import SubmitWork from '../pages/SubmitWork';
import ReviewDeliverables from '../pages/ReviewDeliverables';
import Notifications from '../pages/Notifications';
import Messages from '../pages/Messages';
import Payments from '../pages/Payments';
import EscrowPayment from '../pages/EscrowPayment';

const AppRoutes = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/explore" element={<Layout><Explore /></Layout>} />
      <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
      <Route path="/gigs/:id" element={<Layout><GigDetails /></Layout>} />
      
      {/* Auth route - redirect to dashboard if already logged in */}
      <Route path="/auth" element={
        <Layout>
          <PublicOnlyRoute>
            <Auth />
          </PublicOnlyRoute>
        </Layout>
      } />
      
      {/* Protected routes - require login */}
      <Route path="/dashboard" element={
        <Layout>
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/post-gig" element={
        <Layout>
          <ProtectedRoute>
            <PostGig />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/profile" element={
        <Layout>
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/profile/:userId" element={
        <Layout>
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/settings" element={
        <Layout>
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/applications/:gigId" element={
        <Layout>
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/escrow/:applicationId" element={
        <Layout>
          <ProtectedRoute>
            <EscrowPayment />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/contract/:contractId" element={
        <Layout>
          <ProtectedRoute>
            <ContractSigning />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/contracts/:contractId" element={
        <Layout>
          <ProtectedRoute>
            <ActiveContract />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/submit/:contractId/:phaseId" element={
        <Layout>
          <ProtectedRoute>
            <SubmitWork />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/review/:contractId/:phaseId" element={
        <Layout>
          <ProtectedRoute>
            <ReviewDeliverables />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/notifications" element={
        <Layout>
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/messages" element={
        <Layout>
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        </Layout>
      } />
      
      <Route path="/payments" element={
        <Layout>
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        </Layout>
      } />
    </Routes>
  );
};

export default AppRoutes;