import express, { Request, Response } from 'express';
import cors from 'cors';
import {getScraperFromUrl, getSelectorsFromStrings, scrapeWebsite} from "./scraperUtilities";
import {DingeoScraper} from "./scrapers/dingeoScraper";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors()); // Allow all origins to access

app.get('/scrapeListing', async (req: Request, res: Response): Promise<void> => {
    const { url, includeDingeo } = req.query as {url: string, includeDingeo: string};

    if (!url) {
        res.status(400).json({ error: "URL parameter is required" });
    }

    const scraper = getScraperFromUrl(url);
    if (!scraper) {
        res.status(400).json({ error: "Scraper not found" });
    }
    const listing = await scraper.scrapeListing(url);
    if (includeDingeo === 'true') {
        new DingeoScraper().scrape(listing.title);
    }
    res.json(listing);
});

app.get('/scrapeFilter', async (req: Request, res: Response): Promise<void> => {
    const url = req.query.url as string;
})

app.get('/scrapeCustom', async (req: Request, res: Response): Promise<void> => {
    const { url, selectors } = req.query;

    if (!url) {
        res.status(400).json({ error: "URL parameter is required" });
    }

    if (!selectors) {
        res.status(400).json({ error: "At least one CSS selector is required" });
    }

    // Ensure selectors is an array
    const selectorList: string[] = Array.isArray(selectors) ? selectors as string[] : [selectors as string];

    const result = await scrapeWebsite(url, getSelectorsFromStrings(selectorList));
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
