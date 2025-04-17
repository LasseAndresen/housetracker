export class FormattingUtilities {
  public static priceStringToNumber(price: string): number {
    return parseInt(price.replace(/[^\d]/g, ''));
  }
}
