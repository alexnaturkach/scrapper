const puppeteer = require('puppeteer')

let index = 0;
let arr = [
    'naturkach',
    'test',
    'Asia Adams',
    'Heyaaaaaa',
    'asdasdasdasda',
    'Sara Laiton'
]

const scrape = async () => {
  const results = []
      // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://nremt.org/verify-credentials');

  await page.waitForSelector('#provider-search-submit')

  const kekw = await page.evaluate(async ()=>{
    const monkaS = new Promise()
      let index = 0;
      let arr = [
          'naturkach',
          'test',
          'Asia Adams',
          'Heyaaaaaa',
          'asdasdasdasda',
          'Sara Laiton'
      ]
      const results = []
      const targetNode = document.getElementsByClassName("search-results__summary")[0];
      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true };
      // Callback function to execute when mutations are observed
      const callback = (mutationList, observer) => {
          if(index < arr.length) {
              let user = {name:'', result:''}
              user.name = arr[index]
              const targetNode = document.getElementsByClassName("search-results__summary")[0];
              if(targetNode.innerText.includes('No results')){
                  user.result = 'failed'
              }
              else {
                  user.result = 'passed'
              }
              results.push(user)
              index++;

              if(index == arr.length) {
                monkaS.resolve(results)
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
      const result = await monkaS
      return result
        })
}

module.exports = scrape
