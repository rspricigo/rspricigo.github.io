const contentDiv = document.getElementById("content");

async function loadPage(page){
    try{

        const response = await fetch(`pages/${page}.html`);

        if(!response.ok){
            throw new Error(`Failed to load page: ${response.status}`);
        }

        const html = await response.text();
        contentDiv.innerHTML = html;
    }
    catch(error){
        console.error(error);
        contentDiv.innerHTML = "<h1>404</h1><p>Page not found</p>";
    }
}

function navigate(page) {
    window.location.hash = page;
    loadPage(page);
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
    navigate(initialPage);
    
    loadComponent('components/navbar.html', 'navbar');
    loadComponent('components/banner.html', 'banner')
}



window.addEventListener("load", init);
window.addEventListener("hashchange", () => {
    loadPage(window.location.hash.substring(1));
});