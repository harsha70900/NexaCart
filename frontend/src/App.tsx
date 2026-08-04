import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

function App() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<ProductsPage />} />

        <Route
    path="/cart"
    element={
        <ProtectedRoute>
            <CartPage />
        </ProtectedRoute>
    }
/>


        <Route path="/login" element={<LoginPage />} />

        <Route path="/products/:id" element={<ProductDetailsPage/>} />

      </Route>

      <Route path="*" element={<NotFoundPage />} />

      <Route
    path="/checkout"
    element={
        <ProtectedRoute>
            <CheckoutPage />
        </ProtectedRoute>
    }

/>

<Route
    path="/orders"
    element={
        <ProtectedRoute>
            <MyOrdersPage />
        </ProtectedRoute>
    }
/>

<Route
    path="/order-success"
    element={
        <ProtectedRoute>
            <OrderSuccessPage />
        </ProtectedRoute>
    }
/>

<Route
    path="/orders/:orderId"
    element={
        <ProtectedRoute>
            <OrderDetailsPage />
        </ProtectedRoute>
    }
/>

    </Routes>
  );
}

export default App;