var toggleButton = document.querySelector('.toggle-button');
var sidebar = document.querySelector('.sidebar');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});