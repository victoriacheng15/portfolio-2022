// const navHeight = document.querySelector('nav .container');
// const height = navHeight.getBoundingClientRect();
// console.log(height.height);

const buttons = document.querySelectorAll('.buttons button');
const devContent = document.querySelector('[data-dev]');
const serviceContent = document.querySelector('[data-service]');

// get heights of dev and service content
const setHeight = () => {
  const devOrService = document.querySelector('.need');
  const devHeight = devContent.getBoundingClientRect().height;
  const serviceHeight = serviceContent.getBoundingClientRect().height;
  const totalHeight = devHeight > serviceHeight ? devHeight : serviceHeight;
  devOrService.style.height = `${totalHeight}px`;
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

// create elements
const createElement = (tag) => document.createElement(tag);
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
    image.setAttribute('src', imagePath('skills', skill));
    image.setAttribute('alt', skill);
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
    a.setAttribute('href', social.address);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noreferrer');
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
    projectLink.setAttribute('href', project.live);
    projectLink.setAttribute('target', '_blank');
    projectLink.setAttribute('rel', 'noreferrer');
    projectDiv.appendChild(projectLink);

    const projectImage = createElement('img');
    projectImage.setAttribute('src', imagePath('projects', project.name));
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
    myForm.reset()
};

document.querySelector('form').addEventListener('submit', handleSubmit);

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
