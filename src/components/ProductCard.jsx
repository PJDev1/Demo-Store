import { useCart } from "../context/CartContext";
import {
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { Link } from "react-router";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const stars = generateStars(product.rating);
    
  return (
    // 1. Clases para Dark Mode y efecto Hover (ver CSS)
    <div className="card product-card-dark h-100 shadow-lg border-0 card-hover-effect">
      {/* 2. Wrapper para la Imagen (fondo claro para contraste) */}
      <div
        className="card-image-wrapper overflow-hidden d-flex align-items-center justify-content-center"
        style={{ height: "200px", backgroundColor: "transparent" }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-100 h-100 object-fit-contain product-card-image"
          style={{ backgroundColor: "transparent" }}
        />
      </div>

      <div className="card-body d-flex flex-column p-3">
        {" "}
        {/* 3. Reducimos padding */}
        {/* Título truncado y texto claro */}
        <h5
          className="card-title text-light fw-bold text-truncate"
          title={product.title}
        >
          {product.title}
        </h5>
        {/* Precio - Destacado */}
        <p className="text-success fw-bolder fs-5 mb-1">
          ${product.price.toFixed(2)}
        </p>
        {/* Descripción - Texto sutil y acortado (si el CSS lo permite) */}
        <p className="card-text text-white-50 product-description-clamp">
          {product.description}
        </p>
        {/* Rating - Colocado entre el texto y el botón */}
        <div className="d-flex align-items-center mb-3 mt-auto">
          {stars.map((star, idx) => (
            <span key={idx}>{star}</span>
          ))}{" "}
          <small className="text-white-50 ms-2">
            ({product.reviews || 0} reseñas)
          </small>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-primary fw-bold flex-grow-1 me-2"
          >
            Ver detalle
          </Link>
          <button
            className="btn btn-outline-light flex-grow-1 d-flex align-items-center justify-content-center"
            onClick={() => addToCart({ ...product, quantity: 1 })}
          >
            <FaShoppingCart className="me-2" />+ Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

// Función sin cambios
function generateStars(rating) {
  const stars = [];
  let fullStars = Math.floor(rating);
  let halfStar = rating - fullStars >= 0.5;
  let emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) stars.push(<FaStar color="#ffc107" />);
  if (halfStar) stars.push(<FaStarHalfAlt color="#ffc107" />);
  for (let i = 0; i < emptyStars; i++)
    stars.push(<FaRegStar color="#ffc107" />);

  return stars;
}
