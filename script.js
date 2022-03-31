const buttons = document.querySelectorAll('.buttons button');
const devContent = document.querySelector('[data-dev]');
const serviceContent = document.querySelector('[data-service]');

// get heights of dev and service content
const setHeight = () => {
  const need = document.querySelector('.need');
  const devHeight = devContent.getBoundingClientRect().height;
  const serviceHeight = serviceContent.getBoundingClientRect().height;
  need.style.height = `${
    devHeight > serviceHeight ? devHeight : serviceHeight
  }px`;
};
// setHeight eventlistners
window.addEventListener('DOMContentLoaded', setHeight);
window.addEventListener('resize', setHeight);
// end of get heights of dev and service content

// show dev or service content
const toggleContent = (contents) => {
  contents.forEach((content) => content.classList.toggle('hide-content'));
};

const showContent = (button) => {
  const contents = [devContent, serviceContent];
  const isDevBtn = button.textContent.includes('dev');
  isDevBtn ? toggleContent(contents) : toggleContent(contents);
};

// dev or service buttons event listener
buttons.forEach((button) =>
  button.addEventListener('click', () => {
    buttons.forEach((btn) => btn.classList.remove('clicked'));
    button.classList.add('clicked');
    showContent(button);
  })
);
// end of show dev or service content

// helpers
const createElement = (tag) => document.createElement(tag);
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};
const imagePath = (type, name) =>
  `./images/${type}/${name.split(' ').join('-')}.png`;

const nav = document.querySelector('nav .container');
const navHeight = nav.getBoundingClientRect().height;
const h2s = [...document.querySelectorAll('h2')];
h2s.forEach((header) => (header.style.paddingTop = `${navHeight + 16}px`));

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

// create social media links
const socialList = (info) => {
  const socialSection = document.querySelector('[data-socials]');
  const socials = info.socialMedia;
  socials.forEach((social) => {
    const li = createElement('li');
    li.classList.add('social-link');

    const a = createElement('a');
    setAttributes(a, {
      href: social.address,
      target: '_blank',
      rel: 'noreferrer',
    });

    const i = createElement('i');
    i.classList.add('fa-brands', social.name);
    a.appendChild(i);
    li.appendChild(a);
    socialSection.appendChild(li);
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
  socialList(info);
  skillList(info);
  createProjectCard(info);
}
populate();
