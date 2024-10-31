function getCsrfToken() {
    const csrfCookie = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
}

document.addEventListener('DOMContentLoaded', function() {
    const urgentIcons = document.querySelectorAll('[data-urgent-toggle]');
    
    urgentIcons.forEach(icon => {
        icon.addEventListener('click', async function() {
            const priorityId = this.dataset.priorityId;
            const isCurrentlyUrgent = !this.classList.contains('disabled');
            
            try {
                const response = await fetch('/api/toggle-urgent/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCsrfToken()
                    },
                    body: JSON.stringify({
                        priority_id: priorityId,
                        urgent: !isCurrentlyUrgent
                    })
                });
                
                if (response.ok) {
                    this.classList.toggle('disabled');
                }
            } catch (error) {
                console.error('Erro ao atualizar prioridade:', error);
            }
        });
    });
});