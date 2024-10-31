document.addEventListener("DOMContentLoaded", function() {
    var columnDefs = [
        { 
            headerName: "Visualizar", field: "visualizar", width: 100, 
            cellRenderer: function() {
                return '<button class="btn-icon" title="Visualizar"><i data-lucide="eye"></i></button>';
            }
        },
        { headerName: "Protocolo", field: "protocolo", width: 150, sortable: true },
        { headerName: "Atendente", field: "atendente", width: 200 },
        {
            headerName: "Assunto",
            field: "assunto",
            width: 250,
            tooltipField: "assunto",  // Ativa o tooltip para a coluna "Assunto"
            cellStyle: { 'white-space': 'nowrap', 'text-overflow': 'ellipsis', 'overflow': 'hidden' }  // Mantém o texto truncado
        },
        { headerName: "Data de Atribuição", field: "dataAtribuicao", width: 150 },
        { headerName: "Requerente", field: "requerente", width: 200 },
        { headerName: "CPF/CNPJ", field: "cpfCnpj", width: 150 },
        { headerName: "Data Inclusão", field: "dataInclusao", width: 150 },
        { headerName: "Data Devolução", field: "dataDevolucao", width: 150 },
        { headerName: "Data Entrada", field: "dataEntrada", width: 150 },
        { headerName: "Classificação", field: "classificacao", width: 150 },
        {
            headerName: "Retornar ao Gestor",
            field: "retornar",
            width: 150,
            cellRenderer: function() {
                return '<button class="btn-retornar">Retornar</button>';
            }
        }
    ];

    var rowData = [
        {
            visualizar: "", protocolo: "2024001", atendente: "Maria Santos", assunto: "Análise de Documentação",
            dataAtribuicao: "22/10/2024", requerente: "João Silva", cpfCnpj: "123.456.789-00", dataInclusao: "20/10/2024",
            dataDevolucao: "25/10/2024", dataEntrada: "19/10/2024", classificacao: "Urgente", retornar: ""
        },
        // Adicione mais dados conforme necessário
    ];

    var gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        defaultColDef: {
            flex: 1,
            minWidth: 100,
            resizable: true,
            tooltipComponent: 'agTooltipComponent',  // Garante que o tooltip padrão seja usado
            tooltipValueGetter: function(params) {
                return params.value;  // Retorna o valor da célula como tooltip
            }
        },
        onFirstDataRendered: function() {
            lucide.createIcons();  // Aplica os ícones após a renderização
        }
    };

    // Inicializa a AG-Grid
    var eGridDiv = document.querySelector('#solicitacoes-tabela');
    new agGrid.Grid(eGridDiv, gridOptions);

    // Implementação da busca personalizada
    document.getElementById("busca-solicitacao").addEventListener("keyup", function() {
        var searchValue = this.value.toLowerCase();
        gridOptions.api.setQuickFilter(searchValue);
    });
});
