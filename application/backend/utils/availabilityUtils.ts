
/**
 * counts the number of set bits (1s).
 * @param n - The number to count set bits in
 * @returns The number of set bits
 */
export const countSetBits = (n: number): number => {
    let count = 0;
    while (n > 0) {
      count += n & 1;
      n >>= 1;
    }
    return count;
  }