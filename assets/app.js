const baseUrl = "https://api.amalieandreasen.com/wp-json/wp/v2/";
const recipeCategoryId = 3;

const containerEl = document.querySelector(".container");

//get token
function getToken(){
    const loginInfo = {
        username: "API User",
        password: "UQkq W4x9 n7LV WeeL GnJ7 5IV2"
    }

   return fetch("https://api.amalieandreasen.com/wp-json/jwt-auth/v1/token", {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(loginInfo)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        sessionStorage.setItem("myToken", data.data.token)
    })
    .catch((err) => console.log("fejl", err));
}

getToken().then(() => getPrivateRecipes());

// get all recipes
function getPrivateRecipes(){
    fetch(baseUrl + `posts?status=private&categories=${recipeCategoryId}`, {
        headers:{
            Authorization: "Bearer " + sessionStorage.getItem("myToken")
        }
    })
    .then((res) => res.json())
    .then((recipes) => {
        console.log(recipes)
    })
    .catch(err => console.log("fejl", err))
}

// getAllRecipes()