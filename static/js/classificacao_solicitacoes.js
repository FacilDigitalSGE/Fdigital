$(document).ready(function() {
    $('#classificacao-tabela').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
        },
        paging: true,
        ordering: true,
        info: true,
        searching: true,
        lengthChange: true,
        order: [[2, 'desc']], // Ordena pela coluna do protocolo
        pageLength: 10
    });

    // Apply classification to all selected rows (classificação em massa)
    $('#apply-classification').on('click', function() {
        var selectedClass = $('#classificar-em-lote').val();
        if (selectedClass) {
            $('.select-row:checked').each(function() {
                $(this).closest('tr').find('.classification-dropdown').val(selectedClass);
            });
        }
    });

    // Select/Deselect all checkboxes
    $('#select-all').on('click', function() {
        $('.select-row').prop('checked', this.checked);
    });

    // Evento para salvar a classificação individual
    $('.btn-save-classificacao').on('click', function() {
        var row = $(this).closest('tr');
        var protocolo = row.find('td:nth-child(3)').text();  // Protocolo da solicitação
        var novaClassificacao = row.find('.classification-dropdown').val();  // Nova classificação

        $.ajax({
            url: '/solicitacoes/classificar-solicitacao/',  // Defina a URL correta da sua view
            method: 'POST',
            data: {
                'protocolo': protocolo,
                'classificacao': novaClassificacao,
                'csrfmiddlewaretoken': $('[name="csrfmiddlewaretoken"]').val()  // Token CSRF necessário no Django
            },
            success: function(response) {
                alert('Classificação atualizada com sucesso!');
            },
            error: function(xhr, status, error) {
                alert('Erro ao atualizar classificação: ' + error);
            }
        });
    });

    lucide.createIcons();  // Recarrega os ícones após a tabela estar pronta
});