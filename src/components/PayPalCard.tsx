import { motion } from "framer-motion";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";

const PAYPAL_URL = "https://paypal.me/Ahmad700791";
const PAYPAL_DISPLAY = "paypal.me/Ahmad700791";

export function PayPalCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PAYPAL_URL).then(() => {
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
        whileHover={{ y: -4 }}
        className="max-w-md mx-auto bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-sakura-200 shadow-[0_4px_24px_rgba(255,77,141,0.06)] hover:shadow-[0_8px_30px_rgba(255,77,141,0.18)] hover:border-sakura-400 transition-all"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003087] to-[#009cde] flex items-center justify-center text-white font-bold text-sm shadow-md">
            P
          </div>
          <div className="flex-1">
            <p className="font-semibold text-ink">PayPal</p>
            <p className="text-xs text-ink-muted">{PAYPAL_DISPLAY}</p>
          </div>
        </div>

        <motion.p
          whileHover={{ scale: 1.01 }}
          className="font-mono text-xs text-ink-muted bg-sakura-50 rounded-lg px-3 py-2.5 border border-sakura-100 mb-3 text-center"
        >
          {PAYPAL_DISPLAY}
        </motion.p>

        <div className="grid grid-cols-2 gap-2">
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-sakura-100 text-sakura-700 font-medium text-xs hover:bg-sakura-200 transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} /> Copied!
              </>
            ) : (
              <>
                <Copy size={14} /> Copy Link
              </>
            )}
          </motion.button>
          <motion.a
            href={PAYPAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-[#003087] to-[#009cde] text-white font-medium text-xs shadow-md hover:shadow-lg transition-all"
          >
            <ExternalLink size={14} /> Open
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
