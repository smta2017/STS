document.addEventListener('DOMContentLoaded', function() {
    var sidebarCollapse = document.querySelector('#sidebarCollapse');
    var sidebar = document.querySelector('#sidebar');
    sidebarCollapse.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
});
