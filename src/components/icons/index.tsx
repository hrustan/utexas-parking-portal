import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

/**
 * Shared stroke-icon wrapper. Icons use `currentColor` for stroke so callers
 * control color via CSS `color`. Paths are ported verbatim from the design
 * reference for pixel-accurate fidelity.
 */
function Base({
  size = 20,
  strokeWidth = 1.9,
  children,
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const LockIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 018 0v3" />
  </Base>
);

export const BellIcon = (p: IconProps) => (
  <Base strokeWidth={1.8} {...p}>
    <path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6" />
    <path d="M10 20a2 2 0 004 0" />
  </Base>
);

export const CartIcon = (p: IconProps) => (
  <Base strokeWidth={1.8} {...p}>
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h3l2.4 12.5a2 2 0 002 1.5h8.2a2 2 0 002-1.6L21 7H6" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base strokeWidth={2.6} {...p}>
    <path d="M4 12l5 5L20 6" />
  </Base>
);

export const PlusIcon = (p: IconProps) => (
  <Base strokeWidth={2.4} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Base strokeWidth={2.2} {...p}>
    <path d="M9 6l6 6-6 6" />
  </Base>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Base strokeWidth={2.2} {...p}>
    <path d="M19 12H5" />
    <path d="M11 6l-6 6 6 6" />
  </Base>
);

export const CalendarIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="6" width="16" height="14" rx="2" />
    <path d="M4 10h16M8 4v4M16 4v4" />
  </Base>
);

export const CarIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 13l2-5h14l2 5" />
    <path d="M3 13h18v5H3z" />
    <circle cx="7.5" cy="18" r="1.6" />
    <circle cx="16.5" cy="18" r="1.6" />
  </Base>
);

export const BicycleIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="6" cy="17" r="3.4" />
    <circle cx="18" cy="17" r="3.4" />
    <path d="M6 17l4-8h5l3 8M10 9l4 .5" />
  </Base>
);

export const MotorcycleIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="5.5" cy="16" r="3" />
    <circle cx="18.5" cy="16" r="3" />
    <path d="M5.5 16l3-5h5l3 5" />
    <path d="M8.5 11l-1.5-2H5" />
    <path d="M16.5 11l1.5-2H21" />
  </Base>
);

export const DocumentIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </Base>
);

export const ListIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 6h16M4 12h16M4 18h10" />
  </Base>
);

export const HelpCircleIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 015 .3c0 1.7-2.5 2-2.5 4" />
    <circle cx="12" cy="17" r=".6" fill="currentColor" />
  </Base>
);

export const InfoIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" />
    <circle cx="12" cy="8" r=".6" fill="currentColor" />
  </Base>
);

export const QrGlyphIcon = (p: IconProps) => (
  <Base strokeWidth={1.8} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3M21 21v-3M17 21h4" />
  </Base>
);

export const ReceiptIcon = (p: IconProps) => (
  <Base strokeWidth={1.8} {...p}>
    <path d="M6 2h9l4 4v16l-2.5-1.5L14 22l-2-1.5L10 22l-2.5-1.5L5 22V6a4 4 0 011-4z" />
    <path d="M9 8h6M9 12h6" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base strokeWidth={2.2} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);

export const AlertTriangleIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <path d="M10.3 3.9 2.4 17.5A1.9 1.9 0 0 0 4 20.4h16a1.9 1.9 0 0 0 1.7-2.9L13.7 3.9a1.9 1.9 0 0 0-3.4 0Z" />
    <path d="M12 9v4" />
    <circle cx="12" cy="17" r=".6" fill="currentColor" />
  </Base>
);

export const BuildingIcon = (p: IconProps) => (
  <Base strokeWidth={1.9} {...p}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
    <path d="M5 21h14" />
  </Base>
);
