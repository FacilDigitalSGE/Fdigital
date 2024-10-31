document.addEventListener('DOMContentLoaded', function() {
    // Configuração dos menus dropdown
    const setupDropdownMenus = () => {
        const menuLinks = document.querySelectorAll('.nav-link.dropdown-toggle');
        
        menuLinks.forEach(link => {
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

document.addEventListener('DOMContentLoaded', function() {
    initializeGrid();
});

const ROWS_PER_PAGE = 10;
let currentPage = 1;
let filteredRows = [];

function initializeGrid() {
    const table = document.getElementById("ggrid-table");
    if (!table) return;
    
    const rows = Array.from(table.getElementsByTagName("tr")).slice(1);
    filteredRows = rows;
    updatePagination();
    showPage(1);
}

function updatePagination() {
    const totalPages = Math.ceil(filteredRows.length / ROWS_PER_PAGE);
    document.getElementById("total-pages").textContent = totalPages;
    document.getElementById("current-page").textContent = currentPage;
    document.getElementById("total-records").textContent = filteredRows.length;
    document.getElementById("showing-records").textContent = 
        Math.min(currentPage * ROWS_PER_PAGE, filteredRows.length);
    
    document.getElementById("btn-previous").disabled = currentPage === 1;
    document.getElementById("btn-next").disabled = currentPage === totalPages;
}

function showPage(page) {
    currentPage = page;
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    
    filteredRows.forEach((row, index) => {
        row.style.display = (index >= start && index < end) ? "" : "none";
    });
    
    updatePagination();
}

function nextPage() {
    if (currentPage * ROWS_PER_PAGE < filteredRows.length) {
        showPage(currentPage + 1);
    }
}

function previousPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

function filterTable() {
    const input = document.getElementById("search");
    const filter = input.value.toLowerCase();
    const table = document.getElementById("ggrid-table");
    const rows = Array.from(table.getElementsByTagName("tr")).slice(1);
    
    filteredRows = rows.filter(row => {
        const text = Array.from(row.cells)
            .map(cell => cell.textContent.toLowerCase())
            .join(" ");
        const match = text.includes(filter);
        row.style.display = match ? "" : "none";
        return match;
    });
    
    currentPage = 1;
    updatePagination();
    showPage(1);
}function sortTable(columnIndex) {
    const table = document.getElementById("ggrid-table");
    const rows = Array.from(table.rows).slice(1);
    const isAscending = table.getAttribute('data-order') !== 'asc';
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent;
        const bValue = b.cells[columnIndex].textContent;
        
        if (!isNaN(aValue) && !isNaN(bValue)) {
            return isAscending ? aValue - bValue : bValue - aValue;
        }
        return isAscending ? 
            aValue.localeCompare(bValue) : 
            bValue.localeCompare(aValue);
    });

    table.setAttribute('data-order', isAscending ? 'asc' : 'desc');
    
    const tbody = table.getElementsByTagName('tbody')[0];
    rows.forEach(row => tbody.appendChild(row));
}

document.addEventListener('DOMContentLoaded', initializeGrid);

document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});
