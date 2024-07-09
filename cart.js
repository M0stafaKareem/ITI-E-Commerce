let CartData ={};
async function AddToCart(itemID) {

        if (CartData[itemID] != null) {
                    
            CartData[itemID][0] = parseInt(CartData[itemID] ?? 0) + 1;
            updateBadgeAndCart(CartData[itemID][1]);
        }
        else
        {
            await fetch('https://dummyjson.com/products/' + itemID)
            .then(res => {
                //store the json result in a variable
                return res.json();
            })
            .then(ItemJson => {
                    
                            var InnerArray = [];
                            InnerArray.push(1);
                            InnerArray.push(ItemJson);
                            CartData[itemID] = InnerArray;
                            updateBadgeAndCart(ItemJson);
            });
        }
     
    
}

function  removeFromCart(itemID) {
    if (CartData[itemID][0] > 1) {
        CartData[itemID][0] = CartData[itemID][0] - 1;
        updateBadgeAndCart(CartData[itemID][1]);
    }
    else
    {
        delete CartData[itemID];
        updateBadgeAndCart(CartData[itemID][1]);
    }
}


function updateBadgeAndCart(ItemJson){
    const price = document.querySelector('#Price');
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
    PopulateCartPage();
    UpdateSessionStorage();
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

function UpdateSessionStorage(){
    var Array=[];
    Object.entries(CartData).forEach(([key, CarItem]) => {
       for (let index = 0; index < CarItem[0]; index++) {
        
        Array.push(key);
       } 
    })
    sessionStorage.setItem('cart', JSON.stringify(Array));

}

//on document load
document.addEventListener('DOMContentLoaded', async function() {
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
    if (CartGrid!=null && CartData != null){ 
            console.log(CartData);
        CartGrid.innerHTML = '';
        //because CartData is a 2D array and not always filled continuously we need to loop through it using for each
        Object.entries(CartData).forEach(([key, CarItem]) => {
            console.log(CartData);
            console.log(CarItem);
        
            CartGrid.innerHTML += `
            <div class="CartItems">
                <img src="${CarItem[1].thumbnail}">
                <div class="ItemInfo">
                    <div class="ItemName">${CarItem[1].title}</div>
                    <div class="ItemPrice"><div style="font-weight: lighter;"><span style="font-weight: bold;">Price:</span> <span id="Price">${CarItem[1].price}</span> <span  >EGP</span> </div></div>
                    <div class="ItemRemove"><button style="cursor: pointer;float: left;" onclick='DeleteAllFromCart(${CarItem[1].id})' class="btn btn-remove"><i class="fa-solid fa-trash"></i>     Remove</button></div>
                </div> 
                <div class="CountControl">
                    <i style="cursor: pointer;" onclick="AddItemToCart(${key})" class="fa-solid fa-plus greenIcon"></i>
                    <span class="transparentIcon">${CarItem[0]}</span>
                    <i style="cursor: pointer;" onclick="removeFromCart(${key})" class="fa-solid fa-minus greenIcon"></i>
                </div>
            </div>
            <hr>
            `;
        });
    }
   
       
    
    console.log(CartData);
}


  async function checkSession(){
    //if there is data set in the session storage for the cart fetch them and display them
    if(sessionStorage.getItem('cart') != null){
        var cart = JSON.parse(sessionStorage.getItem('cart'));
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

  function clearSession(){
    sessionStorage.removeItem('cart');
  }


  
  