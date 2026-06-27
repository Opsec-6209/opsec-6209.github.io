import { motion } from "framer-motion";
import { Copy, Check, Bitcoin } from "lucide-react";
import { useState } from "react";
import { TiltCard } from "./TiltCard";
import { SectionHeader } from "./SectionHeader";

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
    <TiltCard intensity={5} className="w-full">
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.97 }}
        className="group relative w-full glass rounded-2xl p-5 border border-sakura-200/60 shadow-[0_4px_24px_rgba(255,77,141,0.06)] hover:shadow-[0_10px_36px_rgba(255,77,141,0.22)] hover:border-sakura-400 transition-all duration-300 cursor-pointer text-left overflow-hidden"
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,122,168,0.4)" }}
        />
        <div className="relative flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${coin.color} flex items-center justify-center text-white font-bold text-lg shadow-md ring-1 ring-white/40`}
            >
              {coin.icon ? <coin.icon size={20} /> : coin.symbol[0]}
            </div>
            <div>
              <p className="font-semibold text-ink text-sm">{coin.name}</p>
              <p className="text-xs text-ink-muted">{coin.symbol}</p>
            </div>
          </div>
          <div
            className={`p-2 rounded-full transition-all duration-200 ${
              copied
                ? "bg-green-100 text-green-600"
                : "bg-sakura-100 text-sakura-500 opacity-0 group-hover:opacity-100"
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </div>
        </div>
        <p className="font-mono text-xs text-ink-muted break-all bg-sakura-50/80 rounded-lg px-3 py-2 border border-sakura-100 group-hover:border-sakura-300 transition-colors">
          {shortAddress}
        </p>
        {copied && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-green-600 mt-2 font-medium text-center"
          >
            Copied to clipboard ✓
          </motion.p>
        )}
      </motion.button>
    </TiltCard>
  );
}

export function CryptoAddresses() {
  return (
    <section id="crypto" className="py-16 px-4">
      <SectionHeader
        title="Support via Crypto"
        subtitle="Click any card to copy the address"
        kanji="応援"
        className="mb-10"
      />
      <motion.div
        className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {coins.map((coin) => (
          <motion.div
            key={coin.symbol}
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <CoinCard coin={coin} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
