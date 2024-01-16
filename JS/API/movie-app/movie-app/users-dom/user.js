/**
 * GOAL : 
 * conssommation de user API et affichage dans le HTML
 */

/**
 * Steps : 
 * 1-getUsers()
 * 2-showUsers()
 */


const APIUsersURL="https://dummyjson.com/users"; 



async function getUsers(url){
    const resp=await fetch(url);
    const respData=await resp.json();

    console.log("users respData",respData.users);
    //passation 
    showUsers(respData.users);
}

//appel 
getUsers(APIUsersURL);

const main=document.getElementById("main");

function showUsers(users){
    main.innerHTML="";
    users.forEach(user => {
        //extract de donnees 
        const {firstName,lastName,email,image}=user;
        const userEl=document.createElement("div"); //<div></div>
        userEl.classList.add("card");   // <div class="card"></div>
        userEl.classList.add("col-4");  // <div class="card col-4"></div>
        userEl.style="width: 18rem;"   // <div class="card" style="width: 18rem;" ></div>

        userEl.innerHTML=`
        <img src="${image}" class="card-img-top" alt="${firstName}">
        <div class="card-body">
          <h5 class="card-title">FullName : ${firstName} ${lastName}</h5>
          <p class="card-text">Email : ${email}</p>
        </div>
        `

     main.appendChild(userEl);

    });
}

/**
 * extract les donnes film 
 * boucle fusiion dta+bloc html
 * dom () : injecteha fel page principale 
 */



