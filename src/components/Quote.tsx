import { Quote as QuoteIcon } from 'lucide-react';
import type { Quote as QuoteType, ThemeColors } from '../types';

interface QuoteProps {
  quote: QuoteType | null;
  theme: ThemeColors;
}

export function QuoteDisplay({ quote, theme }: QuoteProps) {
  if (!quote) return null;

  return (
    <div className="quote-section">
      <QuoteIcon size={20} style={{ color: theme.text, opacity: 0.5 }} />
      <blockquote className="quote-text" style={{ color: theme.text, opacity: 0.8 }}>
        {quote.text}
      </blockquote>
      <cite className="quote-author" style={{ color: theme.text }}>
        — {quote.author}
        <span className="quote-underline" style={{ backgroundColor: theme.text }} />
      </cite>
    </div>
  );
}
