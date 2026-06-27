import { motion } from "framer-motion";
import { Copy, Check, Bitcoin } from "lucide-react";
import { useState } from "react";

const coins = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    address: "bc1q9h6tq8j5g7z3r2v4x6y8n1m3p5q7s9u2w4e6t8",
    color: "from-[#f7931a] to-[#e88b1a]",
    icon: Bitcoin,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x8f3C2A1B9D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9",
    color: "from-[#627eea] to-[#5165d0]",
    icon: null,
  },
  {
    name: "Solana",
    symbol: "SOL",
    address: "5xK9mN2pQ7rT4vW8yB1cE3fH6jL0nP5qS8uV2wX4yZ7aD9eF1gH3iJ6kM0pR2sU5vY8z",
    color: "from-[#14f195] to-[#00c274]",
    icon: null,
  },
];

function CoinCard({ coin }: { coin: (typeof coins)[0] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coin.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const shortAddress =
    coin.address.length > 20
      ? `${coin.address.slice(0, 8)}...${coin.address.slice(-6)}`
      : coin.address;

  return (
    <motion.button
      onClick={handleCopy}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="w-full bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-sakura-200 shadow-[0_4px_24px_rgba(255,77,141,0.06)] hover:shadow-[0_8px_30px_rgba(255,77,141,0.12)] transition-shadow cursor-pointer text-left group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${coin.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
            {coin.icon ? <coin.icon size={20} /> : coin.symbol[0]}
          </div>
          <div>
            <p className="font-semibold text-ink text-sm">{coin.name}</p>
            <p className="text-xs text-ink-muted">{coin.symbol}</p>
          </div>
        </div>
        <div className={`p-2 rounded-full transition-all ${copied ? "bg-green-100 text-green-600" : "bg-sakura-100 text-sakura-500 opacity-0 group-hover:opacity-100"}`}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </div>
      </div>
      <p className="font-mono text-xs text-ink-muted break-all bg-sakura-50 rounded-lg px-3 py-2 border border-sakura-100 group-hover:border-sakura-300 transition-colors">
        {shortAddress}
      </p>
      {copied && (
        <p className="text-xs text-green-600 mt-2 font-medium text-center">
          Copied to clipboard ✓
        </p>
      )}
    </motion.button>
  );
}

export function CryptoAddresses() {
  return (
    <section id="crypto" className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold font-[var(--font-serif)] text-ink text-center mb-2"
      >
        Support via Crypto
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-ink-muted text-center mb-8 text-sm"
      >
        Click any card to copy the address
      </motion.p>
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <CoinCard key={coin.symbol} coin={coin} />
        ))}
      </div>
    </section>
  );
}
