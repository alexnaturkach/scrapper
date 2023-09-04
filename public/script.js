const createQuery = () => {
    const names = document.getElementById('names')         
    const finalNames = names.value.split("\n").filter((el) => el);
    let query = ''

    finalNames.forEach((name) => {
        query += `names=${name}&`
    })

    return query
}

// const launch = () => {
//     const query = createQuery()
//     window.location.href = '' + query
// }


async function fetchResults() {
    const modal = document.getElementById('modal')
    const query = createQuery()
    modal.style.visibility = 'visible'
    const response = await fetch(`http://localhost:8086/scrape?${query}`);
    const finalResults = await response.json();

    const rows = [
        ["name1", "city1", "some other info"],
        ["name2", "city2", "more info"]
    ];
    
    let csvContent = "data:text/csv;charset=utf-8,";
    
    finalResults.content.forEach((username) => {
        let row = username.join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);

    modal.style.visibility = 'hidden'

  }