const data_country = document.querySelector("#countryValue");
const listShown = window.document.querySelector("#listShown");
const APIurl = "https://api.coingecko.com/api/v3/exchanges";
const list = document.querySelector("#countriesList");

async function getList(url){
  // gets data from the Coingecko API
  let response = await fetch(url);
  let dataList = response.json();

  return await dataList;
}

async function datalistFill(){
  let exchangesList = await getList(APIurl);
  let countriesList = [];
  
  exchangesList.forEach((item) => {
    if(!countriesList.includes(item.country)){
      countriesList.push(item.country)
    };
  });

  for(q in countriesList){
    let item = document.createElement("option");
    item.value = countriesList[q];
    list.appendChild(item);
  };

};

datalistFill();

async function filterData(selectedData){
  // filters the data and returns the entire object
  let allData = await getList(APIurl);
  let filteredObjects = [];

  for(q in allData){
    if(allData[q].country == selectedData){
      filteredObjects.push(allData[q]);
    };
  };

  console.log(filteredObjects);
  return filteredObjects;
};

function appendElement(exchange){
  // Append elements on the DOM

  let liCreate = window.document.createElement("a");
  liCreate.classList.add("exchange_container")

  // If there's a exchange in the given country, show it, otherwise...
  if(exchange){
    liCreate.innerHTML = `
      <h3 class="exchange_items_header" href=${exchange.url}> <img src="${exchange.image}" alt="">${exchange.name}</h3>
      <div class="exchange_infos">
        <p>Country: <span class="info_highlight">${data_country.value}</span></p>
        <p>Trading Volume: <span class="info_highlight">${parseInt(exchange.trade_volume_24h_btc)} BTCs</span></p>
      </div>`;
  } else if(exchange == false){
    liCreate.innerHTML = `<p>${data_country.value} doesn't have any exchanges</p>`;
  };
  liCreate.href = exchange.url;
  liCreate.target = "_blank";

  listShown.appendChild(liCreate);
};

async function mainShow(){
  // call the filterData() function and show it on the screen
  data = await filterData(data_country.value);

  // shows the main info on the console, for debug purposes
  console.log("Country: " + data_country.value);
  console.log(data.length);

  if(data.length >= 1){
    for(let q = 0; q < data.length; q++){
      appendElement(data[q]);
    };
  } else{
    appendElement(false);
  };
};

document.querySelector("#submitCountry").addEventListener("click", mainShow);