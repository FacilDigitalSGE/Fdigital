$(document).ready(function() {
    // Inicializa a tabela interativa
    $('#solicitacoes-analise-tabela').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
        },
        paging: true,
        ordering: true,
        info: true,
        searching: true,
        lengthChange: true,
        pageLength: 10
    });

    // Implementação da busca personalizada
    $('#busca-solicitacao').on('keyup', function() {
        var searchValue = $(this).val().toLowerCase();
        $('#solicitacoes-analise-tabela tbody tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
        });
    });

    lucide.createIcons();
});
