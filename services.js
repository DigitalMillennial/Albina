/* ============================================ */
/* MODAL FUNCTIONS - Функции модального окна */
/* ============================================ */

/**
 * Открытие модального окна с формой запроса услуги
 * @param {string} type - Тип услуги ('oral', 'ecrite', 'admin')
 */
function openModal(type) {
  // Создание элемента модального окна
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('tabindex', '-1');
  
  // Определение заголовка в зависимости от типа услуги
  let serviceTitle = '';
  if (type === 'oral') {
    serviceTitle = 'Traduction orale';
  } else if (type === 'ecrite') {
    serviceTitle = 'Traduction écrite';
  } else {
    serviceTitle = 'Accompagnement';
  }
  
  // Определение контента правой стороны
  let rightSideContent = '';
  
  if (type === 'ecrite') {
    // Для письменного перевода - только загрузка документа
    rightSideContent = `
      <div class="col-md-6">
        <h6 class="mb-3" style="color: #333; font-weight: 600;">Document à traduire</h6>
        <div class="document-upload-area">
          <div class="upload-icon">
            <i class="fas fa-file-upload"></i>
          </div>
          <p class="upload-text">Glissez votre document ici ou cliquez pour sélectionner</p>
          <div class="file-input-wrapper">
            <input type="file" id="document-${type}" name="document" accept=".pdf,.doc,.docx" required onchange="displayFileName('${type}')">
            <label for="document-${type}" class="file-input-label">
              <i class="fas fa-folder-open"></i> Choisir un fichier
            </label>
          </div>
          <div id="file-name-${type}" class="file-name-display"></div>
          <p style="font-size: 12px; color: #999; margin-top: 15px;">Formats acceptés: PDF, DOC, DOCX</p>
        </div>
      </div>
    `;
  } else {
    // Для устных услуг и сопровождения - выбор даты и времени
    rightSideContent = `
      <div class="col-md-6">
        <h6 class="mb-3" style="color: #333; font-weight: 600;">Choisir la date et l'heure</h6>
        
        <div class="date-picker-wrapper">
          <!-- Кнопка выбора даты (свернутый вид) -->
          <div class="date-select-button" id="date-button-${type}" onclick="toggleCalendar('${type}')">
            <span id="date-text-${type}">Sélectionner une date</span>
            <i class="fas fa-calendar-alt"></i>
          </div>
          
          <!-- Календарь (развернутый вид, скрыт по умолчанию) -->
          <div id="calendar-container-${type}" class="calendar-container">
            <div id="inline-calendar-${type}"></div>
          </div>
          
          <!-- Скрытое поле для хранения выбранной даты -->
          <input type="hidden" id="selected-date-${type}" name="selected_date" required>
        </div>
        
        <!-- Контейнер выбора времени (появляется после выбора даты) -->
        <div id="time-picker-${type}" class="time-picker-container">
          <!-- Кнопка выбора времени (свернутый вид) -->
          <div class="time-select-button" id="time-button-${type}" onclick="toggleClock('${type}')">
            <span id="time-text-${type}">Sélectionner une heure</span>
            <i class="fas fa-clock"></i>
          </div>
          
          <!-- Контейнер часов (развернутый вид, скрыт по умолчанию) -->
          <div id="clock-container-${type}" class="clock-container">
            <label class="time-label">Heure souhaitée</label>
            
            <!-- Отображение выбранного времени -->
            <div class="time-display" id="time-display-${type}">--:--</div>
            
            <!-- Круглый циферблат -->
            <div class="clock-picker" id="clock-picker-${type}">
              <!-- Центральная точка -->
              <div class="clock-center"></div>
              <!-- Стрелка -->
              <div class="clock-hand" id="clock-hand-${type}"></div>
              <!-- Цифры будут добавлены динамически -->
            </div>
          </div>
          
          <!-- Скрытое поле для хранения времени -->
          <input type="hidden" id="selected-time-${type}" name="selected_time" required>
        </div>
      </div>
    `;
  }
  
  // HTML разметка модального окна
  modal.innerHTML = `
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <!-- Заголовок модального окна -->
        <div class="modal-header">
          <h5 class="modal-title">Demande de service: ${serviceTitle}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
        </div>
        
        <!-- Тело модального окна -->
        <div class="modal-body">
          <form id="form-${type}">
            <div class="row g-4">
              
              <!-- ЛЕВАЯ СТОРОНА: Поля ввода данных -->
              <div class="col-md-6">
                <h6 class="mb-3" style="color: #333; font-weight: 600;">Vos informations</h6>
                
                <!-- Поле: Имя -->
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Nom" name="nom" required>
                </div>
                
                <!-- Поле: Фамилия -->
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Prénom" name="prenom" required>
                </div>
                
                <!-- Поле: Телефон -->
                <div class="mb-3">
                  <input type="tel" class="form-control" placeholder="Téléphone" name="telephone" required>
                </div>
                
                <!-- Поле: Email -->
                <div class="mb-3">
                  <input type="email" class="form-control" placeholder="Email" name="email" required>
                </div>
              </div>
              
              <!-- ПРАВАЯ СТОРОНА: Календарь/время или загрузка документа -->
              ${rightSideContent}
              
            </div>
          </form>
        </div>
        
        <!-- Подвал модального окна с кнопками -->
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button class="btn btn-primary" onclick="submitForm('${type}')">Envoyer</button>
        </div>
      </div>
    </div>
  `;
  
  // Добавление модального окна в DOM
  document.getElementById('modalContainer').appendChild(modal);
  
  // Инициализация Bootstrap модального окна
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  
  // Инициализация календаря и часов только для типов 'oral' и 'admin'
  if (type !== 'ecrite') {
    initCalendar(type);
  }
  
  // Удаление модального окна из DOM после закрытия
  modal.addEventListener('hidden.bs.modal', () => {
    modal.remove();
  });
}

/**
 * Переключение отображения календаря (свернуть/развернуть)
 * @param {string} type - Тип услуги
 */
function toggleCalendar(type) {
  const calendarContainer = document.getElementById(`calendar-container-${type}`);
  calendarContainer.classList.toggle('active');
}

/**
 * Переключение отображения часов (свернуть/развернуть)
 * @param {string} type - Тип услуги
 */
function toggleClock(type) {
  const clockContainer = document.getElementById(`clock-container-${type}`);
  clockContainer.classList.toggle('active');
}

/**
 * Инициализация inline календаря
 * @param {string} type - Тип услуги
 */
function initCalendar(type) {
  const calendarInstance = flatpickr(`#inline-calendar-${type}`, {
    inline: true,
    minDate: 'today',
    locale: 'fr',
    dateFormat: 'Y-m-d',
    
    // Обработчик изменения даты
    onChange: function(selectedDates, dateStr, instance) {
      if (selectedDates.length > 0) {
        const selectedDate = selectedDates[0];
        
        // Сохранение выбранной даты в скрытое поле
        document.getElementById(`selected-date-${type}`).value = dateStr;
        
        // Форматирование даты для отображения (например: "15 janvier 2025")
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = selectedDate.toLocaleDateString('fr-FR', options);
        
        // Обновление текста кнопки
        document.getElementById(`date-text-${type}`).textContent = formattedDate;
        
        // Свернуть календарь после выбора
        const calendarContainer = document.getElementById(`calendar-container-${type}`);
        calendarContainer.classList.remove('active');
        
        // Показать контейнер выбора времени
        const timePickerContainer = document.getElementById(`time-picker-${type}`);
        timePickerContainer.classList.add('active');
        
        // Инициализация круглого выбора времени (если еще не инициализирован)
        if (!timePickerContainer.dataset.initialized) {
          initClockPicker(type);
          timePickerContainer.dataset.initialized = 'true';
        }
      }
    }
  });
}

/**
 * Инициализация круглого выбора времени (clock picker)
 * @param {string} type - Тип услуги
 */
function initClockPicker(type) {
  const clockPicker = document.getElementById(`clock-picker-${type}`);
  const clockHand = document.getElementById(`clock-hand-${type}`);
  const timeDisplay = document.getElementById(`time-display-${type}`);
  
  let currentMode = 'hours'; // 'hours' или 'minutes'
  let selectedHour = null;
  let selectedMinute = null;
  
  // Создание цифр на циферблате
  function createClockNumbers(mode) {
    // Удаление существующих цифр
    const existingNumbers = clockPicker.querySelectorAll('.clock-number');
    existingNumbers.forEach(num => num.remove());
    
    const numbers = mode === 'hours' ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const radius = 50; // Уменьшенный радиус для размера 150px
    
    numbers.forEach((num, index) => {
      const angle = (index * 30 - 90) * (Math.PI / 180); // Начинаем с 12 часов (верх)
      const x = radius * Math.cos(angle) + 75 - 15; // Центр (75) - размер элемента/2 (15)
      const y = radius * Math.sin(angle) + 75 - 15;
      
      const numberDiv = document.createElement('div');
      numberDiv.className = 'clock-number';
      numberDiv.textContent = num;
      numberDiv.style.left = x + 'px';
      numberDiv.style.top = y + 'px';
      
      // Обработчик клика на цифру
      numberDiv.addEventListener('click', () => {
        if (mode === 'hours') {
          selectedHour = num;
          updateClockDisplay();
          // Переключение на выбор минут
          currentMode = 'minutes';
          createClockNumbers('minutes');
        } else {
          selectedMinute = num;
          updateClockDisplay();
          // Сохранение времени
          const timeString = `${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`;
          document.getElementById(`selected-time-${type}`).value = timeString;
          
          // Обновление текста кнопки времени
          document.getElementById(`time-text-${type}`).textContent = timeString;
          
          // Свернуть контейнер часов после выбора
          const clockContainer = document.getElementById(`clock-container-${type}`);
          clockContainer.classList.remove('active');
        }
      });
      
      clockPicker.appendChild(numberDiv);
    });
  }
  
  // Обновление отображения времени
  function updateClockDisplay() {
    const hourStr = selectedHour !== null ? String(selectedHour).padStart(2, '0') : '--';
    const minuteStr = selectedMinute !== null ? String(selectedMinute).padStart(2, '0') : '--';
    timeDisplay.textContent = `${hourStr}:${minuteStr}`;
  }
  
  // Инициализация: показываем часы
  createClockNumbers('hours');
}

/**
 * Отображение имени выбранного файла
 * @param {string} type - Тип услуги
 */
function displayFileName(type) {
  const fileInput = document.getElementById(`document-${type}`);
  const fileNameDisplay = document.getElementById(`file-name-${type}`);
  
  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    fileNameDisplay.textContent = `Fichier sélectionné: ${fileName}`;
    fileNameDisplay.classList.add('active');
  }
}

/**
 * Отправка формы с валидацией
 * @param {string} type - Тип услуги
 */
function submitForm(type) {
  const form = document.getElementById(`form-${type}`);
  
  // Проверка валидности формы
  if (form.checkValidity()) {
    // Получение данных формы
    const formData = new FormData(form);
    
    // Здесь можно добавить отправку данных на сервер
    // Например: fetch('/api/submit-service-request', { method: 'POST', body: formData })
    
    // Показать сообщение об успешной отправке
    alert('Demande envoyée avec succès! Nous vous contactons bientôt.');
    
    // Закрыть модальное окно
    const modalElement = form.closest('.modal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  } else {
    // Показать ошибки валидации
    form.reportValidity();
  }
}
