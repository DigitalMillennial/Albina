/* ============================================ */
/* NAVIGATION FUNCTIONS - Функции навигации */
/* ============================================ */

/**
 * Показать определенную секцию и скрыть остальные
 * @param {string} sectionName - Название секции для отображения
 */
function showSection(sectionName) {
  // Скрыть все секции
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.classList.remove('active'));
  
  // Показать выбранную секцию
  const targetSection = document.getElementById(`section-${sectionName}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Обновить активный пункт меню
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  event.currentTarget.classList.add('active');
  
  // Обновить заголовок страницы
  const pageTitles = {
    'dashboard': 'Dashboard',
    'courses': 'Gestion des cours',
    'services': 'Gestion des services',
    'bookings': 'Réservations',
    'students': 'Étudiants',
    'resources': 'Ressources',
    'pages': 'Pages du site',
    'settings': 'Paramètres'
  };
  
  document.getElementById('pageTitle').textContent = pageTitles[sectionName] || 'Dashboard';
  
  // Закрыть сайдбар на мобильных устройствах
  if (window.innerWidth <= 1024) {
    document.getElementById('sidebar').classList.remove('active');
  }
}

/**
 * Переключить видимость сайдбара (для мобильных устройств)
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

/* ============================================ */
/* COURSES MANAGEMENT - Управление курсами */
/* ============================================ */

/**
 * Открыть модальное окно для добавления/редактирования курса
 * @param {number} courseId - ID курса (null для нового курса)
 */
function openCourseModal(courseId = null) {
  const isEdit = courseId !== null;
  const modalTitle = isEdit ? 'Modifier le cours' : 'Ajouter un nouveau cours';
  
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('tabindex', '-1');
  
  modal.innerHTML = `
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${modalTitle}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form id="courseForm">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Nom du cours</label>
                <input type="text" class="form-control" name="name" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Niveau</label>
                <select class="form-select" name="level" required>
                  <option value="">Sélectionner...</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="all">Tous niveaux</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Type</label>
                <select class="form-select" name="type" required>
                  <option value="">Sélectionner...</option>
                  <option value="individual">Individuel</option>
                  <option value="group">Groupe</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Prix (€)</label>
                <input type="number" class="form-control" name="price" required>
              </div>
            </div>
           <div class="row">
  <div class="col-md-6 mb-3">
    <label class="form-label">Durée</label>
    <div class="d-flex gap-2">
      <div class="flex-fill">
        <input type="number" class="form-control" name="duration_hours" placeholder="Heures" min="0" required>
      </div>
      <div class="flex-fill">
        <input type="number" class="form-control" name="duration_weeks" placeholder="Semaines" min="0">
      </div>
    </div>
  </div>
  <div class="col-md-6 mb-3">
    <label class="form-label">Statut</label>
    <select class="form-select" name="status" required>
      <option value="active">Actif</option>
      <option value="inactive">Inactif</option>
    </select>
  </div>
</div>

            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" name="description" rows="4" required></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button class="btn btn-primary" onclick="saveCourse(${courseId})">
            ${isEdit ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('modalContainer').appendChild(modal);
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  
  modal.addEventListener('hidden.bs.modal', () => modal.remove());
}

/**
 * Сохранить курс (заглушка)
 * @param {number} courseId - ID курса
 */
function saveCourse(courseId) {
  const form = document.getElementById('courseForm');
  if (form.checkValidity()) {
    alert('Cours enregistré avec succès! (Fonction de démonstration)');
    bootstrap.Modal.getInstance(form.closest('.modal')).hide();
    // Здесь будет отправка данных на сервер Laravel
  } else {
    form.reportValidity();
  }
}

/**
 * Редактировать курс
 * @param {number} courseId - ID курса
 */
function editCourse(courseId) {
  openCourseModal(courseId);
  // Здесь будет загрузка данных курса с сервера
  console.log('Édition du cours ID:', courseId);
}

/**
 * Удалить курс (заглушка)
 * @param {number} courseId - ID курса
 */
function deleteCourse(courseId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce cours?')) {
    alert('Cours supprimé! (Fonction de démonstration)');
    // Здесь будет отправка запроса на удаление на сервер
    console.log('Suppression du cours ID:', courseId);
  }
}

/* ============================================ */
/* SERVICES MANAGEMENT - Управление услугами */
/* ============================================ */

/**
 * Открыть модальное окно для добавления/редактирования услуги
 */
function openServiceModal(serviceId = null) {
  const isEdit = serviceId !== null;
  const modalTitle = isEdit ? 'Modifier le service' : 'Ajouter un nouveau service';
  
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('tabindex', '-1');
  
  modal.innerHTML = `
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${modalTitle}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form id="serviceForm">
            <div class="mb-3">
              <label class="form-label">Nom du service</label>
              <input type="text" class="form-control" name="name" required>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Type</label>
                <input type="text" class="form-control" name="type" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Prix</label>
                <input type="text" class="form-control" name="price" placeholder="Ex: 20€/h" required>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" name="description" rows="4" required></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Statut</label>
              <select class="form-select" name="status" required>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button class="btn btn-primary" onclick="saveService(${serviceId})">
            ${isEdit ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('modalContainer').appendChild(modal);
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  
  modal.addEventListener('hidden.bs.modal', () => modal.remove());
}

function saveService(serviceId) {
  const form = document.getElementById('serviceForm');
  if (form.checkValidity()) {
    alert('Service enregistré avec succès!');
    bootstrap.Modal.getInstance(form.closest('.modal')).hide();
  } else {
    form.reportValidity();
  }
}

function editService(serviceId) {
  openServiceModal(serviceId);
  console.log('Édition du service ID:', serviceId);
}

function deleteService(serviceId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce service?')) {
    alert('Service supprimé!');
    console.log('Suppression du service ID:', serviceId);
  }
}

/* ============================================ */
/* BOOKINGS MANAGEMENT - Управление заявками */
/* ============================================ */

function filterBookings(status) {
  console.log('Filtrage des réservations par statut:', status);
  // Здесь будет логика фильтрации
}

function viewBooking(bookingId) {
  alert(`Affichage de la réservation #${bookingId} (Fonction de démonstration)`);
  console.log('Affichage de la réservation ID:', bookingId);
}

function editBooking(bookingId) {
  alert(`Édition de la réservation #${bookingId} (Fonction de démonstration)`);
  console.log('Édition de la réservation ID:', bookingId);
}

function deleteBooking(bookingId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation?')) {
    alert('Réservation supprimée!');
    console.log('Suppression de la réservation ID:', bookingId);
  }
}

/* ============================================ */
/* STUDENTS MANAGEMENT - Управление студентами */
/* ============================================ */

function openStudentModal(studentId = null) {
  const isEdit = studentId !== null;
  const modalTitle = isEdit ? 'Modifier l\'étudiant' : 'Ajouter un nouvel étudiant';
  
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('tabindex', '-1');
  
  modal.innerHTML = `
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${modalTitle}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form id="studentForm">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Nom</label>
                <input type="text" class="form-control" name="lastname" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Prénom</label>
                <input type="text" class="form-control" name="firstname" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" name="email" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Téléphone</label>
                <input type="tel" class="form-control" name="phone" required>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Niveau</label>
              <select class="form-select" name="level" required>
                <option value="">Sélectionner...</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Notes</label>
              <textarea class="form-control" name="notes" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button class="btn btn-primary" onclick="saveStudent(${studentId})">
            ${isEdit ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('modalContainer').appendChild(modal);
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  
  modal.addEventListener('hidden.bs.modal', () => modal.remove());
}

function saveStudent(studentId) {
  const form = document.getElementById('studentForm');
  if (form.checkValidity()) {
    alert('Étudiant enregistré avec succès!');
    bootstrap.Modal.getInstance(form.closest('.modal')).hide();
  } else {
    form.reportValidity();
  }
}

function searchStudents(query) {
  console.log('Recherche d\'étudiants:', query);
  // Здесь будет логика поиска
}

function viewStudent(studentId) {
  alert(`Affichage de l'étudiant ID: ${studentId}`);
  console.log('Affichage de l\'étudiant ID:', studentId);
}

function editStudent(studentId) {
  openStudentModal(studentId);
  console.log('Édition de l\'étudiant ID:', studentId);
}

function deleteStudent(studentId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant?')) {
    alert('Étudiant supprimé!');
    console.log('Suppression de l\'étudiant ID:', studentId);
  }
}

/* ============================================ */
/* RESOURCES MANAGEMENT - Управление ресурсами */
/* ============================================ */

function openResourceModal(resourceId = null) {
  const isEdit = resourceId !== null;
  const modalTitle = isEdit ? 'Modifier la ressource' : 'Ajouter une nouvelle ressource';
  
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('tabindex', '-1');
  
  modal.innerHTML = `
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${modalTitle}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form id="resourceForm">
            <div class="mb-3">
              <label class="form-label">Titre</label>
              <input type="text" class="form-control" name="title" required>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Catégorie</label>
                <select class="form-select" name="category" required>
                  <option value="">Sélectionner...</option>
                  <option value="grammaire">Grammaire</option>
                  <option value="vocabulaire">Vocabulaire</option>
                  <option value="exercices">Exercices</option>
                  <option value="audio">Audio</option>
                  <option value="video">Vidéo</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Niveau</label>
                <select class="form-select" name="level" required>
                  <option value="">Sélectionner...</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="A1-A2">A1-A2</option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Fichier</label>
              <input type="file" class="form-control" name="file" ${isEdit ? '' : 'required'}>
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" name="description" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button class="btn btn-primary" onclick="saveResource(${resourceId})">
            ${isEdit ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('modalContainer').appendChild(modal);
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  
  modal.addEventListener('hidden.bs.modal', () => modal.remove());
}

function saveResource(resourceId) {
  const form = document.getElementById('resourceForm');
  if (form.checkValidity()) {
    alert('Ressource enregistrée avec succès!');
    bootstrap.Modal.getInstance(form.closest('.modal')).hide();
  } else {
    form.reportValidity();
  }
}

function downloadResource(resourceId) {
  alert(`Téléchargement de la ressource ID: ${resourceId}`);
  console.log('Téléchargement de la ressource ID:', resourceId);
}

function editResource(resourceId) {
  openResourceModal(resourceId);
  console.log('Édition de la ressource ID:', resourceId);
}

function deleteResource(resourceId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette ressource?')) {
    alert('Ressource supprimée!');
    console.log('Suppression de la ressource ID:', resourceId);
  }
}

/* ============================================ */
/* PAGES MANAGEMENT - Управление страницами */
/* ============================================ */

function editPage(pageName) {
  alert(`Édition de la page: ${pageName} (Fonction de démonstration)\n\nCette fonctionnalité ouvrira un éditeur de contenu.`);
  console.log('Édition de la page:', pageName);
}

function previewPage(pageName) {
  window.open(`${pageName}.html`, '_blank');
}

/* ============================================ */
/* INITIALIZATION - Инициализация */
/* ============================================ */

// Закрыть сайдбар при клике вне его на мобильных
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  
  if (window.innerWidth <= 1024) {
    if (!sidebar.contains(event.target) && !mobileToggle.contains(event.target)) {
      sidebar.classList.remove('active');
    }
  }
});

// Предотвратить закрытие сайдбара при клике внутри него
document.getElementById('sidebar').addEventListener('click', function(event) {
  event.stopPropagation();
});

console.log('Admin panel initialized. Ready for Laravel integration.');
