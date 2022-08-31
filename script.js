function isEvenNumber(number) {
    number = Math.floor(number);
    return number % 2 === 0;
}

function appendToTable(key, oldRates, newRates, idToBeAppended = 'forexTable') {
    let newRow = document.createElement('tr');
    let title = document.createElement('td')
    let oldRateCell = document.createElement('td');
    let newRateCell = document.createElement('td');

    oldRate = oldRates[key];
    newRate = newRates[key];
    title.innerHTML = key;
    oldRateCell.innerHTML = oldRate;
    newRateCell.innerHTML = newRate;

    if (isEvenNumber(oldRate)) {
        oldRateCell.style.borderColor = 'red';
    }
    
    if (isEvenNumber(newRate)) {
        newRateCell.style.borderColor = 'red';
    }

    newRow.appendChild(title);
    newRow.appendChild(oldRateCell);
    newRow.appendChild(newRateCell);

    document.getElementById(idToBeAppended).appendChild(newRow);
}

function fetchData(apikey = '2EZu8HY3YDuNyY8XByfVDesDbzqxs0nb', baseCurrency = 'HKD') {
    var myHeaders = new Headers();
    myHeaders.append("apikey", apikey);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch("https://api.apilayer.com/fixer/latest?symbols=&base=" + baseCurrency, requestOptions)
        .then(response => response.json())
        .then(function (result) {

            let oldRates = result.rates;
            let newRates = {};

            const keys = Object.keys(oldRates);

            for (const key of keys) {
                newRates[key] = oldRates[key] + 10.0002;
                appendToTable(key, oldRates, newRates, 'forexTable');
            }
        })
        .catch(error => console.log('error', error));
}

fetchData();
