import QRCode from "qrcode.react"

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const phone = "004999176240769" // Replace with your PromptPay number
  const qrData = `https://promptpay.io/${phone}/${total}`

  new QRCode(document.getElementById("qrcode"), {
    text: qrData,
    width: 256,
    height: 256,
  })

  document.getElementById("total").textContent = `ยอดรวม: ${total} บาท`
})

