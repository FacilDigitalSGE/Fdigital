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

        fileInput.addEventListener('change', function() {
            updateFileList(this.files);
        });
    }

    // Funcionalidade Prioridade Idoso
    const elderlyToggle = document.getElementById('elderlyToggle');
    const elderlyDocContainer = document.getElementById('elderlyDocContainer');

    if (elderlyToggle) {
        elderlyToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const confirmacao = window.confirm('Você confirma que o pedido que será encaminhado por esta solicitação é de um cidadão que possui os direitos previstos no Estatuto do Idoso?');
            
            if (confirmacao) {
                this.checked = true;
                elderlyDocContainer.style.display = 'block';
                this.nextElementSibling.style.backgroundColor = '#22c55e';
            } else {
                this.checked = false;
                elderlyDocContainer.style.display = 'none';
                this.nextElementSibling.style.backgroundColor = '#94a3b8';
            }
        });
    }

    // Atualizar nome do arquivo selecionado
    const elderlyDocInput = document.getElementById('elderlyDocInput');
    if (elderlyDocInput) {
        elderlyDocInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const fileName = this.files[0].name;
                this.nextElementSibling.textContent = `Arquivo selecionado: ${fileName}`;
            }
        });
    }

    function updateFileList(files) {
        const fileList = document.getElementById('fileList');
        
        Array.from(files).forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            fileItem.innerHTML = `
                <span>${file.name}</span>
                <input type="text" class="file-name-input" placeholder="Nome do documento">
                <span class="remove-file">❌</span>
            `;
            
            const removeButton = fileItem.querySelector('.remove-file');
            removeButton.addEventListener('click', () => fileItem.remove());
            
            fileList.appendChild(fileItem);
        });
    }

    // Data atual
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const date = new Date();
        const formattedDate = date.toLocaleDateString('pt-BR');
        currentDateElement.textContent = formattedDate;
    }
});