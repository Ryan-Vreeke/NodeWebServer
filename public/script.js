const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');
//display moobile menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
}


menu.addEventListener('click', mobileMenu);

//enable hiden nav bar
/*

const nav = document.querySelector('.navbar');
let lastScrollY = window.scrollY;


window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
        nav.classList.add('navbar--hidden');
    } else {
        nav.classList.remove('navbar--hidden');
    }

    lastScrollY = window.scrollY;
});
*/


const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
    const skillMenu = document.querySelector('#skills-page');
    const projectsMenu = document.querySelector('#projects-page');
    let scrollPos = window.scrollY;

    //add hightlight class to my menu items
    if (window.innerWidth > 960 && scrollPos < 600) {
        homeMenu.classList.add('highlight');
        skillMenu.classList.add('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 1400) {
        skillMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        projectsMenu.classList.remove('highlight');
        return
    } else if (window.innerWidth > 960 && scrollPos < 2345) {
        skillMenu.classList.remove('highlight');
        projectsMenu.classList.add('highlight');
        return
    }

    if ((elem && window.innerWidth < 960 && scrollPos < 600) || elem) {
        elem.classList.remove('highlight');
    }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if (window.innerWidth <= 968 && menuBars) {
        menu.classList.toggle('is-active');
        menuLinks.classList.remove('active');
    }
};

menuLinks.addEventListener('click', hideMobileMenu);
menuLinks.addEventListener('scroll', hideMobileMenu);

document.getElementById('contact-send').onclick = () => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');

    if (name.value == "") {
        alert("name is required");
    }

    if (email.value == "") {
        alert("email is required");
        return;
    }

    async function sendData() {

        const data = { 
            name: name.value, 
            phone: phone.value, 
            email: email.value, 
            message: message.value 
        };
        console.log(name.value);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('/message', options);
        const json = await response.json();
        console.log(json);

    };

    console.log(sendData());
    name.value = '';
    phone.value = '';
    email.value = '';
    message.value = '';
};

