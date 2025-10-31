function openCourseModal(type) {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('tabindex', '-1');

  let courseName = '';
  switch (type) {
    case 'individuel': courseName = 'Cours individuel'; break;
    case 'a1': courseName = 'Cours de groupe A1'; break;
    case 'a2': courseName = 'Cours de groupe A2'; break;
    case 'b1': courseName = 'Cours de groupe B1'; break;
  }

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Inscription: ${courseName}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form id="form-${type}">
            <div class="mb-3"><input type="text" class="form-control" placeholder="Nom" required></div>
            <div class="mb-3"><input type="text" class="form-control" placeholder="Prénom" required></div>
            <div class="mb-3"><input type="email" class="form-control" placeholder="E-mail" required></div>
            <div class="mb-3"><input type="tel" class="form-control" placeholder="Téléphone" required></div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button class="btn btn-primary" onclick="submitCourseForm('${type}')">Suivant</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modalContainer').appendChild(modal);
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();

  modal.addEventListener('hidden.bs.modal', () => modal.remove());
}

function submitCourseForm(type) {
  const form = document.getElementById(`form-${type}`);
  if (form.checkValidity()) {
    alert('Votre inscription a été envoyée avec succès !');
    const modalElement = form.closest('.modal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  } else {
    form.reportValidity();
  }
}

