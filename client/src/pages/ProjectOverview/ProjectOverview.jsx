import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiTarget,
  FiLayers,
  FiPenTool,
  FiAlertCircle,
  FiStar,
  FiMonitor,
  FiCheckCircle,
} from 'react-icons/fi';
import GlassButton from '../../components/GlassButton';
import './ProjectOverview.css';

const projectOverviews = {
  'drum-kit': {
    title: 'Drum Kit',
    category: 'Interactive Web Application',
    image: '/projects/Drum_Kit/drum-kit-image.png',
    liveUrl: '/projects/Drum_Kit/Drum_Kit (2)/index.html',
    tools: ['HTML', 'CSS', 'JavaScript'],
    overview:
      'Drum Kit is an interactive web application that allows users to play drum sounds using keyboard keys or mouse clicks. The project focuses on simple interaction design, responsive layout, and clean JavaScript event handling.',
    scope: [
      'Create an interactive browser-based drum kit.',
      'Allow users to trigger sounds through keyboard input.',
      'Create a simple visual interface for each drum sound.',
      'Build the project using clean HTML, CSS, and JavaScript.',
    ],
    designProcess: [
      'Planned the layout around clear visual buttons.',
      'Mapped each keyboard key to a matching drum sound.',
      'Designed the interface to be simple, playful, and easy to use.',
      'Tested click and keyboard interactions for a smoother experience.',
    ],
    challenges: [
      {
        problem: 'Keyboard and click actions needed to trigger the correct sound.',
        solution:
          'Used JavaScript event listeners to detect key presses and clicks, then connected each action to the correct audio file.',
      },
    ],
    brandElements: [
      'Bold button-based layout',
      'Simple music-focused interaction',
      'Clear keyboard labels',
      'Minimal interface styling',
    ],
    webDesign: [
      'Centered layout for easy interaction.',
      'Large clickable buttons for usability.',
      'Simple responsive structure.',
      'Lightweight code for fast loading.',
    ],
    takeaways: [
      'Improved JavaScript event-handling skills.',
      'Learned how to connect UI actions to audio feedback.',
      'Strengthened understanding of interactive frontend behaviour.',
    ],
   wireframes: [
  {
    image: '/case-studies/drum-kit/drum-desktop-wireframe.webp',
    title: 'Desktop Design Structure',
    description:
      'Desktop structure showing the title, drum controls, keyboard mapping, and primary interaction area.',
  },
  {
    image: '/case-studies/drum-kit/drum-mobile-wireframe.webp',
    title: 'Mobile Design Structure',
    description:
      'Responsive structure showing how the drum controls reorganise for smaller screens and touch interaction.',
  },
],

mockups: [
  {
    image: '/case-studies/drum-kit/drumkit-desktop.webp',
    title: 'Desktop Experience',
    description:
      'Final desktop presentation showing the complete interactive Drum Kit interface.',
  },
  {
    image: '/case-studies/drum-kit/drumkit-mobile.webp',
    title: 'Mobile Experience',
    description:
      'Responsive presentation showing how the Drum Kit adapts for smaller screens.',
  },
  {
    image: '/case-studies/drum-kit/drumkit-interaction.webp',
    title: 'Interaction Detail',
    description:
      'A closer look at the drum controls and keyboard-mapped interaction area.',
  },
],

  },

  'gunk-juice-logo': {
    title: 'Gunk Juice Logo',
    category: 'Logo Design & Brand Identity',
    image: '/projects/Gunk/gunk-logo.png',
    liveUrl: '#',
    tools: ['Adobe Illustrator', 'Photoshop'],
    overview:
      'Gunk Juice Logo is a visual identity project created for an energy drink concept. The goal was to create a bold, memorable logo that communicates energy, youthfulness, and strong shelf presence.',
    scope: [
      'Create a modern logo for an energy drink brand.',
      'Develop a bold visual identity that can work across packaging and digital platforms.',
      'Digitise and refine the design using professional design tools.',
      'Prepare the logo for multiple use cases.',
    ],
    designProcess: [
      'Explored bold typography and energetic brand styles.',
      'Created rough layout ideas before refining the final direction.',
      'Used Adobe Illustrator to clean and digitise the logo.',
      'Tested the logo against light and dark backgrounds.',
    ],
    challenges: [
      {
        problem: 'The logo needed to feel bold without becoming messy.',
        solution:
          'Simplified the shapes, strengthened the typography, and kept the design focused on strong brand recognition.',
      },
    ],
    brandElements: [
      'Bold typography',
      'High-energy visual style',
      'Strong contrast',
      'Youth-focused brand personality',
    ],
    webDesign: [
      'Logo prepared for web use.',
      'Suitable for website headers, product mockups, and social media assets.',
      'Designed to remain clear on digital screens.',
      'Works as part of a wider brand identity system.',
    ],
    takeaways: [
      'Improved logo refinement and digitisation skills.',
      'Strengthened understanding of brand consistency.',
      'Learned how to prepare logo assets for different platforms.',
    ],
    mockups: [
  {
    image: '/case-studies/gunk-records/gunk-clothing.webp',
    title: 'Streetwear Application',
    description:
      'GUNK branding applied to streetwear, demonstrating how the record-company identity can extend into merchandise and music culture.',
  },
  {
    image: '/case-studies/gunk-records/gunk-tshirt.webp',
    title: 'T-Shirt Merchandise',
    description:
      'A clean merchandise application showing the logo as the primary graphic across apparel.',
  },
  {
    image: '/case-studies/gunk-records/gunk-cup.webp',
    title: 'Brand Merchandise',
    description:
      'The GUNK identity applied to merchandise to demonstrate flexibility beyond clothing and digital media.',
  },
  {
    image: '/case-studies/gunk-records/gunk-video-end-screen.webp',
    title: 'Music Video End Screen',
    description:
      'A cinematic black end-card treatment designed for placement at the end of artist music videos released under GUNK Records.',
  },
],
  },

  'ar-autoworks': {
    title: 'AR AutoWorks Website',
    category: 'Automotive Website Design',
    image: '/images/ar-logo.png',
    liveUrl: '/projects/AR AutoWorks Cpt/index.html',
    tools: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    overview:
      'AR AutoWorks is a responsive website concept for an automotive repair business. The project focuses on presenting services clearly, building customer trust, and helping users quickly find information about repairs and bookings.',
    scope: [
      'Design a professional website for an auto repair shop.',
      'Create a service-focused layout.',
      'Make the website responsive across desktop, tablet, and mobile.',
      'Include clear call-to-action areas for booking or enquiries.',
    ],
    designProcess: [
      'Planned the website around common customer needs.',
      'Structured the homepage to show services, trust signals, and contact options.',
      'Used Figma to plan the layout before development.',
      'Translated the design into HTML, CSS, and JavaScript.',
    ],
    challenges: [
      {
        problem: 'The website needed to look trustworthy and professional.',
        solution:
          'Used a clean structure, clear service sections, strong spacing, and simple navigation to improve credibility.',
      },
    ],
    brandElements: [
      'Automotive-focused visual style',
      'Service-based content structure',
      'Professional colour direction',
      'Clean business layout',
    ],
    webDesign: [
      'Responsive homepage layout.',
      'Clear service cards.',
      'Easy-to-use navigation.',
      'Call-to-action sections for enquiries.',
    ],
    takeaways: [
      'Improved service-business website planning.',
      'Strengthened responsive layout skills.',
      'Learned how to structure a website around user trust and conversion.',
    ],
   
wireframes: [
  {
    image:
      '/case-studies/ar-autoworks/ar-desktop-wireframe.webp',
    title: 'Desktop Design Structure',
    description:
      'Desktop structure mapping the navigation, hero, trust signals, services, and primary service request journey.',
  },
  {
    image:
      '/case-studies/ar-autoworks/ar-mobile-wireframe.webp',
    title: 'Mobile Design Structure',
    description:
      'Responsive structure focused on business information, service enquiries, and an accessible mobile request form.',
  },
],

mockups: [
  {
    image:
      '/case-studies/ar-autoworks/ar-desktop.webp',
    title: 'Desktop Experience',
    description:
      'Final desktop presentation showing the AR AutoWorks homepage, automotive branding, trust messaging, and primary service call to action.',
  },
  {
    image:
      '/case-studies/ar-autoworks/ar-mobile.webp',
    title: 'Mobile Experience',
    description:
      'Responsive mobile presentation showing the service request experience, business hours, navigation, and enquiry form.',
  },
  {
    image:
      '/case-studies/ar-autoworks/ar-booking.webp',
    title: 'Service Request Experience',
    description:
      'A focused view of the request form designed to make vehicle service enquiries simple and accessible on mobile.',
  },
],
  },

sarajane: {
  title: 'SaraJane – Hair Care Brand',
  category: 'Beauty & E-commerce Website',

  image: '/projects/company-website/public/images/sj-logo.jpg',
  liveUrl: '/projects/company-website/index.html',

  tools: ['Angular', 'TypeScript', 'CSS', 'HTML'],

  overview:
    'SaraJane is a beauty and hair care brand website created for a business selling hair care products, satin essentials, and accessories. The project focuses on elegant visual design, product presentation, and a clean shopping experience.',

  scope: [
    'Create a complete brand website for a beauty business.',
    'Showcase product categories clearly.',
    'Design a soft, elegant, and feminine visual direction.',
    'Build responsive layouts for mobile and desktop users.',
    'Include product-focused sections for browsing and conversion.',
  ],

  designProcess: [
    'Defined the brand direction around beauty, softness, and premium care.',
    'Planned the website around product categories.',
    'Created product sections with clear visual hierarchy.',
    'Built the frontend using Angular components and reusable styling.',
  ],

  challenges: [
    {
      problem:
        'The brand needed to feel elegant while still being easy to shop.',
      solution:
        'Used soft spacing, clear product sections, simple calls to action, and a clean category structure.',
    },
  ],

  brandElements: [
    'Amethyst purple brand direction',
    'Soft beauty-focused styling',
    'Elegant typography',
    'Product category structure',
    'Clean product imagery',
  ],

  webDesign: [
    'Responsive product sections.',
    'Clear navigation for product categories.',
    'Soft visual design for a beauty audience.',
    'Conversion-focused product presentation.',
  ],

  takeaways: [
    'Improved e-commerce layout planning.',
    'Strengthened Angular component structure.',
    'Learned how to combine brand design with product-focused UX.',
  ],

  wireframes: [
    {
      image:
        '/case-studies/sarajane/sarajane-wireframe-desktop.webp',
      title: 'Desktop Design Structure',
      description:
        'A retrospective desktop structure showing the hierarchy of the homepage, navigation, hero content, product categories, and key sections.',
    },
    {
      image:
        '/case-studies/sarajane/sarajane-wireframe-mobile.webp',
      title: 'Mobile Design Structure',
      description:
        'A simplified mobile structure focused on navigation, product discovery, responsive cards, and an easy browsing experience.',
    },
  ],

  mockups: [
    {
      image:
        '/case-studies/sarajane/sarajane-desktop.webp',
      title: 'Desktop Experience',
      description:
        'The completed SaraJane desktop interface showing the brand direction, hero area, product categories, and shopping experience.',
    },
    {
      image:
        '/case-studies/sarajane/sarajane-mobile.webp',
      title: 'Mobile Experience',
      description:
        'The responsive mobile interface showing how product cards and navigation adapt to a smaller screen.',
    },
    {
      image:
        '/case-studies/sarajane/sarajane-product.webp',
      title: 'Product Experience',
      description:
        'The product detail experience showing product imagery, pricing, description, ratings, and a clear Add to Cart action.',
    },
  ],
},

  'joe-man-sweep': {
    title: 'Joe-Man Sweep Cleaning',
    category: 'Service Business Website',
    image: '/projects/joe-man-sweep/frontend/public/logo.png',
    liveUrl: '/projects/joe-man-sweeps/index.html',
    tools: ['Angular', 'TypeScript', 'CSS', 'HTML'],
    overview:
      'Joe-Man Sweep Cleaning is a responsive website for a Cape Town chimney cleaning and fireplace installation business. The website was designed to build trust, explain services clearly, and guide users toward booking through phone, email, or WhatsApp.',
    scope: [
      'Create a complete website for a local service business.',
      'Design pages for home, about, services, contact, and booking.',
      'Create a simple booking-focused user journey.',
      'Build responsive layouts for mobile-first browsing.',
      'Support trust-building through clear service information.',
    ],
    designProcess: [
      'Planned the website around the user journey from landing page to booking.',
      'Created a visual direction that feels local, clean, and trustworthy.',
      'Designed service sections, process steps, contact areas, and call-to-action sections.',
      'Built the frontend in Angular with reusable page sections.',
    ],
    challenges: [
      {
        problem: 'The service needed to feel trustworthy to homeowners.',
        solution:
          'Used clear service descriptions, friendly messaging, process steps, and visible contact options.',
      },
    ],
    brandElements: [
      'Navy and warm yellow colour palette',
      'Friendly local service tone',
      'Chimney cleaning and fireplace visuals',
      'Simple service icons',
      'Trust-focused copywriting',
    ],
    webDesign: [
      'Mobile-first page structure.',
      'Hero banner with strong call to action.',
      'Services grid.',
      'Booking page with contact options.',
      'Footer and navigation designed for easy movement through the site.',
    ],
    takeaways: [
      'Improved service website UX planning.',
      'Strengthened Angular page structure.',
      'Learned how to design for local SEO, trust, and lead generation.',
    ],
  },
};

const ProjectOverview = () => {
  const { slug } = useParams();
  const project = projectOverviews[slug];

  if (!project) {
    return (
      <main className="project-overview-page">
        <section className="overview-not-found">
          <p className="overview-kicker">Project not found</p>
          <h1>This project overview does not exist.</h1>

          <Link to="/#projects" className="overview-back-link">
            <FiArrowLeft />
            Back to projects
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="project-overview-page">
      <section className="overview-hero">
        <div className="overview-container">
          <Link to="/#projects" className="overview-back-link">
            <FiArrowLeft />
            Back to projects
          </Link>

          <div className="overview-hero-grid">
            <div className="overview-hero-content">
              <p className="overview-kicker">{project.category}</p>
              <h1>{project.title}</h1>
              <p className="overview-intro">{project.overview}</p>

              <div className="overview-tools">
                {(project.tools || []).map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>

              {project.liveUrl && project.liveUrl !== '#' && (
                <div className="overview-live-action">
                  <GlassButton href={project.liveUrl}>
                    View Live Project
                  </GlassButton>
                </div>
              )}
            </div>

            <div className="overview-image-wrap">
              <img src={project.image} alt={project.title} />
            </div>
          </div>
        </div>
      </section>

      <section className="overview-content-section">
        <div className="overview-container overview-card-grid">
          <OverviewBlock
            icon={FiTarget}
            title="Project Overview"
            content={project.overview}
          />

          <OverviewListBlock
            icon={FiLayers}
            title="Project Scope"
            items={project.scope}
          />

          <OverviewListBlock
            icon={FiPenTool}
            title="Design Process"
            items={project.designProcess}
          />

          <ChallengeBlock
            icon={FiAlertCircle}
            title="Challenges & Solutions"
            items={project.challenges}
          />

          <OverviewListBlock
            icon={FiStar}
            title="Brand Elements"
            items={project.brandElements}
          />

          <OverviewListBlock
            icon={FiMonitor}
            title="Web Design"
            items={project.webDesign}
          />

          <OverviewListBlock
            icon={FiCheckCircle}
            title="Key Takeaways"
            items={project.takeaways}
          />
        </div>

        <div className="overview-container">
          <section className="case-study-section">
            <div className="case-study-heading">
              <span className="case-study-kicker">UX / UI PROCESS</span>
              <h2>From Concept to Final Experience</h2>
              <p>
                A structured process connects project goals with interface
                decisions, responsive behaviour, and the final implementation.
              </p>
            </div>

            <div className="process-timeline">
              <ProcessStep
                number="01"
                title="Research"
                text="Understanding the project goals, users, and core requirements."
              />
              <div className="process-line" />
              <ProcessStep
                number="02"
                title="Wireframe"
                text="Planning hierarchy, layout, navigation, and responsive behaviour."
              />
              <div className="process-line" />
              <ProcessStep
                number="03"
                title="UI Design"
                text="Applying typography, colour, imagery, branding, and reusable components."
              />
              <div className="process-line" />
              <ProcessStep
                number="04"
                title="Development"
                text="Translating the interface into responsive, working code and testing the result."
              />
            </div>
          </section>

          <VisualCaseStudySection
            kicker="EARLY DESIGN"
            title="Wireframes"
            description="Early layouts used to establish information hierarchy, content placement, navigation, and responsive behaviour before final visual styling."
            items={project.wireframes}
            type="wireframes"
          />

          <VisualCaseStudySection
            kicker="FINAL INTERFACE"
            title="High-Fidelity Mockups"
            description="The final interface translates the design direction into a polished, responsive experience while maintaining the identity of the project."
            items={project.mockups}
            type="mockups"
          />

          <div className="overview-bottom-cta">
            <span className="case-study-kicker">LET'S WORK TOGETHER</span>
            <h2>Have a project in mind?</h2>
            <p>
              Interested in a website, redesign, brand identity, or digital
              experience like this?
            </p>

            <div className="overview-contact-action">
              <GlassButton href="/#contact">
                Contact / Book a Project
              </GlassButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const OverviewBlock = ({ icon: Icon, title, content }) => (
  <article className="overview-block">
    <div className="overview-block-heading">
      <span>
        <Icon />
      </span>
      <h2>{title}</h2>
    </div>
    <p>{content}</p>
  </article>
);

const OverviewListBlock = ({ icon: Icon, title, items = [] }) => {
  if (!items.length) return null;

  return (
    <article className="overview-block">
      <div className="overview-block-heading">
        <span>
          <Icon />
        </span>
        <h2>{title}</h2>
      </div>

      <ul className="overview-list">
        {items.map((item, index) => (
          <li key={`${title}-${index}`}>{item}</li>
        ))}
      </ul>
    </article>
  );
};

const ChallengeBlock = ({ icon: Icon, title, items = [] }) => {
  if (!items.length) return null;

  const item = items[0];

  return (
    <article className="overview-block challenge-overview-block">
      <div className="overview-block-heading">
        <span>
          <Icon />
        </span>
        <h2>{title}</h2>
      </div>

      <div className="challenge-grid">
        <div className="challenge-card">
          <div className="challenge-flip-content">
            <div className="challenge-state challenge-problem">
              <h3>Problem</h3>
              <p>{item.problem}</p>
            </div>

            <div className="challenge-state challenge-solution">
              <h3>Solution</h3>
              <p>{item.solution}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const ProcessStep = ({ number, title, text }) => (
  <div className="process-step">
    <span>{number}</span>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

const VisualCaseStudySection = ({
  kicker,
  title,
  description,
  items = [],
  type,
}) => {
  if (!items?.length) return null;

  return (
    <section className={`visual-case-study ${type}`}>
      <div className="case-study-heading">
        <span className="case-study-kicker">{kicker}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className={`visual-grid ${type === 'mockups' ? 'mockup-grid' : ''}`}>
        {items.map((item, index) => (
          <article
            className={`visual-card ${
              index === 0 && type === 'mockups'
                ? 'visual-card-featured'
                : ''
            }`}
            key={`${item.title}-${index}`}
          >
            <div className="visual-image">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>

            <div className="visual-card-content">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectOverview;
