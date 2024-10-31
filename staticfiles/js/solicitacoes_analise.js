$(document).ready(function() {
    $('#solicitacoes-tabela').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
        },
        paging: true,
        ordering: true,
        info: true,
        searching: true,
        lengthChange: true,
        order: [[2, 'desc']], 
        pageLength: 10
    });

    // Select/Deselect all checkboxes
    $('#select-all').on('click', function() {
        $('.select-row').prop('checked', this.checked);
    });

    // Retorno em lote
    $('#btn-retornar-lote').on('click', function() {
        var selectedRows = $('.select-row:checked');
        if (selectedRows.length > 0) {
            // Implementar lógica de retorno em lote
            alert('Retornando ' + selectedRows.length + ' solicitações');
        }
    });

    // Retorno individual
    $('.btn-nova-solicitacao').on('click', function() {
        // Implementar lógica de retorno individual
        alert('Retornando solicitação');
    });

    lucide.createIcons();
});
