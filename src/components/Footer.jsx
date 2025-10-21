import { Link } from "react-router";

function Footer() {
    return (
      <footer className="bg-dark text-white pt-5 pb-3 mt-5">
        <div className="container">
          <div className="row">
  
            {/* Column 1: Sobre la tienda */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">Mi Tienda</h5>
              <p className="small text-muted">
                La mejor tienda online de tecnología, moda y gadgets. Ofrecemos productos con garantía y envío rápido.
              </p>
            </div>
  
            {/* Column 2: Enlaces rápidos */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">Enlaces Rápidos</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-white text-decoration-none">Inicio</Link></li>
                <li><Link to="/products" className="text-white text-decoration-none">Productos</Link></li>
              </ul>
            </div>
  
            {/* Column 3: Redes Sociales */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">Síguenos</h5>
              <div className="d-flex gap-3 mt-2">
                <a href="#" className="text-white fs-4"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white fs-4"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white fs-4"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white fs-4"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
  
          </div>
  
          {/* Línea de copyright */}
          <div className="text-center pt-3 mt-3 border-top border-secondary small">
            &copy; {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    );
}
  
  export default Footer;
  