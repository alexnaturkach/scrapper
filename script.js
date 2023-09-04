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
            console.log(results)
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