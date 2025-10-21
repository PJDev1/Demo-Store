import { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // categorías únicas
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  }, [products]);

  // toggle checkbox
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) => {
      const copy = new Set(prev);
      if (copy.has(cat)) copy.delete(cat);
      else copy.add(cat);
      return copy;
    });
  };

  // limpiar filtros
  const clearFilters = () => {
    setSelectedCategories(new Set());
    setQuery("");
  };

  // aplicar filtros cuando cambian productos, categorías seleccionadas o búsqueda
  useEffect(() => {
    const q = query.trim().toLowerCase();

    const filtered = products.filter((p) => {
      // búsqueda por título o descripción
      if (q) {
        const inTitle = (p.title || p.name || "").toString().toLowerCase().includes(q);
        const inDesc = (p.description || "").toString().toLowerCase().includes(q);
        if (!inTitle && !inDesc) return false;
      }

      // categorias: si no hay ninguna seleccionada -> pasar (mostrar todo)
      if (selectedCategories.size > 0) {
        if (!selectedCategories.has(p.category)) return false;
      }

      return true;
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategories, query]);

  return (
    <div className="container-fluid my-5 text-white">
      <div className="row">
        {/* SIDEBAR: filtros con checkboxes */}
        <div className="col-md-2 mb-4">
          <div className={`p-4 rounded shadow`}>
            <h4 className="fw-bold mb-3 text-light">Filtros</h4>

            <label className="form-label small text-muted">Buscar</label>
            <input
              className="form-control mb-3"
              placeholder="Buscar producto..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="mb-2">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong className="text-light">Categorías</strong>
                {/* <button className="btn btn-sm btn-link text-decoration-none" onClick={() => setSelectedCategories(new Set())}>
                  Limpiar
                </button> */}
              </div>

              {categories.length === 0 && <div className="text-muted small">Cargando categorías...</div>}
              {categories.map((cat) => (
                <div className="form-check mb-1" key={cat}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`cat-${cat}`}
                    checked={selectedCategories.has(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <label className="form-check-label small" htmlFor={`cat-${cat}`}>
                    {cat}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-3 d-grid">
              <button className="btn btn-sm btn-outline-light" onClick={clearFilters}>
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="col-md-9 px-5 m-auto">
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Productos ({filteredProducts.length})</h4>
            <small className="text-muted">
              {selectedCategories.size > 0 ? `Filtrando: ${Array.from(selectedCategories).join(", ")}` : "Sin filtros"}
            </small>
          </div>

          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-center mt-5">No se encontraron productos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
