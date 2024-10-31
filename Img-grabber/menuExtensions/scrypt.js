function grabImages() {
    const images = document.querySelectorAll("img");
    return Array.from(images).map((image) => image.src);
  }
  
  // Отправляем сообщение в background.js при нажатии на кнопку в popup.html
  document.getElementById('grabBtn').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: "grabImages" });
  });