/* eslint-disable implicit-arrow-linebreak */
// const navHeight = document.querySelector('nav .container');
// const height = navHeight.getBoundingClientRect();
// console.log(height.height);

// document.addEventListener('mousemove', (e) => {
//   const body = document.querySelector('body');
//   const circle = document.getElementById('circle');
//   const left = e.pageX;
//   const top = e.pageY;
//   circle.style.left = `${left}px`;
//   circle.style.top = `${top}px`;
// });

const createElement = (tag) => document.createElement(tag);
const imagePath = (name) =>
  `./images/projects/${name.split(' ').join('-')}.png`;

const navbar = (info) => {
  const navList = document.querySelector('[data-nav]');
  const links = info.navlinks;
  links.forEach((link) => {
    const list = createElement('li');
    const a = createElement('a');
    a.setAttribute('href', `#${link}`);
    a.classList.add('nav-link');
    a.textContent = link;
    list.appendChild(a);
    navList.appendChild(list);
  });
};

const socialList = (info) => {
  const socialSection = document.querySelector('[data-socials]');
  const socials = info.socialMedia;
  socials.forEach((socialLink) => {
    const a = createElement('a');
    a.setAttribute('href', socialLink.address);
    a.setAttribute('target', '_blank');
    const i = createElement('i');
    i.classList.add('fa-brands', socialLink.name);
    a.appendChild(i);
    // socialSection.appendChild(a);
    // console.log(a);
  });
};

const createProjectCard = (info) => {
  const { projects } = info;
  const showcase = document.querySelector('[data-showcase]');
  projects.forEach((project) => {
    const card = createElement('article');
    card.classList.add('card');

    const projectDiv = createElement('div');
    projectDiv.classList.add('project-image');
    const projectLink = createElement('a');
    projectLink.setAttribute('href', project.live);
    projectLink.setAttribute('target', '_blank');
    projectDiv.appendChild(projectLink);

    const projectImage = createElement('img');
    projectImage.setAttribute('src', imagePath(project.name));
    projectImage.setAttribute('alt', project.name);
    projectLink.appendChild(projectImage);

    const h3 = createElement('h3');
    h3.textContent = project.name;

    const pTech = createElement('p');
    pTech.textContent = `Tech Stack: ${project.techStack}`;

    const pDesc = createElement('p');
    pDesc.textContent = project.description;

    const sectionArr = [projectDiv, h3, pTech, pDesc];
    sectionArr.forEach((element) => card.appendChild(element));

    showcase.appendChild(card);
  });
};

// fetch data from info.json
async function populate() {
  const data = './info.json';
  const info = await (await fetch(data)).json();

  navbar(info);
  // socialList(info);
  createProjectCard(info);
}

populate();
