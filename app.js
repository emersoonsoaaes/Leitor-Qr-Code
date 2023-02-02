const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLigthColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

const defaultUrl = "https://github.com/emersoonsoaaes";
let colorLigth = "#fff",
  colorDark = "#000",
  text = defaultUrl,
  size = 300;

function handleDarkColor(qr) {
  colorDark = qr.target.value;
  generateQRCode();
}

function handleLigthColor(qr) {
  colorLigth = qr.target.value;
  generateQRCode();
}

function handleQRText(qr) {
  const value = qr.target.value;
  text = value;
  if (!value) {
    text = defaultUrl;
  }
  generateQRCode();
}

async function generateQRCode() {
  qrContainer.innerHTML = "";
  new QRCode("qr-code", {
    text,
    heigth: size,
    width: size,
    colorLigth,
    colorDark,
  });
  download.href = await resolveDataUrl();
}

async function handleShare() {
  setTimeout(async () => {
    try {
      const baseUrl = await resolveDataUrl();
      const blob = await (await fetch(baseUrl)).blob();
      const file = new File([blob], "QRCode.png", {
        type: blob.type,
      });
      await navigator.share({
        files: [file],
        tatle: text,
      });
    } catch (error) {
      alert("Seu navegador não suporta compartilhamento");
    }
  }, 100);
}

function handleSize(qr) {
  size = qr.target.value;
  generateQRCode();
}

function resolveDataUrl() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const img = document.querySelector("#qr-code img");
      if (img.currentScr) {
        resolve(img.currentScr);
        return;
      }
      const canvas = document.querySelector("canvas");
      resolve(canvas.toDataURL());
    }, 50);
  });
}

generateQRCode();
