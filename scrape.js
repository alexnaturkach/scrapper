const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const scrape = async (array) => {
  let arr = []
    if(!array.length) {
    return 'empty array'
  }
  if(!Array.isArray(array)){
    arr = [array]
  } else {
    arr = array
  }


  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

  await page.setViewport({width: 1200, height: 800});

  await page.goto('https://nremt.org/verify-credentials');

  await page.waitForTimeout(10000)

  await page.waitForSelector('#provider-search-submit');


  const allResults = await page.evaluate(
    async ({ arr }) => {
      const mockPromise = new Promise((resolve) => {
        let index = 0;
        const results = [];
        const targetNode = document.getElementsByClassName('search-results__summary')[0];
        const config = { attributes: true, childList: true, subtree: true };
        const callback = (mutationList, observer) => {
          if (index < arr.length) {
            let user = { name: '', result: '' };
            user.name = arr[index];
            const targetNode = document.getElementsByClassName('search-results__summary')[0];
            if (targetNode.innerText.includes('No results')) {
              user.result = 'failed';
            } else if(document.getElementsByClassName('search-results__row').length > 1) {
              user.result = 'Multiple results'
            } else {
              user.result = 'passed';
              user.date = document.getElementsByClassName('search-results__expiration-date')[0].innerText
            }
            results.push(user);
            index++;
            if (index == arr.length) {
              resolve(results);
            }
            document.getElementById('ProviderSearch').value = String(arr[index]);
            document.getElementById('provider-search-submit').click();

          }
        };
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);
        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
        document.getElementById('ProviderSearch').value = String(arr[index]);
        document.getElementById('provider-search-submit').click();

      });

      const result = await mockPromise;
      return result;
    },
    { arr }
  );
  return allResults;
};

module.exports = scrape;