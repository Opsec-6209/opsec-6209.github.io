import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-sakura-100">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-ink-muted mb-1">
          Made with <Heart size={12} className="inline text-sakura-500 fill-sakura-500" /> by{" "}
          <span className="font-mono font-medium text-ink">opsec_6209</span>
        </p>
        <p className="text-xs text-ink-muted/60 font-mono">
          © 2026 · opsec_6209
        </p>
      </div>
    </footer>
  );
}
