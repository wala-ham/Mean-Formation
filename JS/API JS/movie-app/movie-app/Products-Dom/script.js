/**
 * GOAL : Concommation et affichage products API 
 * code commentée 
 * 
 */
const API="https://dummyjson.com/products";



//consomaation of api products and show them 




async function getProducts(url){

    let resp=await fetch(url);
    let respData=await resp.json();

    console.log("products ....",respData.products)

   showProducts(respData.products)

}



let row=document.getElementById("main");
console.log("row",row)


function showProducts(products){
  
row.innerHTML="";
    console.log("products",products)

    products.forEach((product)=>{

    const {title,description,price,images}=product;
     let productEl=document.createElement("div");
     productEl.classList.add("card");
     productEl.classList.add("col-4"); 
     productEl.style.width="18rem";
     
      
        productEl.innerHTML=`
        <img src="${images[0]}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <a href="#" class="btn btn-primary">Buy ${price}</a>
        </div>
        `
        console.log("*****productEl",productEl)
       row.appendChild(productEl);
      
    });

}
showProducts(getProducts(API));



