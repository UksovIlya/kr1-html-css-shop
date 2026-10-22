// Элементы страницы. На некоторых страницах часть из них отсутствует.
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

// Открываем модальное окно и записываем выбранный товар в скрытое поле.
if (orderDialog) {
    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            selectedProductInput.value = button.dataset.product;
            orderDialog.showModal();
        });
    });
}

// Закрываем модальное окно по кнопке «Закрыть».
if (orderDialog && closeDialogButton) {
    closeDialogButton.addEventListener('click', () => {
        orderDialog.close();
    });
}

// Обрабатываем отправку формы.
if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
        // Backend пока не подключён, поэтому отменяем стандартную отправку.
        event.preventDefault();

        // Сбрасываем предыдущие признаки ошибок.
        const formElements = Array.from(orderForm.elements);
        formElements.forEach((element) => {
            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }
        });

        // Проверяем встроенные HTML-ограничения формы.
        if (!orderForm.checkValidity()) {
            formElements.forEach((element) => {
                if (element.willValidate && !element.checkValidity()) {
                    element.setAttribute('aria-invalid', 'true');
                }
            });

            // Показываем стандартные сообщения браузера.
            orderForm.reportValidity();
            return;
        }

        // Показываем сообщение об успехе, очищаем форму, закрываем окно.
        successMessage.hidden = false;
        orderForm.reset();
        if (orderDialog) {
            orderDialog.close();
        }
    });
}


// Если изображение товара не загрузилось, показываем локальную заглушку.
document.querySelectorAll('.product-card__image, .product-detail__image').forEach((image) => {
    image.addEventListener('error', () => {
        if (image.dataset.fallbackApplied === 'true') {
            return;
        }

        image.dataset.fallbackApplied = 'true';
        image.src = 'images/product-placeholder.svg';
        image.alt = 'Изображение товара временно недоступно';
    });
});


// Показываем четвёртый отзыв по кнопке и прокручиваем страницу к нему.
const showFourthReviewButton = document.getElementById('show-fourth-review');
const fourthReview = document.getElementById('review-four');

if (showFourthReviewButton && fourthReview) {
    showFourthReviewButton.addEventListener('click', () => {
        fourthReview.hidden = false;
        fourthReview.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showFourthReviewButton.disabled = true;
    });
}
