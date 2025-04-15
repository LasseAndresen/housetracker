import Root = cheerio.Root;

export interface Selector {
  type: 'string' | 'image' | 'firstInList' | 'custom';
  selector: string | null;
  customSelector: (cheerio: Root) => string;
}
