const english = {
  skip: 'Skip to content',
  work: 'Experience',
  skills: 'Skills',
  resumeNav: 'Résumés',
  role: 'Front-End Lead · Senior Full Stack Developer',
  intro: 'I build web applications for business teams, from interfaces to APIs. I work with React, Next.js and Symfony, and integrate generative AI into the tools people use at work.',
  resumeAction: 'Download my résumés',
  years: 'years of experience',
  lead: 'Technical leadership',
  leadDetail: 'Architecture, mentoring and code reviews',
  workKicker: 'Professional experience',
  workTitle: 'Selected engagements',
  workIntro: 'Banking, European institutions, education and automotive.',
  bnp: 'Led technical delivery of a platform for IT communications campaigns. Migrated the front end to Next.js, designed Symfony APIs and integrated AI assistants with RAG and streaming responses.',
  epoName: 'European Patent Office',
  epo: 'Designed an administration dashboard for a patent platform. Built a responsive design system and migrated asynchronous data flows to RTK Query.',
  educationClient: 'French education authority',
  ganesh: 'Modernized a platform that supports students with disabilities. Migrated jQuery views to React, built reusable components and integrated APIs with role-based access.',
  psaName: 'PSA Group',
  psa: 'Built a real-time vehicle configurator and conditional forms driven by JSON schemas for automotive portals in 12 markets.',
  ibm: 'Built interfaces for financial data collection and private banking client management. Integrated Symfony services and internal web services.',
  skillsKicker: 'Technologies and practices',
  skillsTitle: 'Technical skills',
  frontSkill: 'Interfaces, state management, forms and design systems.',
  backSkill: 'API design, data modeling and access control.',
  aiTitle: 'Data, search & AI',
  aiSkill: 'Hybrid and vector search, RAG and conversational interfaces.',
  qualityTitle: 'Architecture, quality & delivery',
  qualitySkill: 'Accessibility, web performance, automated testing and CI/CD.',
  edition: 'English edition',
  resumeTitle: 'Download my résumés',
  frontCV: 'Senior Lead Front-End Developer',
  fullCV: 'Senior Full Stack Developer',
  download: 'Download PDF',
  nav: 'Main navigation',
  language: 'Portfolio language',
  description: 'Portfolio of Mohamed Chakara, Front-End Lead and Senior Full Stack Developer. React, Next.js, TypeScript, Symfony and generative AI.'
};

const metaDescription = document.querySelector('meta[name="description"]');
const textElements = [...document.querySelectorAll('[data-i]')];
const labeledElements = [...document.querySelectorAll('[data-label]')];
const languageControl = document.querySelector('.language');
const languageButtons = [...languageControl.querySelectorAll('button')];
const cvLinks = [...document.querySelectorAll('[data-cv]')];
const french = Object.fromEntries([
  ...textElements.map(element => [element.dataset.i, element.textContent]),
  ...labeledElements.map(element => [element.dataset.label, element.getAttribute('aria-label')]),
  ['description', metaDescription.content]
]);

function applyLanguage(language) {
  const translations = language === 'en' ? english : french;
  document.documentElement.lang = language;
  metaDescription.content = translations.description;

  for (const element of textElements) {
    element.textContent = translations[element.dataset.i];
  }
  for (const element of labeledElements) {
    element.setAttribute('aria-label', translations[element.dataset.label]);
  }
  for (const button of languageButtons) {
    button.setAttribute('aria-pressed', String(button.value === language));
  }
  for (const link of cvLinks) {
    const filename = `Mohamed-Chakara-${link.dataset.cv}-${language.toUpperCase()}.pdf`;
    link.href = `cv/${filename}`;
    link.download = filename;
  }
}

const storageKey = 'mohamed-portfolio-language';
let preferredLanguage = 'fr';
try {
  if (localStorage.getItem(storageKey) === 'en') preferredLanguage = 'en';
} catch {
  // The switch still works when the browser blocks storage.
}

for (const button of languageButtons) {
  button.addEventListener('click', () => {
    applyLanguage(button.value);
    try {
      localStorage.setItem(storageKey, button.value);
    } catch {
      // Keep the selected language for the current page.
    }
  });
}
applyLanguage(preferredLanguage);
languageControl.hidden = false;
