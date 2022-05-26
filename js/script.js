// helpers
const createElement = (tag) => document.createElement(tag);
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};
const imagePath = (type, name) =>
  `./images/${type}/${name.split(' ').join('-')}.png`;

// create nav links
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

// skills
const skillList = (info) => {
  const skillContainer = document.querySelector('.skills-container');
  const { skills } = info;
  skills.forEach((skill) => {
    const icon = createElement('div');
    icon.classList.add('icon');
    const image = createElement('img');
    setAttributes(image, {
      src: imagePath('skills', skill),
      alt: skill,
    });
    icon.appendChild(image);
    skillContainer.appendChild(icon);
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
    setAttributes(projectLink, {
      href: project.live,
      target: '_blank',
      rel: 'noreferrer',
    });
    projectDiv.appendChild(projectLink);

    const projectImage = createElement('img');
    setAttributes(projectImage, {
      src: imagePath('projects', project.name),
      alt: project.name,
    });
    projectLink.appendChild(projectImage);

    const h3 = createElement('h3');
    h3.textContent = project.name;

    const pTech = createElement('p');
    pTech.textContent = `Tech Stack: ${project.techStack}`;

    const pDesc = createElement('p');
    pDesc.textContent = project.description;

    const sectionArr = [projectDiv, h3, pTech, pDesc];
    sectionArr.forEach((element) => card.appendChild(element));

    showcase.insertAdjacentElement('afterbegin', card);
  });
};

// start of form
const handleSubmit = (e) => {
  e.preventDefault();
  const myForm = document.querySelector('.contact-form');
  const formData = new FormData(myForm);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.log('Form successfully submitted'))
    .catch((error) => console.log(error));
  myForm.reset();
};
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
// end of form

// show current year in the footer
function currentYear() {
  const year = document.querySelector('[data-current]');
  const date = new Date().getFullYear();
  year.textContent = date;
}
currentYear();

// fetch data from info.json
async function populate() {
  const data = './info.json';
  const info = await (await fetch(data)).json();

  navbar(info);
  skillList(info);
  createProjectCard(info);
}
populate();
