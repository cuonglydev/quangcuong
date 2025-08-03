 const text = "Web developer.";
  const target = document.getElementById("type-target");
  const cursor = document.getElementById("cursor");

  let index = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayAfterTyping = 3000;

  function type() {
    if (!isDeleting) {
      cursor.style.animation = 'none'; // Không nháy khi đang gõ
      if (index < text.length) {
        target.textContent += text.charAt(index);
        index++;
        setTimeout(type, typingSpeed);
      } else {
        // Đã gõ xong -> nháy trong 3s
        cursor.style.animation = 'blink 0.7s step-end infinite';
        setTimeout(() => {
          isDeleting = true;
          type();
        }, delayAfterTyping);
      }
    } else {
      cursor.style.animation = 'none'; // Không nháy khi đang xoá
      if (index > 0) {
        target.textContent = text.substring(0, index - 1);
        index--;
        setTimeout(type, deletingSpeed);
      } else {
        isDeleting = false;
        type();
      }
    }
  }

  type();