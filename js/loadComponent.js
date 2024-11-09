// Função para carregar componentes HTML externos
function loadComponent(componentPath, elementId) {
    fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => {
            console.error('There was a problem loading the component:', error);
        });
}

//Carrega os componentes
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('components/navbar.html', 'navbar');
    loadComponent('components/banner.html', 'banner');
});

