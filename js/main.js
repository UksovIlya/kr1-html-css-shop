// Минимальная логика: модальное окно и обработка формы заявки.
// Скрипт безопасно работает на любой странице (элементы могут отсутствовать).

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button[data-product]');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

// Открытие модального окна по кнопке «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!orderDialog) return;
    if (selectedProductInput) {
      selectedProductInput.value = button.dataset.product;
    }
    successMessage.hidden = true;
    orderDialog.showModal();
  });
});

if (orderDialog) {
  // Закрытие по кнопке «Закрыть».
  closeDialogButton?.addEventListener('click', () => orderDialog.close());

  // Закрытие по клику на затемнённый фон.
  orderDialog.addEventListener('click', (event) => {
    if (event.target === orderDialog) orderDialog.close();
  });
}

if (orderForm) {
  // Снимаем признак ошибки, как только пользователь исправляет поле.
  orderForm.addEventListener('input', (event) => {
    event.target.removeAttribute('aria-invalid');
  });

  orderForm.addEventListener('submit', (event) => {
    // Backend пока не подключён — отменяем стандартную отправку.
    event.preventDefault();

    const fields = Array.from(orderForm.elements).filter((el) => el.willValidate);
    fields.forEach((el) => el.removeAttribute('aria-invalid'));

    if (!orderForm.checkValidity()) {
      fields.forEach((el) => {
        if (!el.checkValidity()) el.setAttribute('aria-invalid', 'true');
      });
      orderForm.reportValidity();
      return;
    }

    orderForm.reset();
    orderDialog?.close();
    successMessage.hidden = false;
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
