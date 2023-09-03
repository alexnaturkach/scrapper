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
        if(index === arr.length){
            const overlay = document.createElement('div')
            overlay.style.padding = '50px'
            overlay.style.position = 'absolute'
            overlay.style.width = '100%'
            overlay.style.height = '100%'
            overlay.style.backgroundColor = 'white'
            overlay.style.zIndex = '2147483647'
            const resultsTable = document.createElement('table')
            resultsTable.style.width = '100%'
            resultsTable.style.borderCollapse = 'collapse'
            const headingRow = document.createElement('tr')
            const heading = document.createElement('th')
            heading.innerText = 'Name'
            const heading2 = document.createElement('th')
            heading2.innerText = 'Result'
            const tBody = document.createElement('tbody')
            headingRow.appendChild(heading)
            headingRow.appendChild(heading2)
            tBody.appendChild(headingRow)
            results.forEach((user) => {
                const newTr = document.createElement('tr')
                newTr.style.border = '1px solid #dddddd'
                tBody.appendChild(newTr)
                const newTd = document.createElement('td')
                newTd.style.border = '1px solid #dddddd'
                newTd.style.padding = '8px'
                newTd.innerText = user.name
                tBody.appendChild(newTd)
                const newTd2 = document.createElement('td')
                newTd2.style.border = '1px solid #dddddd'
                newTd2.style.padding = '8px'
                newTd2.innerText = user.result
                tBody.appendChild(newTd2)
            })
            resultsTable.appendChild(tBody)
            overlay.appendChild(resultsTable)
            document.body.appendChild(overlay)
            return
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