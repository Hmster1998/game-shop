document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

function fetchProducts() {
  fetch("get_products.php")
      .then((res) => {
          if (!res.ok) {
              throw new Error('Network response was not ok');
          }
          return res.json();
      })
      .then((products) => {
          displayProducts(products);
      })
      .catch((error) => {
          console.error("Error fetching products:", error);
          document.getElementById("product").innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดสินค้า</p>";
      });
}

function displayProducts(products) {
  const productDiv = document.getElementById("product");
  productDiv.innerHTML = "";
  products.forEach((product) => {
      const item = document.createElement("div");
      item.className = "product";
      item.innerHTML = `
          <h2>${product.name}</h2>
          <p>ราคา: ${product.price} บาท</p>
          <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">เพิ่มลงตะกร้า</button>
      `;
      productDiv.appendChild(item);
  });
}

function addToCart(id, name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("เพิ่มสินค้าลงตะกร้าแล้ว!");
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

function goToCart() {
  window.location.href = "cart.html";
}