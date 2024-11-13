const contentDiv = document.getElementById("content");

// Lista de projetos para exibir nos cards
const projects = [
  {
    image: 'url-da-imagem-1.jpg',
    title: 'Projeto 1',
    description: 'Uma breve descrição do projeto 1.'
  },
  {
    image: 'url-da-imagem-2.jpg',
    title: 'Projeto 2',
    description: 'Uma breve descrição do projeto 2.'
  },
  // Adicione outros projetos conforme necessário
];

async function loadPage(page){
    console.log("loading page: " + page);
    try{

        const response = await fetch(`pages/${page}.html`);

        if(!response.ok){
            throw new Error(`Failed to load page: ${response.status}`);
        }

        const html = await response.text();
        contentDiv.innerHTML = html;
        if(page === 'projects'){
            loadCards();
        }else{
            const cardsContainer = document.getElementById('cards');
            cardsContainer.innerHTML = '';
        }
    }
    catch(error){
        console.error(error);
        contentDiv.innerHTML = "<h1>404</h1><p>Page not found</p>";
    }
}

function navigate(page) {
    window.location.hash = page;
    console.log("navegou");
    loadPage(page);
}

async function loadCards() {
    console.log("loading Cards");
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    try{
        const response = await fetch('components/card.html');
        if(!response.ok){
            throw new Error(`Failed to load cards: ${response.status}`);
        }
        const html = await response.text();

        projects.forEach(project => {
            const cardTemplate = document.createElement('div');
            cardTemplate.innerHTML = html.trim();

            const card = cardTemplate.firstElementChild;            
            card.querySelector('.project-card-image').src = project.image;
            card.querySelector('.project-card-image').alt = project.title
            card.querySelector('.project-card-title').textContent = project.title;
            card.querySelector('.project-card-description').textContent = project.description;
            cardsContainer.appendChild(card);
        });

       // document.getElementById('cards').innerHTML = html;
    } catch(error){
        console.error('There was a problem loading the cards:', error);
    }
}

async function loadComponent(componentPath, elementId) {
    try{
        const response = await fetch(componentPath);
        if(!response.ok){
            throw new Error(`Failed to load component: ${response.status}`);
        }
        const html = await response.text();

        document.getElementById(elementId).innerHTML = html;

        
        if(elementId === 'navbar'){
            document.querySelectorAll("nav ul li a").forEach(link => {
                link.addEventListener("click",(event) => {
                    event.preventDefault();
                    const page = event.target.getAttribute("data-route");
                    navigate(page);
                });
            });
        }
    } catch(error){
            console.error('There was a problem loading the component:', error);
    }
}



function init(){
//Carrega os componentes
    const initialPage = window.location.hash.substring(1) || "home";
    console.log("iniciou");
    navigate(initialPage);
    
    loadComponent('components/navbar.html', 'navbar');
    loadComponent('components/banner.html', 'banner')
}



window.addEventListener("load", init);
