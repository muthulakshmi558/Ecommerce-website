
  let qty = 1;

  function updateQty(change) {
    qty = Math.max(1, qty + change);
    document.getElementById('qty').textContent = qty;
    updateSelectedUnit();
  }

  function updateSelectedUnit() {
    const selected = document.querySelector('input[name="unit"]:checked');
    document.getElementById("selectedUnit").textContent = `Quantity:  ${selected ? selected.value : ""}`;
  }

  function changeImage(img) {
    document.getElementById('mainImage').src = img.src;
    document.querySelectorAll('.thumb-img').forEach(el => el.classList.remove('active'));
    img.classList.add('active');
  }

  document.querySelectorAll('input[name="unit"]').forEach(radio => {
    radio.addEventListener('change', updateSelectedUnit);
  });

  updateSelectedUnit();

  function updateQty(change) {
    const qtyElem = document.getElementById("qty");
    let current = parseInt(qtyElem.textContent);
    current += change;
    if (current < 1) current = 1;
    qtyElem.textContent = current;
  }

  function addToCartFromDetail() {
    const name = document.querySelector(".product-header").textContent;
    const price = parseInt(document.querySelector(".product-price").textContent.replace("₹", "").trim());
    const image = document.getElementById("mainImage").src;
    const qty = parseInt(document.getElementById("qty").textContent);
    const weight = document.querySelector('input[name="unit"]:checked').value;

    const product = {
      id: Date.now().toString(), 
      name,
      price,
      image,
      qty,
      weight
    };

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingIndex = cartItems.findIndex(p => p.name === name && p.weight === weight);
    if (existingIndex !== -1) {
      cartItems[existingIndex].qty += qty;
    } else {
      cartItems.push(product);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    window.location.href = "cart.html";
  }
