import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import CartSidebar from "./components/CartSidebar";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail"; 
import Products from "./components/Products";
import Footer from "./components/Footer";

/* ----------------- Feature (solo diseño) ----------------- */
function Feature({ iconClass, title, description }) {
  return (
    <div className="col-md-4 text-center mb-4">
      <div className="p-4 h-100 rounded-4 bg-gradient-to-br from-green-500 to-green-400 text-white shadow-lg">
        <i className={`bi ${iconClass} display-4 mb-3`}></i>
        <h5 className="fw-bold">{title}</h5>
        <p className="small">{description}</p>
      </div>
    </div>
  );
}

/* ----------------- HOME ----------------- */
function Home({ products }) {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* HERO / BANNER */}
      <header
        className="p-5 text-center shadow-lg"
        style={{
          backgroundImage: 'url("https://via.placeholder.com/1400x600?text=Tienda+Impactante")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 500,
        }}
      >
        <div className="mask d-flex justify-content-center align-items-center h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="text-white">
            <h1 className="display-3 fw-bolder mb-3">¡Fin de Semana de Ofertas!</h1>
            <h4 className="mb-4">Hasta <span className="text-warning">50% OFF</span> en productos seleccionados</h4>
            <a href="/products" className="btn btn-warning btn-lg fw-bold me-2">Explora Ahora</a>
            <a href="#features" className="btn btn-outline-light btn-lg">Qué ofrecemos</a>
          </div>
        </div>
      </header>

      {/* PRODUCTOS DESTACADOS */}
      <section id="products" className="container my-5">
        <h2 className="text-center mb-4 fw-bold text-light border-bottom pb-2">PRODUCTOS DESTACADOS</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE BENEFICIOS / FEATURES */}
      <section id="features" className="py-5" style={{ background: "linear-gradient(to bottom, #071029, #0b1224)" }}>
        <div className="container">
          <h2 className="text-center text-white fw-bold mb-5">¿Por qué comprar con nosotros?</h2>
          <div className="row g-4">
            <Feature
              iconClass="bi-truck"
              title="Envío Rápido y Seguro"
              description="Recibe tus productos en 24/48 horas sin costo adicional en pedidos mayores a $500."
            />
            <Feature
              iconClass="bi-patch-check"
              title="Calidad Garantizada"
              description="Solo ofrecemos productos probados y con garantía de satisfacción total."
            />
            <Feature
              iconClass="bi-headset"
              title="Soporte 24/7"
              description="Nuestro equipo de atención al cliente está siempre listo para ayudarte, ¡a cualquier hora!"
            />
          </div>
        </div>
      </section>

      {/* BANNERS DE CATEGORÍAS */}
      <section className="container my-5">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="p-4 rounded-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center shadow-lg" style={{ minHeight: 150 }}>
              <h4 className="fw-bold">Electrónica Destacada</h4>
              <p>Teléfonos, auriculares y gadgets con envío express.</p>
              <a href="/products" className="btn btn-outline-light">Ver electrónicos</a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-4 rounded-4 bg-gradient-to-r from-purple-600 to-purple-400 text-white text-center shadow-lg" style={{ minHeight: 150 }}>
              <h4 className="fw-bold">Moda y Accesorios</h4>
              <p>Curado por nuestro equipo: lo último en tendencia.</p>
              <a href="/products" className="btn btn-outline-light">Ver moda</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ----------------- APP ----------------- */
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <CartProvider>
      <Router>
        <Header />
        <CartSidebar />
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} />} />
          <Route path="/products" element={<Products products={products}/>}/>
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
