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

  await page.setViewport({width: 1300, height: 823});

  await page.goto('https://nremt.org/verify-credentials');

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
              user.date = 'N/A'
            } else if(document.getElementsByClassName('search-results__row').length > 1) {
              user.result = 'Multiple results'
              user.date = 'N/A'
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