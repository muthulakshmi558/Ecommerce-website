
    const products = [
      { id: "1" , name: "Meat", price: 80, image: "./images/meat-cate1.png" },
      { id: "2" , name: "Meat", price: 80, image: "./images/meat-cate2.png" },
      { id: "3" , name: "Meat", price: 80, image: "./images/meat-cate3.png" },
      { id: "4" , name: "Meat", price: 80, image: "./images/meat-cate4.png" },
      { id: "5" , name: "Meat", price: 80, image: "./images/meat-cate5.png" },
      { id: "6" , name: "Meat", price: 80, image: "./images/meat-cate6.png" },
      { id: "7" , name: "Meat", price: 80, image: "./images/meat-cate7.png" },
      { id: "8" , name: "Meat", price: 80, image: "./images/meat-cate8.png" },
    ];

    const productGrid = document.getElementById("productGrid");
    const priceRange = document.getElementById("priceRange");
    const sortSelect = document.getElementById("sortSelect");

    function renderProducts() {
      const maxPrice = parseInt(priceRange.value);
      const sortOrder = sortSelect.value;
      let filtered = products.filter(p => p.price <= maxPrice);


switch (sortOrder) {
  case "price-asc":
    filtered.sort((a, b) => a.price - b.price);
    break;
  case "price-desc":
    filtered.sort((a, b) => b.price - a.price);
    break;
  case "name-asc":
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    break;
  case "name-desc":
    filtered.sort((a, b) => b.name.localeCompare(a.name));
    break;
}

      productGrid.innerHTML = filtered.map(product => `
        <div class="col-6 col-md-4 mb-4">
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h5 class="mt-2 product-name">${product.name}</h5>
            <p class = "product-price"><strong>₹ ${product.price}</strong></p>
            <div class="stars mb-3">
        <img src="./images/star-icon.png" alt="Rating" class="star-img">
        <img src="./images/star-icon.png" alt="Rating" class="star-img">
        <img src="./images/star-icon.png" alt="Rating" class="star-img">
        <img src="./images/star-icon.png" alt="Rating" class="star-img">
        <img src="./images/star-icon.png" alt="Rating" class="star-img">
      </div>
            <button class="btn btn-veg mt-2 text-white" onclick="addToCart('${product.name}')">Add to cart</button>

          </div>
        </div>
      `).join("");
    }

    priceRange.addEventListener("input", renderProducts);
    sortSelect.addEventListener("change", renderProducts);

    renderProducts();

    function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    if (!product) return;

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItemIndex = cartItems.findIndex(item => item.name === productName);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].qty += 1;
    } else {
      cartItems.push({
  id: product.id,  
  name: product.name,
  price: product.price,
  qty: 1,
  image: product.image
});
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    window.location.href = "cart.html";

  }
