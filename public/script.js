const createQuery = () => {
    const names = document.getElementById('names')         
    const finalNames = names.value.split("\n").filter((el) => el);
    let query = ''

    finalNames.forEach((name) => {
        query += `names=${name}&`
    })

    return query
}

const subtractYears = (date, years) => {
    date.setFullYear(date.getFullYear() - years);
    return date;
  }

async function fetchResults() {
    const modal = document.getElementById('modal')
    const query = createQuery()
    modal.style.visibility = 'visible'
    
    //update link before deploy
    const response = await fetch(`http://localhost:8083/scrape?${query}`);
    const finalResults = await response.json();
    
    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += ['Name', 'Result', 'Date'] + "\r\n"
    
    finalResults.content.forEach((username) => {
        let newDate
        const date = new Date(username.date)
        if(date == 'Invalid Date'){
            newDate = 'N/A'
        } else {
            newDate = subtractYears(date, 3).toDateString()
        }
        let row = [username.name, username.result, newDate]
        csvContent += row + "\r\n"
    });

    let encodedUri = encodeURI(csvContent);

    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "search_results.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "search_results.csv".

    modal.style.visibility = 'hidden'

  }