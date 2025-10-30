import { ChangeEventHandler, MouseEventHandler, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Popup({ isOpen, onClose, onConfirm, inputValue, onInputChange }: {
  isOpen: boolean,
  onClose: MouseEventHandler,
  onConfirm: MouseEventHandler,
  inputValue: string,
  onInputChange: ChangeEventHandler,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: any) => {
      if (e.key === "Escape") onClose(e);
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-label="Popup"
            aria-modal="true"
            tabIndex={-1}
            className="relative w-full max-w-md mx-4 rounded-2xl bg-black-500 text-gray-100 shadow-2xl p-6 z-10 border border-gray-700"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.995 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Zamknij"
              className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Wprowadź dane</h3>

              <label className="block">
                <span className="sr-only">Pole tekstowe</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={onInputChange}
                  placeholder="Type aiego"
                  className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </label>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={onConfirm}
                  className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
