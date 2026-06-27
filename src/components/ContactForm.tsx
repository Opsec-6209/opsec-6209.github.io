import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
    window.location.href = `mailto:ahmadpaypal124@gmail.com?subject=Portfolio Contact from ${name}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold font-[var(--font-serif)] text-ink text-center mb-2"
      >
        Contact
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-ink-muted text-center mb-8 text-sm"
      >
        Send me a message — opens in your email client
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-lg mx-auto"
      >
        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-sakura-200 shadow-[0_4px_24px_rgba(255,77,141,0.06)] space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-sakura-200 bg-white/50 text-ink placeholder-ink-muted/50 focus:outline-none focus:border-sakura-400 focus:ring-2 focus:ring-sakura-200 transition-all text-sm"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-sakura-200 bg-white/50 text-ink placeholder-ink-muted/50 focus:outline-none focus:border-sakura-400 focus:ring-2 focus:ring-sakura-200 transition-all text-sm"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-sakura-200 bg-white/50 text-ink placeholder-ink-muted/50 focus:outline-none focus:border-sakura-400 focus:ring-2 focus:ring-sakura-200 transition-all text-sm resize-none"
              placeholder="Your message..."
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sakura-400 to-sakura-500 text-white font-semibold shadow-lg shadow-sakura-500/25 hover:from-sakura-500 hover:to-sakura-600 transition-all"
          >
            {sent ? (
              <>✉ Sent!</>
            ) : (
              <>
                <Send size={16} /> Send Message
              </>
            )}
          </motion.button>
          <a
            href="mailto:ahmadpaypal124@gmail.com"
            className="flex items-center justify-center gap-1.5 text-xs text-ink-muted hover:text-sakura-500 transition-colors"
          >
            <Mail size={14} /> Or email directly
          </a>
        </form>
      </motion.div>
    </section>
  );
}
