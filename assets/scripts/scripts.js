document.addEventListener('DOMContentLoaded', async function () {
    // Загружаем данные из JSON-файла
    const response = await fetch('items.json');
    const data = await response.json();

    // Сохраняем все товары в переменную
    const allItems = data;

    // Получаем все кнопки
    const buttons = document.querySelectorAll('.main-button button');

    // Обработчик события для каждой кнопки
    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Определяем категорию по ID кнопки
            let category = event.target.id.split('-')[0];
            if (!category) category = 'all'; // Если кнопка "Все"

            // Отображаем товары соответствующей категории
            displayItems(allItems, category);
        });
    });

    // Изначально отобразить все товары
    displayItems(allItems, 'all');
});

// Функция для отображения карточек товаров
function displayItems(items, category) {
    const cardsContainer = document.querySelector('.main-cards-box');
    cardsContainer.innerHTML = ''; // Очищаем контейнер

    items.forEach(item => {
        if (category === 'all' || item.category === category) {
            const card = `
                <div class="card ${item.category}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-text">
                        <div class="item-text-brand">
                            <h1>${item.name}</h1>
                            <p>${item.brand}</p>
                        </div>
                        <p class="item-raiting">${item.rating}</p>
                    </div>
                    <div class="item-cost-text">
                        <h2>${item.price}</h2>
                        <p>${item.stock}</p>
                    </div>
                </div>
            `;
            cardsContainer.insertAdjacentHTML('beforeend', card);
        }
    });
}