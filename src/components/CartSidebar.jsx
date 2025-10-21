import { useState } from "react";
import { useCart } from "../context/CartContext";
// Importamos un ícono para el botón de eliminación
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import FakeCheckout from "./FakeCheckout";

export default function CartSidebar() {
  const { cart, removeFromCart, isSidebarOpen, toggleSidebar } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleProceed = () => {
    setShowCheckout(true);
  };

  const handleComplete = () => {
    // Cierra modal y sidebar al completar (comportamiento de demo)
    setShowCheckout(false);
    if (isSidebarOpen) toggleSidebar();
    // Si quieres vaciar el carrito al completar, hazlo aquí usando alguna función del contexto (no la agregué porque no la pediste)
  };

  const handleCancel = () => {
    // Cierre inmediato del modal sin completar
    setShowCheckout(false);
  };

  return (
    <>
      <div
        className={`offcanvas offcanvas-end offcanvas-dark shadow-lg ${isSidebarOpen ? "show" : ""}`}
        style={{ visibility: isSidebarOpen ? "visible" : "hidden" }}
        data-bs-scroll="true"
        data-bs-backdrop="true"
      >
        <div className="offcanvas-header border-bottom border-secondary">
          <h5 className="offcanvas-title fw-bold text-light">
            <FaShoppingCart className="me-2 text-primary" />
            Tu Carrito
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={toggleSidebar}
            aria-label="Cerrar carrito"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column p-4">
          {cart.length === 0 && (
            <div className="text-center my-5 text-white-50">
              <FaShoppingCart className="display-4 mb-3" />
              <p className="fs-5">Tu carrito está vacío </p>
            </div>
          )}

          <div className="flex-grow-1 overflow-auto mb-4 sidebar-cart-items">
            {cart.map((item) => (
              <div key={item.id} className="d-flex align-items-center border-bottom border-secondary pb-3 mb-3 cart-item-list">
                <div className="cart-item-img-wrapper me-3 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="img-fluid rounded-3" />
                </div>

                <div className="flex-grow-1 text-light">
                  <p className="fw-semibold mb-1 text-truncate">{item.title}</p>
                  <div className="d-flex justify-content-between align-items-end">
                    <small className="text-white-50">Cant: {item.quantity}</small>
                    <p className="mb-0 text-success fw-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>

                <button
                  className="btn btn-sm btn-outline-danger ms-3 flex-shrink-0"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Eliminar ${item.title} del carrito`}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="mt-auto pt-3 border-top border-secondary">
              <div className="d-flex justify-content-between align-items-center mb-3 text-light">
                <span className="fs-5">Subtotal:</span>
                <span className="fs-5 fw-bold text-success">${total.toFixed(2)}</span>
              </div>

              <button className="btn btn-primary btn-lg w-100 fw-bold" onClick={handleProceed}>
                Proceder al Pago
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal FakeCheckout: mantiene los estilos de tu app */}
      {showCheckout && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4" style={{ background: "transparent", border: "none" }}>
              <FakeCheckout amount={total} onComplete={handleComplete} onCancel={handleCancel} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
