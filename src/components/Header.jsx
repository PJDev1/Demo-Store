import { useMemo, useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaUser, FaHome, FaBoxOpen, FaBars } from "react-icons/fa";
import { Link } from "react-router";

export default function Header() {
  const { cart, toggleSidebar } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para menú móvil

  const numberItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = `
    navbar navbar-expand-lg sticky-top 
    text-white 
    ${isScrolled ? "bg-dark shadow-lg" : "bg-transparent"} 
    header-transition
  `;

  const navLinks = [
    { name: "Inicio", path: "/", icon: FaHome },
    { name: "Productos", path: "/products", icon: FaBoxOpen },
  ];

  return (
    <header className={headerClasses}>
      <div className="container-fluid px-4 d-flex align-items-center justify-content-between">

        {/* Marca/Logo */}
        <a className="navbar-brand fw-bold text-light" href="/">
          Mi Tienda
        </a>

        <button
          className="navbar-toggler btn border-0 text-white"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars size={24} />
        </button>

        {/* Menú */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.name}>
                <Link className="nav-link text-light" href={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Controles usuario y carrito */}
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-light border-0 position-relative me-3"
              onClick={toggleSidebar}
              aria-label={`Ver carrito. Tienes ${numberItems} artículos.`}
            >
              <FaShoppingCart className="fs-5" />
              {numberItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {numberItems}
                  <span className="visually-hidden">artículos en el carrito</span>
                </span>
              )}
            </button>

            <button className="btn btn-outline-light border-0" aria-label="Ver perfil de usuario">
              <FaUser className="fs-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
