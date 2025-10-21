import React, { useState, useRef, useEffect } from "react";
import {
  FaCreditCard,
  FaLock,
  FaCheckCircle,
  FaSpinner,
  FaRegCreditCard,
  FaPaypal,
  FaApplePay,
} from "react-icons/fa";

const cardPlaceholder = "4242 42XX XXXX 4242";

export default function FakeCheckout({ amount = 0, onComplete, onCancel }) {
  const [step, setStep] = useState(0); // 0: selección, 1: procesando, 2: completado
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);

  // refs para timers para limpiar si se desmonta o se cancela
  const processingTimerRef = useRef(null);
  const finalizeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (processingTimerRef.current) clearTimeout(processingTimerRef.current);
      if (finalizeTimerRef.current) clearTimeout(finalizeTimerRef.current);
    };
  }, []);

  const handlePay = () => {
    if (isLoading) return;
    setIsLoading(true);
    setStep(1);

    // Simula "procesamiento"
    processingTimerRef.current = setTimeout(() => {
      processingTimerRef.current = null;
      setIsLoading(false);
      setStep(2);

      // Mostramos la pantalla de completado unos 1500ms antes de avisar al padre
      finalizeTimerRef.current = setTimeout(() => {
        finalizeTimerRef.current = null;
      }, 1500);
    }, 2000); // duración del procesamiento (ajustable)
  };

  const handleCancel = () => {
    // limpiar timers y notificar cierre inmediato
    if (processingTimerRef.current) {
      clearTimeout(processingTimerRef.current);
      processingTimerRef.current = null;
    }
    if (finalizeTimerRef.current) {
      clearTimeout(finalizeTimerRef.current);
      finalizeTimerRef.current = null;
    }
    if (typeof onCancel === "function") onCancel();
  };

  const paymentMethods = [
    { id: "card", name: "Tarjeta de Crédito / Débito", icon: FaRegCreditCard },
    { id: "paypal", name: "PayPal", icon: FaPaypal, disabled: false },
    { id: "applepay", name: "Apple Pay", icon: FaApplePay, disabled: false },
  ];

  const breakdown = {
    subtotal: amount * 0.95,
    shipping: amount * 0.05,
    total: amount,
  };

  // estilos compactos — los podes adaptar a tus clases si preferís
  const base = {
    container: {
      padding: "1.5rem",
      minWidth: 320,
      maxWidth: 480,
      background: "#1A202C",
      color: "#f7fafc",
      borderRadius: 12,
      position: "relative",
      textAlign: "center",
    },
    closeButton: {
      position: "absolute",
      top: 10,
      right: 10,
      background: "none",
      border: "none",
      color: "#a0aec0",
      cursor: "pointer",
      fontSize: 20,
    },
    input: {
      width: "100%",
      padding: "0.65rem 0.65rem 0.65rem 40px",
      borderRadius: 8,
      border: "1px solid #4A5568",
      background: "#2D3748",
      color: "#f7fafc",
    },
    methodBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "0.55rem",
      borderRadius: 8,
      border: "1px solid #4A5568",
      marginBottom: 8,
      background: "transparent",
      color: "#CBD5E0",
      cursor: "pointer",
    },
    methodSelected: {
      borderColor: "#4299e1",
      boxShadow: "0 0 6px rgba(66,153,225,0.15)",
    },
    payBtn: (disabled) => ({
      width: "100%",
      padding: "0.75rem",
      borderRadius: 8,
      border: "none",
      background: disabled ? "#6b9fc6" : "#3182ce",
      color: "#fff",
      cursor: disabled ? "not-allowed" : "pointer",
      fontWeight: 700,
    }),
  };

  return (
    <div style={base.container} role="dialog" aria-modal="true">
      {onCancel && (
        <button
          aria-label="Cerrar"
          style={base.closeButton}
          onClick={handleCancel}
        >
          &times;
        </button>
      )}

      <h3 style={{ color: "#63b3ed", marginBottom: 6 }}>Finalizar Compra</h3>
      <p style={{ color: "#a0aec0", marginBottom: 12 }}>
        {step === 0
          ? "Selecciona método y confirma."
          : step === 1
          ? "Procesando pago..."
          : "Transacción completada."}
      </p>

      {/* STEP 0 - Selección */}
      {step === 0 && (
        <>
          <div style={{ marginBottom: 12 }}>
            {paymentMethods.map((m) => {
              const Icon = m.icon;
              const selected = paymentMethod === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => !m.disabled && setPaymentMethod(m.id)}
                  disabled={m.disabled}
                  style={{
                    ...base.methodBtn,
                    ...(selected ? base.methodSelected : {}),
                    ...(m.disabled
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : {}),
                  }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Icon size={18} color={selected ? "#63b3ed" : "#718096"} />
                    <span style={{ fontWeight: 600 }}>{m.name}</span>
                  </span>
                  {selected && <FaCheckCircle color="#48bb78" />}
                </button>
              );
            })}
          </div>

          {paymentMethod === "card" && (
            <>
              <div style={{ marginBottom: 10 }}>
                <input style={base.input} readOnly value={cardPlaceholder} />
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <input
                  style={{ ...base.input, flex: 1 }}
                  readOnly
                  value="12 / 27"
                />
                <input
                  style={{ ...base.input, flex: 1 }}
                  readOnly
                  value="***"
                />
              </div>
            </>
          )}

          <div
            style={{
              textAlign: "left",
              background: "#2D3748",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#CBD5E0",
              }}
            >
              <span>Subtotal</span>
              <span>${breakdown.subtotal.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#CBD5E0",
              }}
            >
              <span>Envío</span>
              <span>${breakdown.shipping.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid #4A5568",
                paddingTop: 8,
                marginTop: 8,
              }}
            >
              <strong>Total</strong>
              <strong style={{ color: "#63b3ed" }}>
                ${breakdown.total.toFixed(2)}
              </strong>
            </div>
          </div>

          <button
            style={base.payBtn(isLoading || paymentMethod !== "card")}
            onClick={handlePay}
            disabled={isLoading || paymentMethod !== "card"}
          >
            {isLoading ? (
              <>
                <FaSpinner className="spin" style={{ marginRight: 8 }} />
                Procesando...
              </>
            ) : (
              `Pagar con Tarjeta $${breakdown.total.toFixed(2)}`
            )}
          </button>

          <small style={{ display: "block", marginTop: 10, color: "#718096" }}>
            <FaLock style={{ marginRight: 6 }} /> Su información está segura.
            (Demo)
          </small>
        </>
      )}

      {/* STEP 1 - Procesando */}
      {step === 1 && (
        <div style={{ paddingTop: 18, paddingBottom: 18 }}>
          <FaSpinner size={44} className="spin" color="#63b3ed" />
          <p style={{ marginTop: 14, color: "#63b3ed", fontWeight: 700 }}>
            Verificando y procesando...
          </p>
          <p style={{ color: "#718096" }}>Esto puede tomar unos segundos.</p>
        </div>
      )}

      {/* STEP 2 - Completado */}
      {step === 2 && (
        <div style={{ paddingTop: 18 }}>
          <FaCheckCircle size={64} color="#48bb78" />
          <p style={{ marginTop: 12, fontWeight: 700 }}>
            ¡Transacción Exitosa! 🎉
          </p>
          <p style={{ color: "#CBD5E0" }}>
            Tu pago de ${breakdown.total.toFixed(2)} ha sido confirmado.
          </p>
          <div style={{ marginTop: 14 }}>
            <button
              style={{
                ...base.payBtn(false),
                width: "auto",
                padding: "0.6rem 1.6rem",
                background: "#38A169",
              }}
              onClick={handleCancel}
            >
              Volver a la Tienda
            </button>
          </div>
        </div>
      )}

      <style>{`
        .spin { animation: spin 1.8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
