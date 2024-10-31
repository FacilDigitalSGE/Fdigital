document.addEventListener("DOMContentLoaded", function() {
    // Definir dados iniciais da tabela
        // Definir dados iniciais da tabela
        var tableData = [
            { id: 1, visualizar: "", status: "Processada", inscricao: "54321", assunto: "Requerimento de Alvará", data: "10/10/2024" },
            { id: 2, visualizar: "", status: "Com Pendência", inscricao: "13579", assunto: "Pedido de Isenção", data: "28/09/2024" },
            { id: 3, visualizar: "", status: "Encaminhada", inscricao: "33445", assunto: "Autorização para Obra", data: "12/09/2024" },
            { id: 4, visualizar: "", status: "Cancelada pelo Usuário", inscricao: "55667", assunto: "Cancelamento de Contrato", data: "10/09/2024" },
            { id: 5, visualizar: "", status: "Cancelada pelo Sistema", inscricao: "77889", assunto: "Solicitação de Transferência", data: "01/09/2024" },
            { id: 6, visualizar: "", status: "Concluída", inscricao: "11223", assunto: "Renovação de Licença", data: "15/09/2024" },
        ];
    
        // Inicializar a tabela Tabulator
        var table = new Tabulator("#minhas-solicitacoes-tabela", {
            data: tableData,
            layout: "fitColumns",  // Ajusta automaticamente as colunas
            columns: [
                { title: "Visualizar", field: "visualizar", width: 80, hozAlign: "center", headerHozAlign: "center", formatter: function() {
                        return '<button class="btn-icon" title="Visualizar"><i data-lucide="eye"></i></button>';
                    }
                },
                { title: "Situação", field: "status", width: 150, hozAlign: "center", headerHozAlign: "center", formatter: function(cell) {
                        var status = cell.getValue();
                        var icon = "";
                        var className = "";
    
                        if (status.includes("Concluída") || status.includes("Processada") || status.includes("Encaminhada")) {
                            icon = "check-circle";
                            className = "status-success";
                        } else if (status.includes("Com Pendência")) {
                            icon = "alert-circle";
                            className = "status-warning";
                        } else if (status.includes("Cancelada")) {
                            icon = "x-circle";
                            className = "status-failed";
                        } else {
                            icon = "info";
                            className = "status-incomplete";
                        }
    
                        // Renderizar o HTML com ícone e status
                        return `<span class="${className}"><i data-lucide="${icon}"></i> ${status}</span>`;
                    }
                },
                { title: "Inscrição/Cadastro", field: "inscricao", width: 150, hozAlign: "left", headerHozAlign: "center" },
                { title: "Assunto", field: "assunto", width: 250, hozAlign: "left", headerHozAlign: "center" },
                { title: "Data Solicitação", field: "data", width: 150, hozAlign: "left", headerHozAlign: "center" }
            ],
            rowFormatter: function(row) {
                lucide.createIcons(); // Reaplica os ícones Lucide para cada linha
            }
        });
    
        // Implementação da busca personalizada
        document.getElementById("busca-solicitacao").addEventListener("keyup", function() {
            var searchValue = this.value.toLowerCase();
            table.setFilter(function(data) {
                return JSON.stringify(data).toLowerCase().includes(searchValue);
            });
        });
    });