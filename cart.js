var CartData =[];
function AddToCart(itemID) {
    const cart = document.querySelector('.cart');
   
    
        const price = document.querySelector('#Price');
        fetch('https://dummyjson.com/products/' + itemID)
        .then(res => {
            //store the json result in a variable
            return res.json();
        })
        .then(ItemJson => {
    
            //add To CartData
            CartData.push(ItemJson);
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

    const cart = JSON.parse(sessionStorage.getItem('cart'));
    if(cart == null){
        sessionStorage.setItem('cart', JSON.stringify([itemID]));
        AddToCart(itemID);
    }
    else{
        cart.push(itemID);
        sessionStorage.setItem('cart', JSON.stringify(cart));
        AddToCart(itemID);
    }
}

//on document load
document.addEventListener('DOMContentLoaded', function() {
    checkSession();
    var CartGrid = document.querySelector('.CartGrid');
    if(CartGrid != null && CartData != null){
        PopulateCartPage();
        
    }
    else{
        console.log('Cart is empty');
    }
});

function PopulateCartPage(){
    const CartGrid = document.querySelector('.CartGrid');
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
}


  function checkSession(){
    //if there is data set in the session storage for the cart fetch them and display them
    if(sessionStorage.getItem('cart') != null){
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        
        //for each item in the cart
        for(var i = 0; i < cart.length; i++){
            
            AddToCart(cart[i]);
        }
       
    }
  }

  function clearSession(){
    sessionStorage.removeItem('cart');
  }

  