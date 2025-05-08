import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import './Portfolio3.css';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('frontend');
  
  // Animation du texte
  const [displayText, setDisplayText] = useState('');
  const fullText = "Développeur Web. Créatif. Passionné.";
  const [index, setIndex] = useState(0);

  // Références pour les animations au scroll
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  
  
  // Fonction pour ouvrir Gmail avec les détails du projet
  function Submit(e) {
    e.preventDefault(); // Empêche la page de se recharger immédiatement
  
    const formEle = document.querySelector(".contact-form");
    const formDatab = new FormData(formEle);
  
    fetch(
      "https://script.google.com/macros/s/AKfycbxsxCvNAihNd6NDN1tWrI4VTecxIvid6B5_9FYcfMchxgwIXnjnEHND9zlglHcYtFnw/exec",
      {
        method: "POST",
        body: formDatab,
      }
    )
      .then((res) => res.text()) // car la réponse n'est pas du JSON
      .then((data) => {
        console.log(data); // affiche le texte brut
  
        Swal.fire({
          title: 'Message envoyé!',
          text: 'Votre message a bien été transmis.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redirige vers l'accueil
          window.location.href = "/";
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Erreur',
          text: "Une erreur s'est produite lors de l'envoi.",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  
  
  const redirectToGmail = (project) => {
    const subject = encodeURIComponent(`Demande de code pour le projet: ${project.title}`);
    const body = encodeURIComponent(
      `Bonjour Mouad,\n\nJe suis intéressé(e) par le code du projet "${project.title}".\n\nMerci,`
    );
    window.location.href = `mailto:mouadsalah60@gmail.com?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText.charAt(index));
        setIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index]);

  // Effet de lumière dynamique
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animations au scroll
  useEffect(() => {
    // Pour les animations au scroll
    const fadeElems = document.querySelectorAll('.fade-in-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    fadeElems.forEach(el => observer.observe(el));

    // Pour animer les barres de compétences
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width') || '0%';
          entry.target.style.width = width;
        }
      });
    }, { threshold: 0.1 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));

    return () => {
      observer.disconnect();
      skillObserver.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategory = (category) => {
    // Si on clique sur la catégorie déjà active, on la désactive
    if (activeSkillCategory === category) {
      setActiveSkillCategory(null);
    } else {
      // Sinon, on active la catégorie cliquée
      setActiveSkillCategory(category);
      
      // Réinitialiser les animations des barres de compétences après un court délai
      // pour permettre aux éléments d'être rendus
      setTimeout(() => {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
          // Réinitialiser la largeur à 0
          bar.style.width = '0';
          
          // Forcer un reflow pour que l'animation fonctionne à nouveau
          void bar.offsetWidth;
          
          // Puis animer vers la valeur cible
          const width = bar.getAttribute('data-width') || '0%';
          bar.style.width = width;
        });
      }, 50);
    }
  };

  const projects = [
    {
      id: 1,
      title: "Plateforme educative",
      description: "Plateforme d'apprentissage en ligne avec des cours, des tests et des quizz interactifs, avec interface admin et interface utilisateur",
      technologies: ["React", "Laravel", "CSS"],
      image: "/projets/Plateformeeducative.png",
      isPremium: true
    },
    {
      id: 2,
      title: "Portfolio Dynamique",
      description: "Portfolio créatif avec animations et interactions",
      technologies: ["React", "CSS", "Framer Motion"],
      image: "/projets/Portfolio.png",
      isPremium: true
    },
    {
      id: 3,
      title: "Plateforme de reservation immobiliere",
      description: "Plateforme intuitive de réservation immobilière permettant aux utilisateurs de rechercher, comparer et réserver des biens en ligne en temps réel. Intègre une gestion des annonces, un système de calendrier de disponibilité, des filtres de recherche avancés et un espace sécurisé pour les paiement",
      technologies: ["Symfony", "Bootstrap", "CSS"],
      image: "/projets/Agenceimm.png",
      isPremium: true
    },
    {
      id: 4,
      title: "To Do List",
      description: "Application de gestion de tâches simple et efficace permettant aux utilisateurs d'ajouter, modifier, supprimer et marquer des tâches comme terminées",
      technologies: ["HTML", "CSS", "JAVASCRIPT"],
      image: "/projets/todlist1.png",
      githubLink: "https://github.com/mouadslh/To-do-list"
    },
    {
      id: 5,
      title: "To Do List 2",
      description: "Application de gestion de tâches simple et efficace permettant aux utilisateurs d'ajouter, modifier, supprimer et marquer des tâches comme terminées",
      technologies: ["Django", "CSS"],
      image: "/projets/todolist.png",
      githubLink: "https://github.com/mouadslh/django_TODOlist"
    },
    {
      id: 6,
      title: "Template e-commerce",
      description: "Template e-commerce moderne et responsive conçu pour présenter des produits, gérer un panier d'achats et simuler le processus de commande. Inclut une mise en page optimisée, des filtres de produits, et une interface utilisateur fluide adaptée à tous les appareils",
      technologies: ["HTML", "CSS", "JAVASCRIPT"],
      image: "/projets/panier.png",
      githubLink: "https://github.com/mouadslh/StockPlante"
    },
  ];

  const skills = {
    frontend: [
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "React", level: 90 },
      { name: "Vue.js", level: 75 },
      { name: "Angular", level: 70 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Bootstrap", level: 85 },
      { name: "Vite.js", level: 85 },
    
    ],
    backend: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 75 },
      { name: "PHP", level: 70 },
      { name: "Laravel", level: 95 },
      { name: "Python", level: 85 },
      { name: "Django", level: 70 },
      { name: "Java", level: 75 },
      { name: "Symfony", level: 75 },
    ],
    database: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "SQLite", level: 70 },
      { name: "SQLserver", level: 70 },
    ],
   
    devops: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "Docker", level: 65 },
      { name: "CI/CD", level: 60 },
      { name: "Linux", level: 70 },
    ],
  };

  return (
    <div className={`portfolio-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <header className="header">
        <div className="logo">MonPortfolio</div>
        
        {/* Menu burger pour mobile */}
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation - Desktop */}
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="#home" className="nav-link">Accueil</a>
          <a href="#projects" className="nav-link">Projets</a>
          <a href="#skills" className="nav-link">Compétences</a>
          <a href="#about" className="nav-link">À propos</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content fade-in-section">
          <h1 className="hero-title">Bonjour, je suis <span className="highlight">Mouad Salah</span></h1>
          <h2 className="hero-subtitle">{displayText}<span className="cursor">|</span></h2>
          <p className="hero-description">
            Je conçois et développe des applications web modernes et attrayantes.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn primary-btn">Me Contacter</a>
            <a href="#projects" className="btn secondary-btn">Voir mes projets</a>
          </div>
        </div>
        <div className="hero-image fade-in-section">
          <div className="code-snippet dynamic-light-effect">
            <div className="light-blob"></div>
            <pre>
              <code>
{`function Developer() {
  const skills = ['Voir Competences', 'Voir Projets'];
  const passion = 'Creating amazing web experiences';
  
  return (
    <Developer 
      isAvailable={true}
      lookingFor="Exciting projects"
    />
  );
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>

     {/* Sections séquentielles (sans onglets) */}
      <section className="content-container">
        
        {/* Section Projets */}
        <div className="section-wrapper fade-in-section" id="projects" ref={projectsRef}>
  <h2 className="section-title">Mes Projets</h2>
  <div className="projects-grid">
    {projects.map(project => (
      <div className="project-card fade-in-section" key={project.id}>
        <div className="project-image">
          <img src={project.image} alt={project.title} />
          {project.isPremium && (
            <div className="premium-badge">
              <span>👑 Premium</span>
            </div>
          )}
        </div>
        <div className="project-info">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tech">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
          <div className="project-links">
            {project.isPremium ? (
              <button
                className="project-link premium-link"
                onClick={() => redirectToGmail(project)}
              >
                Obtenir le code
              </button>
            ) : (
              <a
                href={project.githubLink}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Section Compétences */}
        <div className="section-wrapper fade-in-section" id="skills" ref={skillsRef}>
          <h2 className="section-title">Mes Compétences</h2>
          
          <div className="skill-categories-tabs">
            {Object.keys(skills).map((category) => (
              <button 
                key={category}
                className={`skill-category-tab ${activeSkillCategory === category ? 'active' : ''}`}
                onClick={() => toggleCategory(category)}
              >
                {category.toUpperCase()}
                <span className="skill-count">{skills[category].length}</span>
              </button>
            ))}
          </div>
          
          <div className="skills-display">
            {Object.entries(skills).map(([category, skillList]) => (
              <div 
                key={category} 
                className={`skill-category ${activeSkillCategory === category ? 'active' : 'hidden'}`}
              >
                <div className="skills-container">
                  {skillList.map((skill, index) => (
                    <div className="skill fade-in-section" key={index}>
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          data-width={`${skill.level}%`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section À Propos */}
        <div className="section-wrapper fade-in-section" id="about" ref={aboutRef}>
          <h2 className="section-title">À Propos de Moi</h2>
          <div className="about-content">
            <div className="about-image fade-in-section">
              <div className="avatar">
          
              </div>
            </div>
            <div className="about-text fade-in-section">
              <p>
                Passionné par le développement web, je crée des expériences web interactives et modernes. 
                Mon approche combine créativité et rigueur technique pour livrer des projets qui se démarquent.
              </p>
              <p>
                J'aime relever de nouveaux défis et me tenir à jour des dernières tendances et technologies du web.
                Quand je ne code pas, vous me trouverez probablement en train d'explorer de nouvelles bibliothèques, 
                de contribuer à des projets open source ou de partager mes connaissances avec la communauté.
              </p>
              <a href="./assets/monCV.pdf" className="btn download-cv" download="CV_Mouad_Salah.pdf">Télécharger CV</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section fade-in-section" ref={contactRef}>
        <h2 className="section-title">Me Contacter</h2>
        <div className="contact-container">
          <div className="contact-info fade-in-section">
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <p>mouadsalah60@gmail.com</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <p>+212 627721750</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <p>Casablanca , Maroc</p>
            </div>
            <div className="social-links">
              <a href="https://github.com/mouadslh" className="social-link">GitHub</a>
              <a href="https://www.linkedin.com/in/mouad-salah-5660932b2/" className="social-link">LinkedIn</a>
              
            </div>
          </div>
          
          <form className="contact-form fade-in-section" onSubmit={(e) => Submit(e)}>

            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input type="text" id="name" name="Name" nameplaceholder="Votre nom" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="Email" placeholder="Votre email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" name="Message"  placeholder="Votre message"></textarea>
            </div>
            <button type="submit" className="btn primary-btn">Envoyer</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Mouad Salah. Tous droits réservés .</p>
      </footer>

      {/* CSS pour les animations */}
      <style jsx>{`
        /* Variables pour l'effet de lumière */
        :root {
          --mouse-x: 0px;
          --mouse-y: 0px;
        }
        
        /* Styles pour fade-in */
        .fade-in-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          transition-delay: 0.1s;
        }
        
        .fade-in-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Styles pour les barres de compétences */
        .skill-progress {
          transition: width 1.2s ease-out;
        }
        
        /* Effet de lumière dynamique */
        .dynamic-light-effect {
          position: relative;
          overflow: hidden;
        }
        
        .light-blob {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(66, 153, 225, 0.8) 0%, rgba(66, 153, 225, 0) 70%);
          border-radius: 50%;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
          transform: translate(-50%, -50%);
          left: var(--mouse-x);
          top: var(--mouse-y);
        }
        
        .code-snippet {
          position: relative;
          z-index: 1;
        }
        
        .code-snippet code {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;