// Since we're not using ES modules, we'll use the global variables provided by the loaded scripts
// Assuming Swal and liff are loaded globally.  If not, you'll need to include the relevant script tags in your HTML.
document.addEventListener("DOMContentLoaded", () => {
    displayCart()
    initializeLIFF()
    setupQRCode()
  })
  
  function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const cartItems = document.getElementById("cart-items")
    const totalPrice = document.getElementById("total-price")
    let total = 0
  
    cartItems.innerHTML = ""
    if (cart.length === 0) {
      cartItems.innerHTML = "<p>ตะกร้าสินค้าว่าง</p>"
    } else {
      cart.forEach((item, index) => {
        const itemDiv = document.createElement("div")
        itemDiv.className = "cart-item"
        itemDiv.innerHTML = `
                  <span>${item.name} - ${item.price} บาท</span>
                  <button onclick="removeFromCart(${index})">ลบ</button>
              `
        cartItems.appendChild(itemDiv)
        total += item.price
      })
    }
  
    totalPrice.textContent = total
    updatePayButtonVisibility()
  }
  
  function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    displayCart()
  }
  
  function updatePayButtonVisibility() {
    const payBtn = document.getElementById("pay-btn")
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    payBtn.style.display = cart.length > 0 ? "inline-block" : "none"
  }
  
  function setupQRCode() {
    const payBtn = document.getElementById("pay-btn")
    const qrContainer = document.getElementById("qr-container")
    const phoneNumber = "004999176240769" // เปลี่ยนเป็นหมายเลขพร้อมเพย์ของคุณ
  
    payBtn.addEventListener("click", () => {
      const total = Number.parseFloat(document.getElementById("total-price").textContent)
      if (total > 0) {
        qrContainer.style.display = "block"
        updateQRCode(total)
      } else {
        alert("กรุณาเพิ่มสินค้าในตะกร้าก่อนชำระเงิน")
      }
    })
  
    document.getElementById("alert-save").addEventListener("click", showPaymentSteps)
  
    function updateQRCode(amount) {
      const qrData = window.promptpayQr(phoneNumber, { amount: amount })
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=300x300&margin=10`
      document.getElementById("promptpay-qr-img").src = qrUrl
    }
  }
  
  function showPaymentSteps() {
    Swal.fire({
      title: "📢 ขั้นตอนทำรายการ",
      html: `
              <ul style="text-align: left; font-size: 14px; line-height: 2;">
                 <li> <b>ตรวจสอบยอดเงินให้ถูกต้อง</b></li>
                 <li> <b>สแกน QR Code เพื่อชำระเงิน</b></li>
                 <li> <b>ตรวจสอบความถูกต้องก่อนกดยืนยัน</b></li>
                 <li> <b>ชำระเงินแล้ว แจ้งสลิปที่ไลน์ทุกครั้ง! <a href="https://page.line.me/jpo3470r" target="_blank">Click</a></b></li>
                 <li> <b>ขอบคุณที่ชำระค่าบริการของเราค่ะ</b></li>
              </ul>
          `,
      icon: "info",
      showConfirmButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "รับทราบ",
      background: "black",
      color: "white",
      timer: 80000,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    })
  }
  
  function initializeLIFF() {
    liff
      .init({ liffId: "2006812107-mOb2MYe1" })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login()
        }
      })
      .catch((err) => {
        console.error("LIFF Initialization failed", err)
      })
  }
  
  document.getElementById("send-line").addEventListener("click", () => {
    if (liff.isLoggedIn()) {
      const cart = JSON.parse(localStorage.getItem("cart")) || []
      if (cart.length === 0) {
        alert("ตะกร้าสินค้าว่าง")
        return
      }
      let message = "รายการสั่งซื้อ:\n"
      let total = 0
      cart.forEach((item) => {
        message += `${item.name}: ${item.price} บาท\n`
        total += item.price
      })
      message += `ยอดรวม: ${total} บาท`
  
      liff
        .sendMessages([
          {
            type: "text",
            text: message,
          },
        ])
        .then(() => {
          alert("ส่งข้อความไปยัง LINE แล้ว")
        })
        .catch((error) => {
          console.error("Error sending message: " + error)
        })
    } else {
      alert("กรุณาเข้าสู่ระบบ LINE ก่อน")
    }
  })
  
  