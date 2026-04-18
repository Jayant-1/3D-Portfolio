import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all duration-300 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-3xl font-bold focus:outline-none"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
