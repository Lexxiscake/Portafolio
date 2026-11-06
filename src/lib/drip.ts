export interface DripGeometry {
  d: string;
  bulbX: number;
  bulbY: number;
  bulbR: number;
  neckX: number;
  neckY: number;
  tailHalf: number;
}

/**
 * A hanging blood drip: a curved, tapered tail that flows into a lopsided
 * teardrop bead. The bead belongs to the same outline, so there is no seam,
 * rectangle or separate circle.
 */
export function dripGeometry(
  x: number,
  y: number,
  length: number,
  halfWidth: number,
  bend = 0,
  wave = 0
): DripGeometry {
  const safeLength = Math.max(8, length);
  const tailMin = safeLength * 0.3;
  const bulbR = Math.max(1.1, Math.min(halfWidth * 1.85, (safeLength - tailMin) / 2.4));
  const bulbRy = bulbR * 1.08;
  const bulbHeight = bulbRy * 2;
  const neckY = y + safeLength - bulbHeight;
  const tailLength = neckY - y;
  const neckX = x + bend * 0.55;
  const bulbX = x + bend;
  const bulbY = neckY + bulbRy * 1.15;
  const neckHalf = Math.max(halfWidth * 0.5, 0.8);
  const asym = Math.max(-0.1, Math.min(0.1, bend * 0.045));
  const leftRx = bulbR * (1 - asym);
  const rightRx = bulbR * (1 + asym);
  const bottomY = neckY + bulbHeight;

  const f = (value: number) => value.toFixed(2);

  const d = [
    `M${f(x - halfWidth)} ${f(y)}`,
    `C${f(x - halfWidth * 0.9 + wave * 0.4)} ${f(y + tailLength * 0.3)} ${f(neckX - neckHalf + wave * 0.15)} ${f(neckY - tailLength * 0.3)} ${f(neckX - neckHalf)} ${f(neckY)}`,
    `C${f(neckX - leftRx * 0.45)} ${f(neckY + bulbRy * 0.1)} ${f(bulbX - leftRx)} ${f(bulbY - bulbRy * 0.55)} ${f(bulbX - leftRx)} ${f(bulbY)}`,
    `C${f(bulbX - leftRx)} ${f(bulbY + bulbRy * 0.5)} ${f(bulbX - leftRx * 0.55)} ${f(bottomY)} ${f(bulbX)} ${f(bottomY)}`,
    `C${f(bulbX + rightRx * 0.55)} ${f(bottomY)} ${f(bulbX + rightRx)} ${f(bulbY + bulbRy * 0.5)} ${f(bulbX + rightRx)} ${f(bulbY)}`,
    `C${f(bulbX + rightRx)} ${f(bulbY - bulbRy * 0.55)} ${f(neckX + rightRx * 0.45)} ${f(neckY + bulbRy * 0.1)} ${f(neckX + neckHalf)} ${f(neckY)}`,
    `C${f(neckX + neckHalf + wave * 0.15)} ${f(neckY - tailLength * 0.3)} ${f(x + halfWidth * 0.9 + wave * 0.4)} ${f(y + tailLength * 0.3)} ${f(x + halfWidth)} ${f(y)}`,
    'Z',
  ].join('');

  return { d, bulbX, bulbY, bulbR, neckX, neckY, tailHalf: halfWidth };
}
