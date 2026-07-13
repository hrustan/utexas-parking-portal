/**
 * Decorative QR placeholder — replicated verbatim from the design reference.
 * It intentionally encodes nothing; it is a fixed visual (finder patterns +
 * fixed data modules). Swap for a real generator when orders become real.
 */
export function QRCode({ size = 110 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      style={{ flex: '0 0 auto' }}
      role="img"
      aria-label="Order QR code"
    >
      <rect width="120" height="120" fill="#fff" />
      <g fill="var(--c-ink)">
        <rect x="8" y="8" width="30" height="30" />
        <rect x="14" y="14" width="18" height="18" fill="#fff" />
        <rect x="19" y="19" width="8" height="8" />
        <rect x="82" y="8" width="30" height="30" />
        <rect x="88" y="14" width="18" height="18" fill="#fff" />
        <rect x="93" y="19" width="8" height="8" />
        <rect x="8" y="82" width="30" height="30" />
        <rect x="14" y="88" width="18" height="18" fill="#fff" />
        <rect x="19" y="93" width="8" height="8" />
        <rect x="48" y="8" width="8" height="8" />
        <rect x="64" y="16" width="8" height="8" />
        <rect x="48" y="28" width="8" height="8" />
        <rect x="8" y="48" width="8" height="8" />
        <rect x="24" y="48" width="8" height="8" />
        <rect x="48" y="48" width="8" height="8" />
        <rect x="64" y="48" width="8" height="8" />
        <rect x="82" y="48" width="8" height="8" />
        <rect x="104" y="48" width="8" height="8" />
        <rect x="48" y="64" width="8" height="8" />
        <rect x="72" y="64" width="8" height="8" />
        <rect x="96" y="64" width="8" height="8" />
        <rect x="48" y="82" width="8" height="8" />
        <rect x="64" y="88" width="8" height="8" />
        <rect x="88" y="82" width="8" height="8" />
        <rect x="104" y="88" width="8" height="8" />
        <rect x="72" y="104" width="8" height="8" />
        <rect x="96" y="104" width="8" height="8" />
      </g>
    </svg>
  );
}
