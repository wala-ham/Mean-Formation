const url="https://dummyjson.com/quotes/random";
const quoteContainer = document.getElementById("quote");
const btn = document.getElementById("btn");

/*
async function getQuots(url){
  const resp=await fetch(url)
  const respData=await resp.json();
  console.log("quote respData.quotes ",respData.quotes);
  showQuotes(respData.quotes);
}
getQuots(QuoteURLAPI);
*/

let getQuote= () => {
  quoteContainer.classList.remove("fade");
    fetch(url)
    .then(data => data.json())
    .then(item =>{
      quoteContainer.textContent = `${item.quote}`;
      quoteContainer.classList.add("fade");
    });
}
btn.addEventListener("click",getQuote);
getQuote();