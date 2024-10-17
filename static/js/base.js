function toggleMenu(menuId) {
    console.log("Função toggleMenu chamada para o menu:", menuId);
    var submenu = document.getElementById(menuId);
    var link = submenu.previousElementSibling;

    submenu.classList.toggle('active');
    link.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function() {
    var dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            var menuId = this.getAttribute('data-target');
            toggleMenu(menuId);
        });
    });
});
