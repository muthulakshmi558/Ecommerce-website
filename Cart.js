
    function renderCart() {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const cartContainer = document.getElementById("cart-items");
      let subtotal = 0;

      if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
      }

      cartContainer.innerHTML = cartItems.map(item => {
  const itemTotal = item.price * item.qty;
  subtotal += itemTotal;
  return `
    <div class="cart-item">
      <div class="d-flex align-items-center gap-3">
        <img src="${item.image}" alt="${item.name}" class="product-img">
        <div class="item-info">
          <h6>${item.name}</h6>
          <div>₹${item.price}</div>
        </div>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="updateQty('${item.id}', 'decrease')">-</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="updateQty('${item.id}', 'increase')">+</button>
      </div>
    </div>
  `;
}).join("");

      const delivery = subtotal > 500 ? 0 : 50;
      const discount = subtotal > 300 ? 50 : 0;
      const total = subtotal + delivery - discount;

      document.getElementById("subtotal").innerText = subtotal;
      document.getElementById("delivery").innerText = delivery;
      document.getElementById("discount").innerText = discount;
      document.getElementById("total").innerText = total;

      document.getElementById("p-subtotal").innerText = subtotal;
      document.getElementById("p-delivery").innerText = delivery;
      document.getElementById("p-discount").innerText = discount;
      document.getElementById("p-total").innerText = total;
    }

 function updateQty(id, action) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartItems = cartItems.map(item => {
    if (String(item.id) === String(id)) {
      if (action === 'increase') {
        item.qty++;
      } else if (action === 'decrease') {
        item.qty--;
      }
    }
    return item;
  });

  cartItems = cartItems.filter(item => item.qty > 0);

  if (cartItems.length === 0) {
    localStorage.removeItem("cartItems");
    location.reload();
    return;  
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();

}
    function goToAddress() {
      document.getElementById("cart-page").style.display = "none";
      document.getElementById("address-page").style.display = "block";
      document.querySelector(".step1").classList.remove("active");
      document.querySelector(".step2").classList.add("active");
    }

    function goToPayment() {
      const name = document.getElementById("name").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const address = document.getElementById("address").value.trim();
      const city = document.getElementById("city").value.trim();
      const state = document.getElementById("state").value.trim();

      if (!name || !mobile || !address || !city || !state) {
        alert("Please fill in all address fields.");
        return;
      }

      document.getElementById("address-page").style.display = "none";
      document.getElementById("payment-page").style.display = "block";
      document.querySelector(".step2").classList.remove("active");
      document.querySelector(".step3").classList.add("active");
    }

    document.addEventListener('click', function (e) {
  if (e.target.classList.contains('qty-btn')) {
    const id = e.target.getAttribute('data-id');
    const action = e.target.getAttribute('data-action');
    updateQty(id, action);
  }
});
    renderCart();
