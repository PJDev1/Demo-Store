import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaCreditCard,
} from "react-icons/fa";
import FakeCheckout from "./FakeCheckout";

export default function ProductDetail({ products = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false); // <-- false por defecto

  useEffect(() => {
    const found = products.find((p) => p.id.toString() === id);
    setLoading(true);
    const t = setTimeout(() => {
      setProduct(found || null);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, [id, products]);

  if (loading) {
    return (
      <div className="spinner-container text-white d-flex align-items-center" style={{ minHeight: "40vh" }}>
        <div className="spinner-border text-primary me-3" role="status" />
        <span>Cargando detalles del producto...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <p className="text-white fs-4">Lo sentimos, el producto no fue encontrado.</p>
        <button className="btn btn-outline-primary mt-3" onClick={() => navigate("/")}>Volver a la tienda</button>
      </div>
    );
  }

  const {
    title = product.name || "Producto",
    category = product.category || "",
    price = product.price || 0,
    description = product.description || "",
    image = product.image || "",
    rating = product.rating || { rate: 0, count: 0 },
  } = product;

  return (
    <div className="container my-5 text-white">
      <div className="row g-5">
        <div className="col-md-6 d-flex align-items-start justify-content-center">
          <div className="image-wrapper-integrated rounded shadow-lg p-3" style={{ background: "#071029" }}>
            <img src={image} alt={title} className="img-fluid rounded-3 product-image-max" style={{ maxHeight: 520, objectFit: "contain" }} />
          </div>
        </div>

        <div className="col-md-6">
          <p className="text-primary fw-bold text-uppercase mb-1">{category}</p>
          <h1 className="display-5 fw-bold mb-3">{title}</h1>

          <div className="d-flex align-items-center mb-4">
            <span className="me-3" aria-hidden><Stars rate={Number(rating.rate || 0)} /></span>
            <span className="text-light fw-semibold">{Number(rating.rate || 0).toFixed(1)} · {rating.count || 0} reseñas</span>
          </div>

          <div className="d-flex align-items-baseline mb-4">
            <h2 className="text-success fw-bolder me-3">${Number(price).toFixed(2)}</h2>
            <span className="text-light text-decoration-line-through">${(Number(price) * 1.2).toFixed(2)}</span>
          </div>

          <p className="lead text-white-50 mb-4">{description}</p>

          <div className="d-grid gap-3 d-sm-flex">
            <button className="btn btn-warning btn-lg fw-bold" onClick={() => setShowCheckout(true)}>
              <FaCreditCard className="me-2" />
              Comprar Ahora
            </button>

            <button className="btn btn-outline-light btn-lg" onClick={() => addToCart({ ...product, quantity: 1 })}>
              <FaShoppingCart className="me-2" />
              Agregar al Carrito
            </button>
          </div>

          <small className="d-block mt-4 text-white-50">Envío gratis en pedidos mayores a $50.</small>

          {showCheckout && (
            <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.7)" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-4" style={{ background: "transparent", border: "none" }}>
                  <FakeCheckout
                    amount={price}
                    onComplete={() => setShowCheckout(false)}
                    onCancel={() => setShowCheckout(false)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Stars (sin cambios) */
function Stars({ rate = 0 }) {
  const full = Math.floor(rate);
  const hasHalf = rate - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  const nodes = [];

  for (let i = 0; i < full; i++) nodes.push(<FaStar key={`f-${i}`} className="me-1 text-warning" />);
  if (hasHalf) nodes.push(<FaStarHalfAlt key="half" className="me-1 text-warning" />);
  for (let i = 0; i < empty; i++) nodes.push(<FaRegStar key={`e-${i}`} className="me-1 text-warning" />);

  return <>{nodes}</>;
}
