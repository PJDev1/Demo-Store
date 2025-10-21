import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import CartSidebar from "./components/CartSidebar";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail"; 
import Products from "./components/Products";
import Footer from "./components/Footer";
import { FaTruck, FaCheckCircle, FaHeadset, FaRedo, FaLock, FaGift } from "react-icons/fa";
import { Link } from "react-router-dom";


function Feature({ Icon, title, description }) {
  return (
    <div className="col-md-4 text-center mb-4">
      <div className="p-4 bg-white rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-start">
        <Icon className="text-success mb-3" size={48} /> {/* Icono React Icons */}
        <h5 className="fw-bold">{title}</h5>
        <p className="text-muted">{description}</p>
      </div>
    </div>
  );
}

function Home({ products }) {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <header className="p-5 p-md-5 text-center bg-image shadow-1-strong"
        style={{ 
          backgroundImage: 'url("https://via.placeholder.com/1200x500?text=Banner+Impactante+de+Tienda")',
          height: '500px',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <div className="mask d-flex justify-content-center align-items-center h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="text-white">
            <h1 className="mb-3 display-3 fw-bolder">¡Descuentos de Fin de Semana!</h1>
            <h4 className="mb-4 lead">Encuentra los mejores productos de Tecnología y Moda con hasta un 50% OFF.</h4>
            <Link to="/products" className="btn btn-warning btn-lg me-2 fw-bold pulse-animation">
                Explora Ahora
            </Link>
          </div>
        </div>
      </header>

      {/* Productos Destacados */}
      <section id="products" className="container my-5">
        <h2 className="text-center mb-4 fw-light border-bottom pb-2 text-light">PRODUCTOS DESTACADOS</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="col">
              <ProductCard className="card-product" product={product} />
            </div>
          ))}
        </div>
        {products.length > 6 && (
          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-outline-light btn-lg">Ver Catálogo Completo</Link>
          </div>
        )}
      </section>

      {/* Características / Info */}
      <section className="info py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold text-success">¿Por qué Comprar con Nosotros?</h2>
          <div className="row g-4">
            <Feature 
              Icon={FaTruck} 
              title="Envío Rápido y Seguro" 
              description="Recibe tus productos en 24/48 horas sin costo adicional en pedidos mayores a $500."
            />
            <Feature 
              Icon={FaCheckCircle} 
              title="Calidad Garantizada" 
              description="Solo ofrecemos productos probados y con garantía de satisfacción total."
            />
            <Feature 
              Icon={FaHeadset} 
              title="Soporte 24/7" 
              description="Nuestro equipo de atención al cliente está siempre listo para ayudarte, ¡a cualquier hora!"
            />
            <Feature 
              Icon={FaRedo} 
              title="Devoluciones Fácil" 
              description="Cambios y devoluciones simples y sin complicaciones en 30 días."
            />
            <Feature 
              Icon={FaLock} 
              title="Pago Seguro" 
              description="Tus pagos están protegidos con cifrado y sistemas de seguridad líderes."
            />
            <Feature 
              Icon={FaGift} 
              title="Promociones Exclusivas" 
              description="Accede a ofertas especiales y descuentos solo para nuestros clientes."
            />
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
