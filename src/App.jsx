import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import CartSidebar from "./components/CartSidebar";
import ProductCard from "./components/ProductCard";
import { Link } from "react-router-dom";
import ProductDetail from "./components/ProductDetail"; // nuevo componente
import Products from "./components/Products";

function Feature({ iconClass, title, description }){
  return (
    <div className="col-md-4 text-center mb-4">
      <i className={`bi ${iconClass} display-4 text-success mb-3`}></i> {/* Ícono de Bootstrap Icons */}
      <h5 className="fw-bold">{title}</h5>
      <p className="text-muted">{description}</p>
    </div>
  );
}

function Home({ products }) {

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* 1. SECCIÓN HERO / BANNER IMPACTANTE */}
      <header className="p-5 p-md-5 text-center bg-image shadow-1-strong"
        // Estilo en línea para un fondo más dinámico (puedes usar una imagen real)
        style={{ 
          backgroundImage: 'url("https://via.placeholder.com/1200x500?text=Banner+Impactante+de+Tienda")',
          height: '500px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)' // Capa semi-transparente
        }}>
        <div className="mask d-flex justify-content-center align-items-center h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="text-white">
            <h1 className="mb-3 display-3 fw-bolder">¡Descuentos de Fin de Semana!</h1>
            <h4 className="mb-4 lead">Encuentra los mejores productos de **Tecnología y Moda** con hasta un 50% OFF.</h4>
            {/* Usamos Link para navegación interna */}
            <Link to="/products" className="btn btn-warning btn-lg me-2 fw-bold pulse-animation" style={{ zIndex: 10 }}>
                Explora Ahora
            </Link>
          </div>
        </div>
      </header>

      {/* 2. SECCIÓN DE PRODUCTOS DESTACADOS */}
      <section id="products" className="container my-5">
        <h2 className="text-center mb-4 fw-light border-bottom pb-2 text-light">PRODUCTOS DESTACADOS</h2>
        
        {/* Usamos una cuadrícula de 4 columnas en desktop para mejor densidad */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="col">
              <ProductCard className="card-product" product={product} />
            </div>
          ))}
        </div>

        {/* Botón para ver más, solo si hay más de 6 productos */}
        {products.length > 6 && (
            <div className="text-center mt-5">
                <Link to="/all-products" className="btn btn-outline-light btn-lg">Ver Catálogo Completo</Link>
            </div>
        )}
      </section>
      
      {/* 3. SECCIÓN DE CARACTERÍSTICAS/INFO ADICIONAL MEJORADA */}
      <section className="info py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold text-success">¿Por qué Comprar con Nosotros?</h2>
          <div className="row">
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
    </div>
  );
}

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
      </Router>
    </CartProvider>
  );
}

export default App;
