export function formatCurrency(amount: number): string {
  // Render negatives as -$100.00 (sign before the symbol), not $-100.00.
  const sign = amount < 0 ? '-' : '';
  return `${sign}$${Math.abs(amount).toFixed(2)}`;
}
