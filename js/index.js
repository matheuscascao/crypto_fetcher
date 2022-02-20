const data_country = document.querySelector("#countryValue");
const listShown = window.document.querySelector("#listShown");

async function getList(){
  // gets the dada from the API
  let dataList = "";
  dataList = await axios.get('https://api.coingecko.com/api/v3/exchanges');

  return dataList;

}

async function filterData(selectedData){
  // filters the data and returns the entire object
  let allData = await getList();
  let filteredObjects = [];

  for(let q = 0; q < allData.data.length; q++){
    if(allData.data[q].country == selectedData){
      filteredObjects.push(allData.data[q]);
    };
  };

  return filteredObjects;
};

function appendElement(exchange){
  // Append elements on the DOM
  let liCreate = window.document.createElement("li");
  liCreate.innerHTML = `<p>${exchange.country} - ${exchange.name}</p>`;
  listShown.appendChild(liCreate);
};

async function mainShow(){
  // call the filterData() function and show it on the screen
  data = await filterData(data_country.value);

  // shows the main infos on the console, for debug purposes
  console.log("Country: " + data_country.value);
  console.log(data.length);

  for(let q = 0; q < data.length; q++){
    appendElement(data[q]);
  };

};

document.querySelector("#submitCountry").addEventListener("click", mainShow);