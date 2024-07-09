let CartData =[];
async function AddToCart(itemID) {
    const cart = document.querySelector('.cart');
   
    
        const price = document.querySelector('#Price');
        await fetch('https://dummyjson.com/products/' + itemID)
        .then(res => {
            //store the json result in a variable
            return res.json();
        })
        .then(ItemJson => {
    
            //add To CartData
            CartData.push(ItemJson);
            console.log(CartData);
            const badge = document.querySelector('#badge');
            if(badge != null){
                    if(badge.classList.contains('badge')){
                    badge.innerText = parseInt(badge.innerText) + 1;
                    //add price trimmed the price
                    price.innerText = parseInt(price.innerText) + parseInt(ItemJson.price);
                    price.innerText = parseInt(price.innerText).toFixed(2);
                }
                else{
                    badge.classList.add('badge');
                    badge.innerText = (0) + 1;

                    price.innerText = ItemJson.price;
                }
            }
            
        });
    
   
    
    
}

function AddItemToCart(itemID) {
    let cart = getCookie('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart.push(itemID); // Add the item to the array
    setCookie('cart', JSON.stringify(cart), 1); // Store for 1 day1
}

//on document load
document.addEventListener('DOMContentLoaded', async function() {
    refreshCartCookie();
    await checkSession();
    console.log(CartData);
    var CartGrid = document.querySelector('.CartGrid');
    if(CartGrid != null && CartData !== null){
        PopulateCartPage();
       
    }
    else{
        console.log('Cart is empty');
    }
});

function PopulateCartPage(){
    const CartGrid = document.querySelector('.CartGrid');
    console.log(CartData);
    for(var i = 0; i < CartData.length; i++){
        CartGrid.innerHTML += `
        <div class="CartItems">
            <img src="${CartData[i].thumbnail}">
            <div class="ItemInfo">
                <div class="ItemName">${CartData[i].title}</div>
                <div class="ItemPrice"><div style="font-weight: lighter;"><span style="font-weight: bold;">Price:</span> <span id="Price">${CartData[i].price}</span> <span  >EGP</span> </div></div>
                <div class="ItemRemove"><button onclick='DeleteAllFromCart(${CartData[i].id})' class="btn btn-remove"><i class="fa-solid fa-trash"></i>     Remove</button></div>
            </div> 
            <div class="CountControl">
                <i class="fa-solid fa-plus greenIcon"></i>
                <span class="transparentIcon">1</span>
                <i class="fa-solid fa-minus greenIcon"></i>
            </div>
        </div>
        <hr>
        `;
    }
    console.log(CartData);
}


  async function checkSession(){
    //if there is data set in the session storage for the cart fetch them and display them
    if(getCookie('cart') != null){
        var cart = JSON.parse(getCookie('cart'));
        console.log(cart.length);
        //for each item in the cart
        for(var i = 0; i < cart.length; i++){
            
            await AddToCart(cart[i]);
        }
       
    }
    else{
        console.log('Cart Session Storage is empty');
    }
  }



  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function refreshCartCookie() {
    let cart = getCookie('cart');
    if (cart) {
        // Refresh the cookie by setting it again with the same value but updated expiration
        setCookie('cart', cart, 1); // Reset expiration to 7 days
    }
}

  