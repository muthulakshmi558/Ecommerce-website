
    const products = [
      { id: "1" , name: "Strawberries", price: 120, image: "./images/fruits-cate1.png" },
      { id: "2" , name: "Apples", price: 100, image: "./images/fruits-cate2.png" },
      { id: "3" , name: "Bananas", price: 80, image: "./images/fruits-cate3.png" },
      { id: "4" , name: "Watermelon", price: 200, image: "./images/fruits-cate4.png" },
      { id: "5" , name: "Blueberries", price: 300, image: "./images/fruits-cate5.png" },
      { id: "6" , name: "Oranges", price: 150, image: "./images/fruits-cate6.png" },
      { id: "7" , name: "Blueberries", price: 300, image: "./images/fruits-cate7.png" },
      { id: "8" , name: "Oranges", price: 150, image: "./images/fruits-cate8.png" },
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

    // Initial load
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
  id: product.id,  // <-- add this line here
  name: product.name,
  price: product.price,
  qty: 1,
  image: product.image
});
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    window.location.href = "cart.html";

  }
 