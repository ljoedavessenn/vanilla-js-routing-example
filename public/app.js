//Declare the variables for home, about & contact html pages
let home = '';
let about = '';
let contact = '';
let error = '';


let routes = {};

//Get the Element with the Id 'root'
const rootDiv = document.getElementById('root');

/**
 *
 * @param {String} page - Represents the page information that needs to be retrieved
 * @returns {String} resHtml - The Page's HTML is returned from the async invocation
 */

const loadPage = async (page) => {
    const response = await fetch(page);
    const resHtml = await response.text();
    return resHtml;
};

/**
 * The Async function loads all HTML to the variables 'home', 'about' & 'contact'
 */
const loadAllPages = async () => {
    home = await loadPage('./home.html');
    about = await loadPage('./about.html');
    contact = await loadPage('./contact.html');
    error = await loadPage('./error404.html');
};

const showPage = pathname =>{
    const page = routes[pathname];
    if(page){
        rootDiv.innerHTML=page;
    } else{
        rootDiv.innerHTML = error;
    }
};


/**
 * The Main Function is an async function that first loads All Page HTML to the variables
 * Once the variables are loaded with the contents, then they are assigned to the 'routes' variable
 */

const main = async () => {
    await loadAllPages();
    routes = {
        '/': home,
        '/contact': contact,
        '/about': about,
    };
    showPage(window.location.pathname);
};

// Invoke the Main function
main();

const onNavClick = (pathname) => {
    window.history.pushState({}, pathname, window.location.origin + pathname); 
    showPage(pathname);
};

/**
 * The Function is invoked when the window.history changes
 */
window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname];
};
