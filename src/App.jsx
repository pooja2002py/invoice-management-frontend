import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Clients
import ClientList from "./pages/clients/ClientList";
import ClientForm from "./pages/clients/ClientForm";
import ClientView from "./pages/clients/ClientView";

// Invoices
import InvoiceList from "./pages/invoices/InvoiceList";
import InvoiceForm from "./pages/invoices/InvoiceForm";
import InvoiceView from "./pages/invoices/InvoiceView";
import InvoicePreview from "./pages/invoices/InvoicePreview";

// Quotes
import QuoteList from "./pages/quotes/QuoteList";
import QuoteForm from "./pages/quotes/QuoteForm";
import QuoteView from "./pages/quotes/QuoteView";
import Signup from "./pages/Signup";

// Payments
import PaymentList from "./pages/payments/PaymentList";

// Settings
import Settings from "./pages/settings/Settings";


// Protected Route
function Protected({ children }) {
  const isAuthenticated = localStorage.getItem("access");

  return isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" replace />
  );
}


// Main App
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />

        {/* Clients */}
        <Route
          path="/clients"
          element={
            <Protected>
              <ClientList />
            </Protected>
          }
        />

        <Route
          path="/clients/new"
          element={
            <Protected>
              <ClientForm />
            </Protected>
          }
        />

        <Route
          path="/clients/:id"
          element={
            <Protected>
              <ClientView />
            </Protected>
          }
        />

        {/* Invoices */}
        <Route
          path="/invoices"
          element={
            <Protected>
              <InvoiceList />
            </Protected>
          }
        />

        <Route
          path="/invoices/new"
          element={
            <Protected>
              <InvoiceForm />
            </Protected>
          }
        />

        <Route
          path="/invoices/:id"
          element={
            <Protected>
              <InvoiceView />
            </Protected>
          }
        />

        <Route
          path="/invoices/:id/edit"
          element={
            <Protected>
              <InvoiceForm />
            </Protected>
          }
        />

        <Route
          path="/invoices/:id/preview"
          element={
            <Protected>
              <InvoicePreview />
            </Protected>
          }
        />

        {/* Quotes */}
        <Route
          path="/quotes"
          element={
            <Protected>
              <QuoteList />
            </Protected>
          }
        />

        <Route
          path="/quotes/new"
          element={
            <Protected>
              <QuoteForm />
            </Protected>
          }
        />

        <Route
          path="/quotes/:id/edit"
          element={
            <Protected>
              <QuoteForm />
            </Protected>
          }
        />

        <Route
          path="/quotes/:id"
          element={
            <Protected>
              <QuoteView />
            </Protected>
          }
        />

        {/* Payments */}
        <Route
          path="/payments"
          element={
            <Protected>
              <PaymentList />
            </Protected>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <Protected>
              <Settings />
            </Protected>
          }
        />

        {/* Invalid Route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}