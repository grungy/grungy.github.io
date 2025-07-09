import React from 'react';
import './App.css';
import SpaceshipRLBackground from './SpaceshipRLBackground';

const profilePic = '/imgs/bio-photo.jpeg'; // Placeholder, replace with your own image if desired

const socials = [
  { href: 'https://twitter.com/', icon: '🐦', label: 'Twitter' },
  { href: 'https://github.com/', icon: '💻', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/joshmarks/', icon: '👔', label: 'LinkedIn' },
  { href: 'https://joshmarks.substack.com', icon: '👀', label: 'Substack' },
];

const history = [
  {
    years: '2025–Present',
    title: 'Principal AI Engineer',
    org: 'InFactory',
    desc: [
      'Research Experience: Investigating and Aligning LLM Reasoning for Structured Language Generation',
      'Investigated the limits of LLM procedural generation, demonstrating that direct natural language to stateful DSL translation is a brittle task. Pivoted to a query classification task, which improved baseline model accuracy from <10% to >60%, and validated a modular, multi-expert architecture that decouples high-level reasoning from low-level syntactic generation for a more robust and reliable system.',
      'Pioneered a method for programmatic "question-space exploration" by developing a data-to-question pipeline that automatically generates a diverse corpus of analytical queries. This work established the foundation for systematically evaluating the analytical capabilities of language models.',
      'Developed a formal framework of Generalized Analytic Functions (GAFs) to define the semantic space of core business intelligence patterns (e.g., ranking, intersection). Leveraged this framework to ensure that synthetically generated datasets achieved comprehensive "semantic coverage" of a system\'s analytical potential.',
      'Developed a methodology for controlling synthetic data distribution by engineering a GPT-4.1 based generation pipeline with a "master syllabus" and quota-based curation. This process solved critical data skew issues and allowed for the targeted reinforcement of specific, complex reasoning patterns in smaller models.',
      'Conducted a comparative analysis of model scaling and instruction-tuning (Qwen2 0.5B to 8B series), diagnosing fundamental behavioral differences between base and instruction-tuned models. Proved that for instruction-based tasks, the model\'s pre-existing alignment is a more critical factor than raw parameter count.',
      'Investigated the impact of prompt structure on model adherence, demonstrating that structured chat formats with explicit system roles are a highly effective method for mitigating conversational leakage and enforcing strict format compliance in finetuned Instruct models.',
      'Established a rigorous diagnostic framework for model evaluation, using per-category scoring against a "golden" test set to identify and quantify model weaknesses (e.g., pattern confusion vs. state management failures). Used these diagnostics to iteratively improve model accuracy on complex reasoning tasks through targeted data enrichment.'
    ]
  },
  {
    years: '2023–2025',
    title: 'Principal AI Engineer',
    org: 'Istari Digital',
    desc: [
      '3D Mesh Generation: Developed machine learning models for 3D mesh generation and object classification, using Graph Neural Networks and transformers to deliver a prototype that addressed a high-level business need for aerospace component classification.',
      'Federated Learning for Data Privacy: Designed methods for secure federated learning across IP boundaries, resulting in a core patent and enabling privacy-preserving machine learning solutions for clients.',
      'Infrastructure Automation: Reduced platform deployment time from weeks to 2 hours by authoring Terraform configurations to set up subnets, routing, DNS, TLS, EC2 instances, and Kubernetes clusters.',
      'Observability Implementation: Improved software development velocity by 30% by configuring Grafana, Loki, and OpenTelemetry for real-time logging, monitoring, and telemetry.',
      'Fostered a Collaborative Team environment by facilitating leadership meetings and mentoring two direct reports, improving team cohesion and project delivery. Authored clear and concise design documents to drive stakeholder alignment.'
    ]
  },
  {
    years: '2022–2022',
    title: 'Staff Electrical Engineer',
    org: 'Tesla',
    desc: [
      'Internal Software Tools Development: Developed a Python-based internal web application (Django) for datasheet generation, providing the company with the first internal datasheets and improving communication between different teams in the powertrain organization.',
      'Cybertruck Differential Development: Designed and tested firmware for the Cybertruck differential, enhancing component reliability and performance under extreme conditions.',
      'System-Level Modeling: Completed System-level modeling of the Tesla Model S Plaid to perform root cause analysis and determine why the battery cables failed in the field; derived a solution that optimized among the competing safety, mechanical, electrical, and regulatory requirements.',
      'Electromagnetic Emissions (EMC/EMI): Designed experiments to measure the electromagnetic emissions from prototypes.',
      'Cross-Functional Leadership: Led a team to troubleshoot and resolve critical issues in the Tesla Semi-truck, saving $1M+ and meeting contractual goals for Pepsi deliveries.'
    ]
  },
  {
    years: '2019–2022',
    title: 'Senior Software Engineer',
    org: 'Defense Digital Service',
    desc: [
      'IPv4 Router Classification: Collaborated with cross-functional teams to design an innovative process for anomaly detection in routers, effectively communicating findings to technical and non-technical stakeholders.',
      'Afghanistan Refugee Visa Processing Web Application: Developed a backend using FastAPI and AWS infrastructure to enable the safe evacuation of more refugees from Afghanistan for the State Department.',
      'Golang Command and Control Framework: Wrote a Command and Control framework in Golang to control distributed RF sensors in the field with high-security requirements.',
      'Signal Processing: Performed signal processing on sensor data to detect and alert about certain signals.',
      'Hardware and Firmware Design: Designed and manufactured an RF sensor product at scale (circuit design, Printed Circuit Board design, firmware, design for manufacturing, environmental testing)'
    ]
  },
  {
    years: '2011–2019',
    title: 'Principal Engineer',
    org: 'Chip Design Systems',
    desc: [
      'Designed and built a computer vision platform that simulated camera inputs and hardware outputs to enable faster local development of computer vision algorithms.',
      'Performed data analysis on large, multi-dimensional data sets to characterize image aggressors, optimize performance, and debug an Infrared LED micro-display.',
      'Designed and built Python and OpenCL (GPU) code for real-time per-pixel Non-Uniformity Correction algorithms at a 1KHz frame rate.',
      'Designed and built a ”Test as code” infrastructure that enabled an experiment to be run from a Python file to enable accurate reproducibility and easier documentation of experiments.',
      'Designed and built a statistical classifier for pixel quality.'
    ]
  }
];

const education = [
  {
    years: '2011–2019',
    degree: 'Ph.D. Electrical and Computer Engineering',
    school: 'University of Delaware',
    desc: [
      'Ph.D. Dissertation: Abutted IRLED Infrared Scene Projector Design and Characterization',
      'Focus Area: Electro-optics and Embedded Systems.'
    ]
  },
  {
    years: '2007–2011',
    degree: 'Bachelor of Electrical Engineering B.E.E.',
    school: 'University of Delaware',
    desc: []
  }
];

const featured = [
  {
    href: 'https://www.youtube.com/',
    img: 'https://img.youtube.com/vi/7xTGNNLPyMI/0.jpg',
    desc: 'Deep Dive into LLMs',
  },
  {
    href: 'https://www.youtube.com/',
    img: 'https://img.youtube.com/vi/EWvNQjAaOHw/0.jpg',
    desc: 'How I use LLMs',
  },
  {
    href: 'https://www.youtube.com/',
    img: 'https://img.youtube.com/vi/zjkBMFhNj_g/0.jpg',
    desc: 'Intro to Large Language Models',
  },
];

function App() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          padding: '3.5rem 0 2.5rem 0',
          textAlign: 'center',
          borderBottom: '1px solid #ddeef8',
          marginBottom: '2.5rem',
          overflow: 'hidden',
          background: 'linear-gradient(120deg, hsl(200, 70%, 78%) 0%, hsl(200, 70%, 70%) 100%)',
        }}
      >
        {/* RL Agent as hero background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            opacity: 0.18,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <SpaceshipRLBackground />
          </div>
        </div>
        {/* SVG Backgrounds from Josh Comeau's site (exact copy) */}
        <svg
          width="100%"
          height="456"
          viewBox="0 0 5120 456"
          fill="none"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '456px',
            zIndex: 0,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="hsl(200, 80%, 83%)"
            d="M2467 198C2478.93 198 2508.5 148.5 2692.3 167C2855.77 183.454 2890 275.92 2940.45 271C2978.5 267.29 3025.5 66.1073 3208.04 55.5002C3364.5 46.408 3407.37 123 3419.5 123.5C3431.63 124 3448.89 83.0002 3564.32 83.0002C3728 83.0002 3767.67 198.501 3779.08 198C3790.5 197.5 3808 45.0002 4044.68 45.0002C4238.5 45.0002 4245.32 120.5 4256.5 116.5C4267.69 112.5 4277 13.5002 4417.9 13.5002C4567 13.5002 4590.74 115.5 4608.5 116.5C4626.26 117.5 4640.5 13.5007 4795 13.5004C4946 13.5002 4954.43 76.5003 4970.51 76.5003C4986.6 76.5003 4983 8.5 5077 8.5C5147.13 8.5 5148.62 62.7657 5148.14 74.3437C5148.08 75.8075 5148 77.2344 5148 78.6994V360V361.5C5148 383.592 5130.09 401.5 5108 401.5H9C-13.0914 401.5 -31 383.592 -31 361.5V133.5V76.0021V76.0002C-31 75.9604 -30.9925 -7.80104e-05 24 0C103.747 0.000113126 132.617 67.9717 143.069 117.186C148.413 142.347 172.927 161.481 197.99 155.7L478.5 91C598.5 64.5 646 110.5 659 110.5C672 110.5 714 31 856 33.5C998 36 996.5 76 1008.5 73.5C1020.5 71 1014.28 28.0329 1174.5 31C1309.5 33.5 1298.5 110.5 1327.5 110.5C1366.31 110.5 1378.25 109.457 1388 110.5C1406.69 112.5 1429.5 27 1615 27C1743.74 27 1771.09 161.183 1855.16 167C1930.28 172.198 1914.5 85 2032.05 90.0002C2108.93 93.2702 2132.33 148 2146.16 148C2160 148 2184 81.6655 2318.08 102.5C2440.5 121.524 2455.07 198 2467 198Z"
          />
          <path
            fill="hsl(200, 68%, 92%)"
            d="M2617 234C2496.99 229.765 2429.72 276.108 2400.53 303.732C2388.43 315.177 2372.83 323.5 2356.18 323.5H2135.62C2111.05 323.5 2089.95 305.704 2082.79 282.198C2061.56 212.504 2001.53 78.3592 1852.75 71.0003C1691 63 1645 185 1622 186.5C1599 188 1587 88.5 1368.5 88.5C1211 88.5 1180 157.5 1158.4 161.5C1136.8 165.501 1074.33 111 931 129.5C787.671 148 789.676 214.5 770 214C750.324 213.5 736.5 129.5 535.029 142.5C416.863 150.125 382.163 211.07 373.669 260.166C368.141 292.123 343.421 323.5 310.99 323.5H280.024C249.079 323.5 225.052 295.503 224.331 264.567C222.732 195.98 200.305 92 79 92C17.4738 92 3.47982 128.37 0.653094 139.38C0.122368 141.447 0 143.571 0 145.705V398C0 412.36 11.6404 424 25.9998 424H5100C5127.61 424 5150 401.615 5150 374V365V181.851C5150 149.381 5119.54 125.514 5087.89 132.773C5054.67 140.392 5019.02 148.008 5011.31 147.5C4996.11 146.501 4966.41 99.9071 4859.43 95.5003C4731 90.2096 4684 213.5 4663 213.5H4531.84C4513.48 213.5 4496.63 203.435 4485.66 188.715C4451.8 143.286 4365.08 52.9127 4220.67 71.0003C4061 91.0002 4023.5 150.5 4006.5 150.5C3989.5 150.5 3925.6 96.5092 3797.5 100.5C3637 105.5 3599 235.5 3589 231.5C3563.12 221.148 3430.32 192.596 3405.38 180.145C3382.96 168.954 3354.61 161.5 3318.87 161.5C3175.43 161.5 3129.73 224 3116.87 224C3104 224 3073.62 179.5 2953.5 179.5C2782 179.5 2771.92 286 2756 284.5C2740.08 283 2721.1 237.674 2617 234Z"
          />
        </svg>
        {/* Main hero content (profile, name, RL agent, etc.) */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto', padding: '0 1rem' }}>
          {/* Profile Photo */}
          <img
            src={profilePic}
            alt="Profile"
            style={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #fff',
              boxShadow: '0 2px 12px rgba(64,149,191,0.10)',
              marginBottom: '1.5rem',
              background: '#eee',
            }}
          />
          <h1 style={{ fontSize: '2.7rem', fontWeight: 700, margin: 0, color: '#4242fa', letterSpacing: '-1px' }}>
            Josh Marks
          </h1>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 400, color: '#6c7693', margin: '0.7rem 0 1.2rem 0' }}>
            I like to build and test cool hardware and software 🧠🤖💡
          </h2>
          <div className="socials" style={{ marginBottom: '1.5rem' }}>
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ margin: '0 0.7rem', color: 'inherit', textDecoration: 'none', fontSize: '1.3em' }} title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </section>
      <div className="karpathy-style">
        {/* Header (now just profile pic, if desired) */}
        {/* <div className="container header-section">
          <div className="header-row">
            <div className="profile-pic">
              <img src={profilePic} alt="Profile" className="ppic" />
            </div>
            <div className="header-desc">
              <h1>Josh Marks</h1>
              <h2>I like to build and test cool hardware and software 🧠🤖💡</h2>
              <div className="socials">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} className="social-icon">{s.icon}</a>
                ))}
              </div>
            </div>
          </div>
          RL Environment Frame
          <div className="rl-frame">
            <SpaceshipRLBackground />
          </div>
        </div> */}
        <hr />
        {/* Timeline/History */}
        <div className="container history-section">
          {history.map((item, i) => (
            <div className="entry-row" key={i}>
              <div className="entry-years">{item.years}</div>
              <div className="entry-dot"></div>
              <div className="entry-desc">
                <strong>{item.title}</strong> @ {item.org}
                <ul className="entry-detail">
                  {item.desc.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        {/* Education Section */}
        <div className="container history-section">
          <h2 style={{ fontSize: '1.3rem', color: '#0074d9', margin: '32px 0 20px 0' }}>Education</h2>
          {education.map((item, i) => (
            <div className="entry-row" key={i}>
              <div className="entry-years">{item.years}</div>
              <div className="entry-dot"></div>
              <div className="entry-desc">
                <strong>{item.degree}</strong> @ {item.school}
                {item.desc.length > 0 && (
                  <ul className="entry-detail">
                    {item.desc.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer style={{
        background: 'var(--color-bg-alt, #e8f1fc)',
        borderTop: '1px solid var(--color-border, #ddeef8)',
        marginTop: '3rem',
        padding: '2rem 0 1.5rem 0',
        textAlign: 'center',
        fontSize: '1rem',
        color: 'var(--color-muted, #6c7693)',
      }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <a href="https://github.com/joshmarks" target="_blank" rel="noopener noreferrer" style={{ margin: '0 0.7rem', color: 'inherit', textDecoration: 'none', fontSize: '1.3em' }} title="GitHub">💻</a>
          <a href="https://www.linkedin.com/in/joshmarks/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 0.7rem', color: 'inherit', textDecoration: 'none', fontSize: '1.3em' }} title="LinkedIn">👔</a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 0.7rem', color: 'inherit', textDecoration: 'none', fontSize: '1.3em' }} title="Twitter">🐦</a>
          <a href="https://joshmarks.substack.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 0.7rem', color: 'inherit', textDecoration: 'none', fontSize: '1.3em' }} title="Substack">👀</a>
        </div>
        <div style={{ fontSize: '0.95em' }}>
          © {new Date().getFullYear()} Josh Marks. All Rights Reserved.
        </div>
      </footer>
    </>
  );
}

export default App;
