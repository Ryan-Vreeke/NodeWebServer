const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');
//display moobile menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
}


menu.addEventListener('click', mobileMenu);


const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if (window.innerWidth <= 968 && menuBars) {
        menu.classList.toggle('is-active');
        menuLinks.classList.remove('active');
    }
};

menuLinks.addEventListener('click', hideMobileMenu);
menuLinks.addEventListener('scroll', hideMobileMenu);

getProjects();
async function getProjects() {
    const response = await fetch('/qProjects');
    const data = await response.json();
    const projects__wrapper = document.getElementById('projects--wrapper');

    console.log(data)

    for (item of data) {
        const card = document.createElement('div');
        const img = document.createElement('img');
        const cat = document.createElement('div');
        const name = document.createElement('h2');
        const des = document.createElement('p');


        name.textContent = `${item.name}`;
        des.textContent = `${item.des}`;
        img.src = '/images/Projects' + item.img;

        let pid = item.pID;

        const pID = {pid};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pID)
        };

        const response = await fetch('/categories', options);
        const categories = await response.json();
        console.log(categories);

        for (c of categories){
            const category = document.createElement('span');
            category.textContent = c.name;
            cat.append(category);
        }

        card.className = 'project__card';
        card.id = item.pID;
        cat.className = 'categories';

        card.append(img, cat, name, des);
        projects__wrapper.append(card);

    }
}