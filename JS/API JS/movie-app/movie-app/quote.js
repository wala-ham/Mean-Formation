const QuoteURLAPI="https://dummyjson.com/quotes";

async function getQuots(url){
  const resp=await fetch(url)
  const respData=await resp.json();
  console.log("quote respData.quotes ",respData.quotes);
  showQuotes(respData.quotes);
}

getQuots(QuoteURLAPI);

const main=document.getElementById("main");

function showQuotes(quotes){
    main.innerHTML="";
    quotes.forEach(quota=> {
        //extract de donnees 
        const {quote,author}=quota;
        const quoteE1=document.createElement("div"); //<div></div>
        quoteE1.classList.add("card");   // <div class="card"></div>
        quoteE1.classList.add("col-4"); 
        quoteE1.style="width: 18rem;"   // <div class="card" style="width: 18rem;" ></div>

        quoteE1.innerHTML=`
        
        <div class="card-body">
          <h5 class="card-title">Quote : ${quote}</h5>
          <p class="card-text">Author : ${author}</p>
        </div>
        `

     main.appendChild(quoteE1);

    });
}