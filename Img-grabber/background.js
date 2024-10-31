chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "grabImages") {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: grabImages,
          }, onResult);
        } else {
          console.error("Нет активных вкладок.");
        }
      });
    }
  });
  
  function grabImages() {
    const images = document.querySelectorAll("img");
    return Array.from(images).map((image) => image.src);
  }
  
  function downloadImage(imageUrl) {
    chrome.downloads.download({
      url: imageUrl,
      saveAs: true,
    });
  }
  
  function onResult(frames) {
    if (!frames || frames.length === 0 || !frames[0].result) {
      console.error("Не удалось получить изображения со страницы");
      return;
    }
  
    const imageUrls = frames[0].result; // Исправлено
    imageUrls.forEach(downloadImage);
  }
      