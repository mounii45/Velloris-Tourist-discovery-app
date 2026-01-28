//valides required forms
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//range input type in show listings
 const rangeInput = document.getElementById('range4');
  const rangeOutput = document.getElementById('rangeValue');

  // Set initial value
  rangeOutput.textContent = rangeInput.value;

  rangeInput.addEventListener('input', function() {
    rangeOutput.textContent = this.value;
  });

//nav
const navbarCollapse = document.getElementById("navbarNav");
const pageContent = document.getElementById("pageContent");

if (navbarCollapse && pageContent) {
  navbarCollapse.addEventListener("show.bs.collapse", () => {
    pageContent.classList.add("nav-open");
  });

  navbarCollapse.addEventListener("hide.bs.collapse", () => {
    pageContent.classList.remove("nav-open");
  });
}
