export const Integer = {
  ZERO: 0,
  ONE: 1,
  NEGATIVE_ONE: -1
}

declare global {
  interface Number {
    add(number: number): number

    isZero(): boolean

    isGreaterThan(threshold: number): boolean

    isBetween(start: number, end: number): boolean

    isNotBetween(start: number, end: number): boolean

    isGreaterThanZero(): boolean

    isEqualTo(number: number): boolean
  }
}

Number.prototype.add = function(this: number, number: number): number {
  return this + number
}

Number.prototype.isGreaterThan = function(this: number, threshold: number): boolean {
  return this > threshold
}

Number.prototype.isEqualTo = function(this: number, number: number): boolean {
  return this === number
}

Number.prototype.isZero = function(this: number): boolean {
  return this.isEqualTo(Integer.ZERO)
}

Number.prototype.isGreaterThanZero = function(this: number): boolean {
  return this.isGreaterThan(Integer.ZERO)
}

Number.prototype.isBetween = function(this: number, start: number, end: number): boolean {
  const startNumber = Math.min(start, end)
  const endNumber = Math.max(start, end)
  return startNumber <= this && this <= endNumber
}

Number.prototype.isNotBetween = function(this: number, start: number, end: number): boolean {
  return !this.isBetween(start, end)
}
