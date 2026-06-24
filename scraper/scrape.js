import scrape from 'website-scraper';

const options = {
  urls: ['https://placynt.com'],
  directory: './downloaded_site',
  recursive: true,
  maxDepth: 1, // Change if you want to mirror the entire site deeply
};

console.log("Starting to scrape https://placynt.com...");

scrape(options).then((result) => {
    console.log("Successfully downloaded the website to d:\\clent\\scraper\\downloaded_site!");
}).catch((err) => {
    console.error("An error occurred while downloading:", err);
});
