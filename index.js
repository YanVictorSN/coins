const selectCoin = document.querySelector('select');
const btnPrice = document.getElementById('btnPrice');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const result = document.getElementById('result');
const result2 = document.getElementById('result2');
const tableCoin = document.getElementById('tableCoin');
let imgCoins = document.querySelector('img');
const modal = document.querySelector('section');
const deletModal = document.getElementById('deletModal');

deletModal.addEventListener('click', delet)

function delet() {
    document.querySelector('section').style.visibility = 'hidden';
    location.reload();
}

//Funções para pegar dados das datas
btnPrice.addEventListener('click', createTable);

    startDate.addEventListener('change', dateStart);
    endDate.addEventListener('change', dateEnd);
    let x1 = '';
    let y1 = '';
    startDateValue = '';
    endDateValue = '';

    function dateStart(){
        startDateValue = startDate.value
        startDateValueFormated =  startDateValue.replace(/-/g,'');
        console.log(startDateValueFormated);
        let x = new Date(startDateValue)
        x1 = x.getTime()/100000
        return x1
    }
    function dateEnd(){
        endDateValue = endDate.value
        endDateValueFormated = endDateValue.replace(/-/g,'');
        console.log(endDateValue);
        let y = new Date(endDateValue)
        y1 = y.getTime()/100000
        return y1
    }
    function createTable() {
        
    fetch(`https://economia.awesomeapi.com.br/${coinTest}/10?start_date=${startDateValueFormated}&end_date=${endDateValueFormated}`, { method: 'GET'})
        .then((response) => {
            if(response.ok) {
                return response.json();
            } 
                return Promise.reject('Tente novamente mais tarde.');
})
        .then((data) => {
            return data
        })
        .then((data)=> {

         for (let x = 0; x <= 10; x++){
           let tr = tableCoin.insertRow(x);

            let tableCode = tr.insertCell(0);
            let tableName = tr.insertCell(1);
            let tableValor = tr.insertCell(2);
            let time = tr.insertCell(3);

            let timetest = new Date (data[x].timestamp*1000).toLocaleString();

            tableCode.innerHTML = data[0].code;
            tableName.innerHTML = data[x].high;
            tableValor.innerHTML = data[x].low;
            time.innerHTML = timetest;
            
            document.body.style.cursor = 'default'
            document.querySelector('section').style.visibility = 'visible';
         }
               
        })     
}

selectCoin.addEventListener('change', selectedCoin);
let coinTest = '';

function selectedCoin() {
    const coinValue = selectCoin.options;
    switch (coinValue.selectedIndex) {
        case 1:
        coinTest = 'BTC-BRL'
        imgCoins.setAttribute('src','assets/imgs/bitcoin.png')
        break;
        case 2:
        coinTest = 'EUR-BRL'
        imgCoins.setAttribute('src','assets/imgs/euros.png')
        break;
        case 3:
        imgCoins.setAttribute('src','assets/imgs/dollars.png')
        coinTest = 'USD-BRL'
    }
    
btnPrice.addEventListener('click', request);

    function request() {
    document.body.style.cursor = 'wait'
    
    const url = `https://economia.awesomeapi.com.br/last/`
        
    fetch(url + coinTest, { method: 'GET'})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
        let coin = ''
        switch (coinTest) {
            case 'BTC-BRL':
            coin = data.BTCBRL
            break;
            case 'EUR-BRL':
            coin = data.EURBRL
            break;
            case 'USD-BRL':
            coin = data.USDBRL
        }
        console.log(coin)
        return coin;
    })
        .then((coin)=> {
            result.innerHTML = coin
        }) 
    }
}
