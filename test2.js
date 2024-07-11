// import { mainCategoryList as categorySideBar } from "./test1";
const mainCategoryList = document.querySelector(".main-container");
const productItems = document.querySelector(".product-container");
const allCategories = document.querySelector(".categories-container");
const categoryTitle = document.querySelector(".title-category-product");

function categoryProduct(url) {
  fetch(url)
    .then((response) => response.json())
    .then((categoryDetail) => {
      console.log(categoryDetail);
      productItems.innerHTML = ""; // Clear previous items
      categoryDetail.products.forEach((item) => {
        categoryTitle.innerText = `${item.category.toUpperCase()}`;
        productItems.innerHTML += `
          <div class="card-product-container">
            <div class="product-image">
              <img
                src="${item.thumbnail}"
                alt="category-img"
              />
              <div class="add-cart-btn">
                <button>Add to Cart</button>
              </div>
            </div>
            <div class="category-style"><p>${item.category}</p></div>
            <div class="product-name"><p>${item.title}</p></div>
            <div class="product-price-rating">
              <p class="price">${item.price} $</p>
              <p>${item.rating} <i class="fa-regular fa-star"></i></p>
            </div>
          </div>`;
      });
    });
}

const categoryUrl = localStorage.getItem("categoryUrl");
if (categoryUrl) {
  categoryProduct(categoryUrl);
}

fetch("https://dummyjson.com/products/categories")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((cat, index) => {
      console.log(cat);
      let { slug, url } = cat; // Dummy JSON categories API returns an array of category names
      url = `https://dummyjson.com/products/category/${slug}`; // Construct the URL for fetching category products
      allCategories.innerHTML += `
        <div class="card-container" data-url="${url}">
          <div class="category-name"><p>${slug}</p></div>
        </div>`;
    });

    document.querySelectorAll(".card-container").forEach((card) => {
      card.addEventListener("click", function () {
        const categoryUrl = this.getAttribute("data-url");
        localStorage.setItem("categoryUrl", categoryUrl); // Store the URL in localStorage
        window.open("test2.html", "_self"); // Open in a new tab
      });
    });
  });

document.querySelector(".open-btn").addEventListener("click", function () {
  console.log("u clicked");
  mainCategoryList.style.left = "0px";
});
document.querySelector(".close-btn").addEventListener("click", function () {
  console.log("u clicked");
  mainCategoryList.style.left = "-300px";
});
