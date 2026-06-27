import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const PAYPAL_EMAIL = "ahmadpaypal124@gmail.com";

export function PayPalCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PAYPAL_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="paypal" className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-sakura-200 shadow-[0_4px_24px_rgba(255,77,141,0.06)]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003087] to-[#009cde] flex items-center justify-center text-white font-bold text-sm shadow-md">
            P
          </div>
          <div>
            <p className="font-semibold text-ink">PayPal</p>
            <p className="text-xs text-ink-muted">{PAYPAL_EMAIL}</p>
          </div>
        </div>
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sakura-100 text-sakura-700 font-medium text-sm hover:bg-sakura-200 transition-colors"
        >
          {copied ? (
            <>
              <Check size={16} /> Copied!
            </>
          ) : (
            <>
              <Copy size={16} /> Copy Email
            </>
          )}
        </motion.button>
        <a
          href={`https://paypal.me/${PAYPAL_EMAIL.split("@")[0]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center mt-2 text-xs text-sakura-500 hover:text-sakura-600 transition-colors"
        >
          Open PayPal.me →
        </a>
      </motion.div>
    </section>
  );
}
