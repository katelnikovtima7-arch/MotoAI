// MotoAI - Основной скрипт приложения
// Обработка сообщений, анимации, имитация ответа ИИ

document.addEventListener('DOMContentLoaded', function() {

  // --- DOM Элементы ---
  const chatContainer = document.getElementById('chatContainer');
  const messagesList = document.getElementById('messagesList');
  const welcomeScreen = document.getElementById('welcomeScreen');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const adPlaceholder = document.getElementById('adPlaceholder');
  const placeholderOverlay = document.getElementById('placeholderOverlay');

  // --- Массив подсказок для плавной смены ---
  const placeholders = [
    'Чем я могу помочь?',
    'Задайте вопрос о мототехнике...',
    'Хотите подобрать мотоцикл?',
    'Спросите MotoAI...',
    'О чём вы хотите узнать?',
    'Нужна помощь с ремонтом?',
    'Какой мотоцикл выбрать?',
    'Диагностика по симптомам...'
  ];

  let currentPlaceholderIndex = 0;
  let placeholderInterval;
  let isUserScrolledUp = false;

  // --- Функция плавной смены подсказок ---
  function startPlaceholderRotation() {
    placeholderInterval = setInterval(function() {
      // Плавно скрываем текущий текст
      placeholderOverlay.style.opacity = '0';
      placeholderOverlay.style.transition = 'opacity 0.4s ease';

      setTimeout(function() {
        // Меняем индекс
        currentPlaceholderIndex = (currentPlaceholderIndex + 1) % placeholders.length;
        // Меняем текст
        placeholderOverlay.textContent = placeholders[currentPlaceholderIndex];
        // Плавно показываем новый текст
        placeholderOverlay.style.opacity = '1';
      }, 400);
    }, 3000);
  }

  // Запускаем смену подсказок
  startPlaceholderRotation();

  // --- Функция автоскролла вниз ---
  function scrollToBottom() {
    if (!isUserScrolledUp) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  // --- Отслеживание ручной прокрутки ---
  chatContainer.addEventListener('scroll', function() {
    const threshold = 100; // пикселей до низа
    const distanceToBottom = chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight;
    isUserScrolledUp = distanceToBottom > threshold;
  });

  // --- Создание элемента сообщения ---
  function createMessageElement(text, sender, timestamp) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + sender;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';

    const textP = document.createElement('p');
    textP.textContent = text;

    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = timestamp;

    bubbleDiv.appendChild(textP);
    bubbleDiv.appendChild(timeSpan);
    messageDiv.appendChild(bubbleDiv);

    return messageDiv;
  }

  // --- Добавление сообщения в чат ---
  function addMessageToChat(text, sender) {
    // Если это первое сообщение, скрываем приветственный экран
    if (welcomeScreen.style.display !== 'none') {
      welcomeScreen.style.display = 'none';
      adPlaceholder.style.display = 'block';
    }

    // Форматируем время
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timestamp = hours + ':' + minutes;

    // Создаём элемент сообщения
    const messageElement = createMessageElement(text, sender, timestamp);
    
    // Добавляем в список сообщений
    messagesList.appendChild(messageElement);

    // Принудительный рефлоу для анимации появления
    void messageElement.offsetWidth;
    
    // Запускаем анимацию появления
    messageElement.classList.add('visible');

    // Прокручиваем чат вниз
    setTimeout(scrollToBottom, 100);
  }

  // --- Имитация ответа ИИ ---
  function simulateAIResponse(userMessage) {
    // Показываем индикатор "печатает"
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message ai typing';
    typingIndicator.id = 'typingIndicator';
    
    const typingBubble = document.createElement('div');
    typingBubble.className = 'message-bubble typing-bubble';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      dot.className = 'typing-dot';
      typingBubble.appendChild(dot);
    }
    
    typingIndicator.appendChild(typingBubble);
    messagesList.appendChild(typingIndicator);
    scrollToBottom();

    // Имитация задержки ответа
    const responseDelay = 1000 + Math.random() * 1500;

    setTimeout(function() {
      // Удаляем индикатор печати
      const indicator = document.getElementById('typingIndicator');
      if (indicator) {
        indicator.remove();
      }

      // Формируем тестовый ответ
      let aiResponse = 'Скоро здесь будет настоящий MotoAI.';
      
      // Разные варианты ответа для разнообразия
      const responses = [
        'Скоро здесь будет настоящий MotoAI. Ваш вопрос: "' + userMessage + '" принят в обработку.',
        'Отличный вопрос! MotoAI скоро сможет отвечать на такие запросы.',
        'Я пока в разработке, но совсем скоро смогу помочь с этим вопросом.',
        'Спасибо за вопрос! Искусственный интеллект MotoAI сейчас обучается.',
        'Интересно! Совсем скоро я смогу дать развёрнутый ответ.'
      ];
      
      aiResponse = responses[Math.floor(Math.random() * responses.length)];

      // Добавляем ответ ИИ
      addMessageToChat(aiResponse, 'ai');
    }, responseDelay);
  }

  // --- Обработка отправки сообщения ---
  function handleSendMessage() {
    const text = messageInput.value.trim();
    
    if (text === '') {
      return;
    }

    // Добавляем сообщение пользователя
    addMessageToChat(text, 'user');

    // Очищаем поле ввода
    messageInput.value = '';
    
    // Автоматически подгоняем высоту поля ввода
    messageInput.style.height = 'auto';
    
    // Фокусируемся обратно на поле ввода
    messageInput.focus();

    // Запускаем имитацию ответа ИИ
    simulateAIResponse(text);
  }

  // --- Обработчик кнопки отправки ---
  sendButton.addEventListener('click', function(e) {
    e.preventDefault();
    handleSendMessage();
  });

  // --- Обработчик нажатия Enter ---
  messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // --- Автоматическая высота поля ввода ---
  messageInput.addEventListener('input', function() {
    // Сбрасываем высоту
    this.style.height = 'auto';
    // Устанавливаем новую высоту по содержимому
    const newHeight = Math.min(this.scrollHeight, 120);
    this.style.height = newHeight + 'px';
    
    // Скрываем или показываем оверлей подсказки
    if (this.value.length > 0) {
      placeholderOverlay.style.opacity = '0';
    } else {
      placeholderOverlay.style.opacity = '1';
    }
  });

  // --- Инициализация ---
  // Устанавливаем начальную высоту поля ввода
  messageInput.style.height = 'auto';
  
  // Фокусируем поле ввода при загрузке
  messageInput.focus();

  // Отключаем кнопку отправки пока поле пустое (визуально)
  function updateSendButtonState() {
    if (messageInput.value.trim() === '') {
      sendButton.style.opacity = '0.5';
      sendButton.style.pointerEvents = 'none';
    } else {
      sendButton.style.opacity = '1';
      sendButton.style.pointerEvents = 'auto';
    }
  }

  // Проверяем состояние кнопки при вводе
  messageInput.addEventListener('input', updateSendButtonState);
  
  // Начальное состояние
  updateSendButtonState();

  console.log('MotoAI инициализирован и готов к работе.');
});
