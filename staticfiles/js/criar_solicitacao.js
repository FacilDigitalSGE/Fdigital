document.addEventListener('DOMContentLoaded', function() {
    // Contador de caracteres para o textarea
    const textarea = document.querySelector('textarea');
    const charCount = document.getElementById('charCount');
    
    if (textarea) {
        textarea.addEventListener('input', function() {
            charCount.textContent = `${this.value.length}/500`;
        });
    }

    // Upload de arquivos
    const fileInput = document.getElementById('fileInput');
    const fileUpload = document.querySelector('.file-upload');

    if (fileUpload && fileInput) {
        fileUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUpload.style.borderColor = '#2563eb';
            fileUpload.style.background = 'rgba(37, 99, 235, 0.05)';
        });

        fileUpload.addEventListener('dragleave', (e) => {
            e.preventDefault();
            fileUpload.style.borderColor = '#e2e8f0';
            fileUpload.style.background = 'transparent';
        });

        fileUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            fileInput.files = e.dataTransfer.files;
            updateFileList(e.dataTransfer.files);
        });
    }

    // Atualizar lista de arquivos
    function updateFileList(files) {
        const fileList = Array.from(files)
            .map(file => `<div class="file-item">${file.name}</div>`)
            .join('');
        
        const fileListContainer = document.createElement('div');
        fileListContainer.innerHTML = fileList;
        fileUpload.appendChild(fileListContainer);
    }

    // Data atual
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const date = new Date();
        const formattedDate = date.toLocaleDateString('pt-BR');
        currentDateElement.textContent = formattedDate;
    }
});