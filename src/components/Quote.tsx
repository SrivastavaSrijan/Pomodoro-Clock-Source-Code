import { Quote as QuoteIcon } from 'lucide-react';
import type { Quote as QuoteType, ThemeColors } from '../types';

interface QuoteProps {
  quote: QuoteType | null;
  theme: ThemeColors;
}

export function QuoteDisplay({ quote, theme }: QuoteProps) {
  if (!quote) return null;

  return (
    <div
      className="quote-section"
      style={{
        backgroundColor: theme.muted,
        borderColor: theme.border,
      }}
    >
      <QuoteIcon
        size={32}
        style={{ color: theme.text, opacity: 0.8, flexShrink: 0 }}
      />
      <blockquote className="quote-text" style={{ color: theme.text }}>
        {quote.text}
      </blockquote>
      <cite className="quote-author" style={{ color: theme.text }}>
        {quote.author}
        <span className="quote-underline" style={{ borderTopColor: theme.text }} />
      </cite>
    </div>
  );
}
