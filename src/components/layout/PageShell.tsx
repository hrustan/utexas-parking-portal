import type { ReactNode } from 'react';

/** Centers a page's content column at its own max-width. */
export function PageShell({
  maxWidth,
  children,
}: {
  maxWidth: number;
  children: ReactNode;
}) {
  return (
    <div style={{ maxWidth, margin: '0 auto', width: '100%' }}>{children}</div>
  );
}
