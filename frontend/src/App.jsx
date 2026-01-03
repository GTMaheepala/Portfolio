import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  fetchPortfolio,
  fetchSkills,
  sendContact
} from "./api";
import emailjs from "@emailjs/browser";

const filters = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "app", label: "App" },
  { key: "design", label: "Design" }
];

function SectionTitle({ heading, title }) {
  return (
    <h2 className="section-title" data-heading={heading}>
      {title}
    </h2>
  );
}

function SmokeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const mouse = { x: null, y: null };
    let rafId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          size: Math.random() * 15 + 5,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          opacity: 1
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.size *= 0.96;
        p.opacity -= 0.02;

        ctx.beginPath();
        ctx.fillStyle = `rgba(100, 150, 255, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.opacity <= 0) {
          particles.splice(i, 1);
        }
      });
      rafId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas id="smoke-canvas" ref={canvasRef} aria-hidden />;
}

function Sidebar({ open, onClose, theme, toggleTheme }) {
  return (
    <aside className={`sidebar ${open ? "show-sidebar" : ""}`} id="sidebar">
      <nav className="nav">
        <div className="nav-logo">
          <span className="nav-logo-text">T</span>
        </div>
        <div className="theme-toggle" onClick={toggleTheme}>
          <i className={`uil ${theme === 'dark' ? 'uil-sun' : 'uil-moon'}`}></i>
        </div>
        <div className="nav-menu">
          <div className="menu">
            <ul className="nav-list">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#skills", label: "Skills" },
                { href: "#work", label: "Work" },
                { href: "#services", label: "Services" },
                { href: "#contact", label: "Contact" }
              ].map((item) => (
                <li key={item.href} className="nav-item">
                  <a href={item.href} className="nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="btn-share">
          <i className="uil uil-share-alt social-share"></i>
        </div>
        <div className="nav-close" onClick={onClose}>
          <i className="uil uil-times"></i>
        </div>
      </nav>
    </aside>
  );
}

function Hero() {
  return (
    <section className="home" id="home">
      <div className="home-container container grid">
        <div className="home-social">
          <span className="home-social-follow">Follow Me</span>
          <div className="home-social-links">
            <a href="https://web.facebook.com/tharusha.thathsara.568?mibextid=wwXIfr&_rdc=1&_rdr#" target="_blank" rel="noreferrer" className="home-social-link">
              <i className="uil uil-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/tharu.t.m?igsh=MWd1YzIzMGFla2FtcA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="home-social-link">
              <i className="uil uil-instagram"></i>
            </a>
            <a href="https://x.com/tharushatm?s=21" target="_blank" rel="noreferrer" className="home-social-link">
              <i className="uil uil-twitter"></i>
            </a>
            <a href="https://github.com/GTMaheepala" target="_blank" rel="noreferrer" className="home-social-link">
              <i className="uil uil-github"></i>
            </a>
          </div>
        </div>



        <div className="home-data">
          <h1 className="home-title">Hi, I'm Tharusha Thathsara</h1>
          <h3 className="home-subtitle">Full Stack Developer</h3>
          <p className="home-description">
            I’m a software engineering undergraduate who enjoys building efficient, innovative solutions that help organizations succeed. I’m a motivated team player with strong leadership and communication skills, known for being hardworking, adaptable, and enthusiastic when working with others.
          </p>
          <a href="#about" className="button">
            <i className="uil uil-user button-icon"></i>
            More About me!
          </a>
        </div>

        <div className="my-info">
          <div className="info-item-l">
            <a href="https://www.linkedin.com/in/tharusha-thathsara-a4abb3302" target="_blank" rel="noreferrer">
                <i className="uil uil-linkedin social-share"></i>
            </a>
            <div>
              <h3 className="info-title">LinkedIn</h3>
              <span className="info-subtitle">Tharusha Thathsara</span>
            </div>
          </div>

          <div className="info-item">
            <a
                href="https://wa.me/94760523136"
                target="_blank"
                rel="noopener noreferrer"
                >
                <i className="uil uil-whatsapp info-icon"></i>
            </a>
            <div>
              <h3 className="info-title">Whatsapp</h3>
              <span className="info-subtitle">+94 76 052 3136</span>
            </div>
          </div>

          <div className="info-item">
            <a href="mailto:tharushathathsara37@gmail.com" title="Email me">
                <i className="uil uil-envelope-edit info-icon"></i>
            </a>
            <div>
              <h3 className="info-title">Email</h3>
              <span className="info-subtitle">tharushathathsara37@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section" id="about">
      <SectionTitle heading="My Intro" title="About me" />
      <div className="about-container container grid">
        <img src="/images/tharuwa.png" alt="About" className="about-img" />
        <div className="about-data">
          <h3 className="about-heading">Hi, I'm Tharusha Thathsara, based in Sri Lanka</h3>
          <p className="about-description">
            I'm a software engineering undergraduate with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success . Skilled leader who has the proven ability to motivate, educate and manage a team. Also a hardworking, flexible, enthusiastic and self-motivated individual with a friendly attitude. I believe that I have good interpersonal and communication skills, which makes me getting along and working with people easily.
          </p>
          <div className="about-info">
            <div className="about-box">
              <i className="uil uil-award about-icon"></i>
              <h3 className="about-title">Experience</h3>
              <span className="about-subtitle">2 + Years</span>
            </div>
            <div className="about-box">
              <i className="uil uil-suitcase-alt about-icon"></i>
              <h3 className="about-title">Completed</h3>
              <span className="about-subtitle">3 + Projects</span>
            </div>
            
          </div>
          <a href="#contact" className="button">
            <i className="uil uil-navigator button-icon"></i>Contact me
          </a>
        </div>
      </div>
    </section>
  );
}

function Skills({ groups }) {
  const [active, setActive] = useState(0);

  const current = groups[active] || { skills: [], title: "", subtitle: "" };

  return (
    <section className="skills section" id="skills">
      <SectionTitle heading="My Abilities" title="My Experience" />
      <div className="skills-container container grid">
        <div className="skills-tabs">
          {groups.map((g, idx) => (
            <div
              key={g.title}
              className={`skills-header ${active === idx ? "skills-active" : ""}`}
              data-target={`#${g.title}`}
              onClick={() => setActive(idx)}
            >
              <i className="uil uil-brackets-curly skills-icon"></i>
              <div>
                <h1 className="skills-title">{g.title}</h1>
                <span className="skills-subtitle">{g.subtitle}</span>
              </div>
              <i className="uil uil-angle-down skills-arrow"></i>
            </div>
          ))}
        </div>

        <div className="skills-content">
          <div className="skills-group skills-active" data-content id="frontend">
            <div className="skills-list grid">
              {current.skills.map((skill) => (
                <div key={skill.name} className="skills-data">
                  <div className="skills-titles">
                    <h3 className="skills-name">{skill.name}</h3>
                    <span className="skills-number">{skill.level}%</span>
                  </div>
                  <div className="skills-bar">
                    <span className="skills-percentage" style={{ width: `${skill.level}%` }}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio({ items }) {
  const [filter, setFilter] = useState("all");
  const [modalItem, setModalItem] = useState(null);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [filter, items]
  );

  return (
    <section className="work section" id="work">
      <SectionTitle heading="My Portfolio" title="Recent Works" />
      <div className="work-filters">
        {filters.map((f) => (
          <span
            key={f.key}
            className={`work-item ${filter === f.key ? "active-work" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </span>
        ))}
      </div>

      <div className="work-container container grid">
        {filtered.map((item) => (
          <div key={item._id || item.title} className={`work-card mix ${item.category}`}>
            <img src={item.image} alt={item.title} className="work-img" />
            <h3 className="work-title">{item.title}</h3>
            <span className="work-button" onClick={() => setModalItem(item)}>
              Demo<i className="uil uil-arrow-right work-button-icon"></i>
            </span>

            <div className="portfolio-item-details">
              <h3 className="details-title">{item.details?.title || item.title}</h3>
              <p className="details-description">{item.description}</p>
              <ul className="details-info">
                {item.details?.year && (
                  <li>
                    Created - <span>{item.details.year}</span>
                  </li>
                )}
                {item.details?.technologies?.length && (
                  <li>
                    Technologies - <span>{item.details.technologies.join(", ")}</span>
                  </li>
                )}
                <li>
                  Role - <span>{item.details.role}</span>
                </li>
              </ul>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="button" style={{ marginTop: '1rem' }}>
                  <i className="uil uil-external-link-alt button-icon"></i>
                  Visit
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalItem && (
        <div className="portfolio-popup open" onClick={() => setModalItem(null)}>
          <div className="portfolio-popup-inner" onClick={(e) => e.stopPropagation()}>
            <div className="portfolio-popup-content grid">
              <span className="portfolio-popup-close" onClick={() => setModalItem(null)}>
                <i className="uil uil-times"></i>
              </span>
              <div className="pp-thumbnail">
                <img src={modalItem.image} alt={modalItem.title} className="portfolio-popup-img" />
              </div>
              <div className="portfolio-popup-info">
                <div className="portfolio-popup-subtitle">
                  Featured - <span>{modalItem.category}</span>
                </div>
                <div className="portfolio-popup-body">
                  <h3 className="details-title">{modalItem.details?.title || modalItem.title}</h3>
                  <p className="details-description">{modalItem.description}</p>
                  <ul className="details-info">
                    {modalItem.details?.year && (
                      <li>
                        Created - <span>{modalItem.details.year}</span>
                      </li>
                    )}
                    {modalItem.details?.technologies?.length && (
                      <li>
                        Technologies - <span>{modalItem.details.technologies.join(", ")}</span>
                      </li>
                    )}
                    <li>
                      Role - <span>{modalItem.details.role}</span>
                    </li>
                  </ul>
                  {modalItem.link && (
                    <a href={modalItem.link} target="_blank" rel="noopener noreferrer" className="button" style={{ marginTop: '1.5rem' }}>
                      <i className="uil uil-external-link-alt button-icon"></i>
                      Visit
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(null);
  const services = [
    {
      title: "Web Designer",
      icon: "uil uil-web-grid",
      description: "Motivated Web Designer with hands-on experience in building responsive and interactive web pages using HTML, CSS, JavaScript, and React. Eager to learn new design trends and contribute creative ideas to real-world projects.",
      bullets: [
        "User Interface Development",
        "Web Page Development",
        "Interactive UX/UI Creations",
        "Company Brand Positioning",
        "Design and Mockup of products for companies",
        "Wireframing & Prototyping",
        "Frontend Development (HTML, CSS, JavaScript, React)",
        "Backend Development (PHP, NodeJS, MySQL, MongoDB)"
      ]
    },
    {
      title: "UI/UX Designer",
      icon: "uil uil-arrow",
      description: "A passionate UI/UX Designer dedicated to creating user-friendly, visually appealing, and accessible digital products through research-driven design and modern UI principles.",
      bullets: [
        "Usability Testing",
        "User Research",
        "Interaction Design",
        "Responsive Design",
        "Branding & Style Guides",
        "Accessibility"
      ]
    }
  ];

  return (
    <section className="services section" id="services">
      <SectionTitle heading="Services" title="What I Offer" />
      <div className="services-container container grid" style={{ gridTemplateColumns: 'repeat(2, 250px)' }}>
        {services.map((service, idx) => (
          <div key={service.title} className="services-content">
            <div>
              <i className={`${service.icon} services-icon`}></i>
              <h3 className="services-title">
                {service.title.split(" ").map((part, i) => (
                  <React.Fragment key={part + i}>
                    {part}
                    <br />
                  </React.Fragment>
                ))}
              </h3>
            </div>
            <span className="services-button" onClick={() => setActive(idx)}>
              View More <i className="uil uil-arrow-right services-button-icon"></i>
            </span>

            <div className={`services-modal ${active === idx ? "active-modal" : ""}`}>
              <div className="services-modal-content">
                <i className="uil uil-times services-modal-close" onClick={() => setActive(null)}></i>
                <h3 className="services-modal-title">{service.title}</h3>
                <p className="services-modal-description">{service.description}</p>
                <ul className="services-modal-services grid">
                  {service.bullets.map((b) => (
                    <li key={b} className="services-modal-service">
                      <i className="uil uil-check-circle services-modal-icon"></i>
                      <p className="services-modal-info">{b}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onFocus = (e) => {
    const parent = e.currentTarget.parentNode;
    parent.classList.add("focus");
  };

  const onBlur = (e) => {
    const parent = e.currentTarget.parentNode;
    if (!e.currentTarget.value) {
      parent.classList.remove("focus");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setError("Email service is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          subject: form.subject || "Contact Form Message",
          message: form.message
        },
        { publicKey }
      );

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS send error:", err);
      setStatus("error");
      const msg = err?.text || err?.message || "Failed to send message. Please try again.";
      setError(msg);
    }
  };

  return (
    <section className="contact section" id="contact">
      <SectionTitle heading="Get in Touch" title="Contact me" />
      <div className="contact-container container grid">
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <i className="uil uil-envelope-edit contact-card-icon"></i>
              <h3 className="contact-card-title">Email</h3>
              <span className="contact-card-data">tharushathathsara37@gmail.com</span>
              <a href="mailto:tharushathathsara37@gmail.com" className="contact-button">
                Write me <i className="uil uil-arrow-right contact-button-icon"></i>
              </a>
            </div>
            <div className="contact-card">
              <i className="uil uil-whatsapp contact-card-icon"></i>
              <h3 className="contact-card-title">Whatsapp</h3>
              <span className="contact-card-data">+94 76 052 3136</span>
              <a href="https://wa.me/94760523136" className="contact-button" target="_blank" rel="noopener noreferrer">
                Write me <i className="uil uil-arrow-right contact-button-icon"></i>
              </a>
            </div>
            <div className="contact-card">
              <i className="uil uil-linkedin contact-card-icon"></i>
              <h3 className="contact-card-title">LinkedIn</h3>
              <span className="contact-card-data">Tharusha Thathsara</span>
              <a href="https://www.linkedin.com/in/tharusha-thathsara-a4abb3302" target="_blank" rel="noopener noreferrer" className="contact-button">
                Write me <i className="uil uil-arrow-right contact-button-icon"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-content">
          <form className="contact-form" onSubmit={submit}>
            <div className="input-container">
              <input
                type="text"
                name="name"
                className="input"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <label>Username</label>
              <span>Username</span>
            </div>

            <div className="input-container">
              <input
                type="email"
                name="email"
                className="input"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <label>Email</label>
              <span>Email</span>
            </div>

            <div className="input-container">
              <input
                type="text"
                name="subject"
                className="input"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <label>Subject</label>
              <span>Subject</span>
            </div>

            <div className="input-container textarea">
              <textarea
                name="message"
                className="input"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={onFocus}
                onBlur={onBlur}
              ></textarea>
              <label>Message</label>
              <span>Message</span>
            </div>

            <button type="submit" className="button" disabled={status === "loading"}>
              <i className="uil uil-navigator button-icon"></i>
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && <p className="success">Thanks! I will reply soon.</p>}
            {status === "error" && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg">
        <div className="footer-container container grid">
          <div>
            <h1 className="footer-title">Tharusha</h1>
            <span className="footer-subtitle">Full Stack Developer</span>
          </div>
          <ul className="footer-links">
            <li>
              <a href="#services" className="footer-links">Services</a>
            </li>
            <li>
              <a href="#work" className="footer-links">Work</a>
            </li>
            <li>
              <a href="#contact" className="footer-links">Contact</a>
            </li>
          </ul>
          <div className="footer-socials">
            <a href="https://web.facebook.com/tharusha.thathsara.568?mibextid=wwXIfr&_rdc=1&_rdr#" target="_blank" rel="noreferrer" className="footer-social">
              <i className="uil uil-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/tharu.t.m?igsh=MWd1YzIzMGFla2FtcA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="footer-social">
              <i className="uil uil-instagram"></i>
            </a>
            <a href="https://x.com/tharushatm?s=21" target="_blank" rel="noreferrer" className="footer-social">
              <i className="uil uil-twitter"></i>
            </a>
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} <a href="#">Tharusha</a>. All rights reserved
        </p>
      </div>
    </footer>
  );
}

const defaultSkills = [
  {
    title: "Frontend Development",
    subtitle: "2 Years Experience",
    skills: [
      { name: "React", level: 70 },
      { name: "JavaScript", level: 85 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 }
    ]
  },
  {
    title: "UI/UX Design",
    subtitle: "1 Years Experience",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Prototyping", level: 80 },
      { name: "PhotoShop", level: 75 },
      { name: "Wireframing", level: 90 }
    ]
  },
  {
  title: "Backend Development",
  subtitle: "2 Year Experience",
  skills: [
    { name: "MySQL", level: 75 },
    { name: "PHP", level: 70 },
    { name: "MongoDB", level: 65 },
    { name: "Java", level: 60 },
    { name: "Python", level: 50 },
    { name: "NodeJS", level: 60 },
    { name: "Kotlin", level: 55 },
    { name: "C/C++", level: 70 }
  ]
}
];

const defaultPortfolio = [
  {
    _id: 1,
    title: "Police 360 Web Design",
    category: "web",
    image: "/images/police360.png",
    link: "https://police360-frontend.vercel.app/",
    description: "A full-stack system to manage police complaints, officers, evidence, and case progress efficiently.",
    details: { year: 2025, technologies: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "Tailwind CSS"], role: "complaint management" }
  },
  {
    _id: 2,
    title: "The Fresh Mart Web Design",
    category: "web",
    image: "/images/grocery.png",
    description: "Built a web-based grocery ordering system to digitize local grocery shopping for efficiency and convenience.",
    details: { year: 2025, technologies: ["JAVA", "PHP", "HTML", "JavaScript", "CSS", "MySQL"], role: "Role based user management , Frontend and Backend Development" }
  },
  {
    _id: 3,
    title: "Fashion Haven Web Design",
    category: "web",
    image: "/images/fashion.png",
    description: "Developed a dynamic and responsive fashion retail website targeting youth and style-conscious shoppers.",
    details: { year: 2024, technologies: ["HTML", "JavaScript", "CSS", "MySQL"],role: "Role based user management , Frontend and Backend Development" }
  },
  {
    _id: 4,
    title: "Furni House Mobile App",
    category: "app",
    image: "/images/Furni app.jpg",
    description: "Android mobile application & A native Android app built to simplify furniture shopping with a smooth and modern mobile experience.",
    details: { year: 2025, technologies: ["Kotlin", "Android SDK", "Gradle"],role: "UI/UX Design , Function" }
  },
  {
    _id: 5,
    title: "Wellnest Mobile App",
    category: "app",
    image: "/images/wellnest.png",
    description: "Android mobile application & A wellness app promoting healthy habits through guided activities and progress tracking.",
    details: { year: 2025, technologies: ["Kotlin", "Android SDK", "Gradle"], role: "UI/UX Design , Key Functionality" }
  },
  {
    _id: 6,
    title: "Furni House UI Design",
    link: "https://www.figma.com/design/DQ1EnZz4vmupHuVuHbYMRB/Untitled?node-id=0-1&t=dqVAw0hg1XTrTBpp-1",
    category: "design",
    image: "/images/furni house uiux.png",
    description: "Complete UI design system",
    details: { year: 2025, technologies: ["Figma", "Design System"], role: "UI/UX Design" }
  }
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [skills, setSkills] = useState(defaultSkills);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="page">
      <SmokeCanvas />
      <div className="nav-toggle" onClick={() => setSidebarOpen(true)}>
        <i className="uil uil-bars"></i>
      </div>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} theme={theme} toggleTheme={toggleTheme} />
      <main className="main">
        <Hero />
        <About />
        {loading && <p className="muted center">Loading content...</p>}
        {error && <p className="error center">{error}</p>}
        {!loading && !error && (
          <>
            <Skills groups={skills} />
            <Portfolio items={portfolio} />
            <Services />
          </>
        )}
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
