const MAX_CHARS = 2900;

const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const downloadBtn = document.getElementById("download-btn");
const errorMsg = document.getElementById("error-msg");
const qrHolder = document.getElementById("qr-canvas-holder");
const echoText = document.getElementById("echo-text");
const scanSweep = document.getElementById("scan-sweep");
const sizeValue = document.getElementById("size-value");
const toast = document.getElementById("toast");

let toastTimer = null;

function updateCharCount() {
  const length = textInput.value.length;
  charCount.textContent = length;
  const canSubmit = length > 0 && length <= MAX_CHARS;
  generateBtn.disabled = !canSubmit;
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.hidden = false;
}

function hideError() {
  errorMsg.hidden = true;
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  // restart the CSS animation
  toast.style.animation = "none";
  void toast.offsetWidth;
  toast.style.animation = "";
  toastTimer = setTimeout(() => { toast.hidden = true; }, 1800);
}

function clearQrHolder() {
  qrHolder.innerHTML = "";
}

function generateQrCode() {
  const rawText = textInput.value.trim();
  if (!rawText) return;

  const text = looksLikeBareDomain(rawText) ? `https://${rawText}` : rawText;

  hideError();
  clearQrHolder();

  try {
    new QRCode(qrHolder, {
      text: text,
      width: 512,
      height: 512,
      correctLevel: QRCode.CorrectLevel.H
    });
  } catch (err) {
    showError("That text is too dense to encode as a QR code. Try shortening it.");
    return;
  }

  echoText.textContent = text;
  echoText.hidden = false;
  sizeValue.textContent = "512×512";
  downloadBtn.disabled = false;

  scanSweep.classList.remove("sweeping");
  void scanSweep.offsetWidth; // restart animation
  scanSweep.classList.add("sweeping");
}

function downloadQrCode() {
  const canvas = qrHolder.querySelector("canvas");
  if (!canvas) {
    showError("Generate a QR code before downloading.");
    return;
  }

  const link = document.createElement("a");
  link.download = "qr-snap.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function copyInputText() {
  const text = textInput.value.trim();
  if (!text) {
    showToast("Nothing to copy yet");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard");
  } catch (err) {
    showToast("Copy failed — select text manually");
  }
}

textInput.addEventListener("input", () => {
  updateCharCount();
  hideError();
});

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !generateBtn.disabled) {
    generateQrCode();
  }
});

generateBtn.addEventListener("click", generateQrCode);
downloadBtn.addEventListener("click", downloadQrCode);
copyBtn.addEventListener("click", copyInputText);

updateCharCount();
