function isTransparent(bgColor) {
  return (
    bgColor === 'transparent' ||
    bgColor === 'rgba(0, 0, 0, 0)' ||
    bgColor === 'inherit'
  );
}

function applyTextColorBasedOnBackground() {
  document.querySelectorAll('.auto-text').forEach(el => {
    const parentBg = window.getComputedStyle(el.parentElement).backgroundColor;
    if (!isTransparent(parentBg)) {
      el.style.color = '#fff'; // Nếu có nền → chữ trắng
    } else {
      el.style.color = '#000'; // Không có nền → chữ đen
    }
  });
}

window.addEventListener('DOMContentLoaded', applyTextColorBasedOnBackground);