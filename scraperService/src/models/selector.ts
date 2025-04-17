import Root = cheerio.Root;

export interface Selector {
  type: 'string' | 'stringFirst' | 'image' | 'custom';
  selector: string | null;
  customSelector: (cheerio: Root) => string;
}
