document.addEventListener('DOMContentLoaded', function() {
    // Configuração dos menus dropdown
    const setupDropdownMenus = () => {
        const menuLinks = document.querySelectorAll('.nav-link.dropdown-toggle');
        
        menuLinks.forEach(link => {
            // Garante que o submenu existe e está configurado corretamente
            const submenu = link.nextElementSibling;
            if (submenu) {
                submenu.classList.add('submenu');
            }
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Fecha outros menus abertos
                menuLinks.forEach(otherLink => {
                    if (otherLink !== link) {
                        otherLink.classList.remove('open');
                        const otherSubmenu = otherLink.nextElementSibling;
                        if (otherSubmenu) {
                            otherSubmenu.classList.remove('active');
                        }
                    }
                });
                
                // Toggle do menu atual
                this.classList.toggle('open');
                if (submenu) {
                    submenu.classList.toggle('active');
                }
            });
        });
    };

    // Configuração do menu mobile
    const setupMobileMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle') || createMenuToggle();
        const menu = document.querySelector('.menu');
        
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });

        // Fecha o menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    };

    // Função auxiliar para criar o botão de toggle
    const createMenuToggle = () => {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        const topBar = document.querySelector('.top-bar');
        if (topBar) {
            topBar.insertBefore(menuToggle, topBar.firstChild);
        }
        return menuToggle;
    };

    // Inicializa as funcionalidades
    setupDropdownMenus();
    setupMobileMenu();
});