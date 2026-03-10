import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Globe, 
  Search, 
  ChevronRight, 
  Menu, 
  X,
  Layers,
  Zap,
  Terminal
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-deep/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-neon-green rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Terminal className="text-bg-deep w-6 h-6" />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter uppercase">
            Koodaaja<span className="text-neon-green">.com</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-neon-green transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg-slate border-b border-white/5 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-text-secondary hover:text-neon-green transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-display font-bold mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-text-secondary max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const SkillCard = ({ title, description, icon: Icon, delay = 0 }: { title: string; description: string; icon: any; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl bg-bg-card border border-white/5 hover:border-neon-green/30 transition-all group"
  >
    <div className="w-12 h-12 bg-bg-slate rounded-xl flex items-center justify-center mb-6 group-hover:bg-neon-green/10 transition-colors">
      <Icon className="text-neon-green w-6 h-6" />
    </div>
    <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
    <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    <div className="mt-6 flex items-center gap-2 text-neon-green text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
      Learn More <ChevronRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const ProjectCard = ({ title, description, image, tags, link, featured = false }: { title: string; description: string; image: string; tags: string[]; link: string; featured?: boolean; key?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`group relative overflow-hidden rounded-2xl ${featured ? 'md:flex md:items-center gap-12 mb-24' : 'bg-bg-card border border-white/5'}`}
  >
    <div className={`relative overflow-hidden rounded-2xl ${featured ? 'md:w-3/5' : 'aspect-video'}`}>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-bg-deep/40 group-hover:bg-bg-deep/20 transition-colors"></div>
    </div>

    <div className={`${featured ? 'md:w-2/5 mt-8 md:mt-0' : 'p-6'}`}>
      <div className="flex gap-2 mb-4 flex-wrap">
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-bg-slate text-neon-green text-[10px] font-bold uppercase tracking-wider rounded-full border border-neon-green/20">
            {tag}
          </span>
        ))}
      </div>
      <h3 className={`${featured ? 'text-3xl' : 'text-xl'} font-display font-bold mb-4 group-hover:text-neon-green transition-colors`}>{title}</h3>
      <p className="text-text-secondary mb-6 leading-relaxed">{description}</p>
      <a 
        href={link}
        className="inline-flex items-center gap-2 px-6 py-3 bg-bg-slate hover:bg-neon-green hover:text-bg-deep font-bold rounded-xl transition-all glow-neon hover:glow-neon-strong"
      >
        View Project <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-neon-green selection:text-bg-deep">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-bold uppercase tracking-widest mb-8">
              <Zap className="w-4 h-4" /> Available for projects
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-[0.9] tracking-tighter uppercase">
              Deepanshu <span className="text-neon-green italic">Bisht</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-lg mb-10 leading-relaxed">
              I'm a full-stack developer specializing in high-end AI integrations, modern SaaS architectures, and cyber-tech aesthetics.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="px-8 py-4 bg-neon-green text-bg-deep font-bold rounded-xl transition-all glow-neon hover:glow-neon-strong hover:-translate-y-1">
                Let's Talk
              </a>
              <a href="#projects" className="px-8 py-4 bg-bg-card border border-white/10 hover:border-neon-green/50 font-bold rounded-xl transition-all hover:-translate-y-1">
                View Work
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Apps', count: '24+', icon: Layers },
                { label: 'AI Models', count: '12+', icon: Cpu },
                { label: 'SEO Rank', count: 'Top 1%', icon: Search },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-4 rounded-xl bg-bg-card border border-white/5"
                >
                  <stat.icon className="text-neon-green w-5 h-5 mb-2" />
                  <div className="text-xl font-bold">{stat.count}</div>
                  <div className="text-[10px] text-text-muted uppercase tracking-widest font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
          >
            {/* Anime Character Placeholder - Stylized */}
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent z-10"></div>
              <div className="absolute -inset-4 bg-neon-green/20 rounded-full blur-3xl animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                alt="Developer Character"
                className="w-full h-full object-cover rounded-3xl border-2 border-neon-green/30 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 p-4 glass rounded-2xl z-20"
              >
                <Code2 className="text-neon-green w-8 h-8" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-12 -left-10 p-4 glass rounded-2xl z-20"
              >
                <Globe className="text-blue-400 w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-bg-slate/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="I combine technical precision with creative vision to build digital products that stand out.">
            Technical <span className="text-neon-green">Expertise</span>
          </SectionTitle>

          <div className="grid md:grid-cols-3 gap-8">
            <SkillCard 
              title="Frontend Development" 
              description="Crafting immersive user experiences using React, Next.js, and Tailwind CSS. Focused on performance and accessibility."
              icon={Globe}
              delay={0.1}
            />
            <SkillCard 
              title="Backend Systems" 
              description="Building scalable server-side architectures with Node.js, Express, and PostgreSQL. Expert in real-time data sync."
              icon={Terminal}
              delay={0.2}
            />
            <SkillCard 
              title="API & AI Integration" 
              description="Leveraging LLMs and custom API solutions to create intelligent applications that solve complex problems."
              icon={Cpu}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-40 bg-bg-card rounded-2xl border border-white/5 flex items-center justify-center">
                    <Github className="w-12 h-12 text-text-muted" />
                  </div>
                  <div className="h-60 bg-neon-green rounded-2xl flex flex-col items-center justify-center p-6 text-bg-deep">
                    <span className="text-4xl font-bold">5+</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Years Exp.</span>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-60 bg-bg-card rounded-2xl border border-neon-green/20 flex flex-col items-center justify-center p-6">
                    <span className="text-4xl font-bold text-neon-green">50+</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Projects</span>
                  </div>
                  <div className="h-40 bg-bg-slate rounded-2xl border border-white/5 flex items-center justify-center">
                    <Linkedin className="w-12 h-12 text-text-muted" />
                  </div>
                </div>
             </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              Let's create <span className="text-neon-green">something amazing</span> together.
            </h2>
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                I'm a developer who lives at the intersection of design and code. My passion lies in creating digital experiences that are not only functional but visually striking.
              </p>
              <p>
                With a deep understanding of modern web technologies and a keen eye for cyber-tech aesthetics, I help startups and established companies launch products that define the future.
              </p>
              <p>
                Whether it's a complex AI dashboard or a high-converting landing page, I bring technical expertise and creative confidence to every pixel.
              </p>
            </div>
            <div className="mt-10">
              <a href="#contact" className="inline-flex items-center gap-2 text-neon-green font-bold text-xl group">
                Ask more <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 bg-bg-slate/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="A selection of my most impactful work, combining cutting-edge tech with futuristic UI.">
            Featured <span className="text-neon-green">Projects</span>
          </SectionTitle>

          <div className="space-y-24">
            <ProjectCard 
              featured
              title="CyberDash AI"
              description="A real-time monitoring dashboard for AI infrastructure with predictive analytics and a high-density data visualization system."
              image="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070&auto=format&fit=crop"
              tags={['React', 'D3.js', 'OpenAI', 'Node.js']}
              link="#"
            />
            <ProjectCard 
              featured
              title="NeonFlow SaaS"
              description="A modern project management tool designed for creative agencies, featuring a unique spatial canvas and automated workflows."
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
              tags={['Next.js', 'Tailwind', 'Supabase', 'Motion']}
              link="#"
            />
            <ProjectCard 
              featured
              title="Krypton Wallet"
              description="A secure, multi-chain crypto wallet with a focus on user experience and real-time market insights."
              image="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2064&auto=format&fit=crop"
              tags={['TypeScript', 'Web3.js', 'Express', 'Redis']}
              link="#"
            />
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="More experiments and client work from my portfolio.">
            All <span className="text-neon-green">Projects</span>
          </SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Echo AI Chat', tags: ['NLP', 'React'], img: 'https://picsum.photos/seed/echo/800/600' },
              { title: 'Vortex Engine', tags: ['WebGL', 'JS'], img: 'https://picsum.photos/seed/vortex/800/600' },
              { title: 'Zenith SEO', tags: ['Analytics', 'API'], img: 'https://picsum.photos/seed/zenith/800/600' },
              { title: 'Pulse Health', tags: ['Mobile', 'IoT'], img: 'https://picsum.photos/seed/pulse/800/600' },
              { title: 'Nova Marketplace', tags: ['E-com', 'Stripe'], img: 'https://picsum.photos/seed/nova/800/600' },
              { title: 'Titan CRM', tags: ['B2B', 'SaaS'], img: 'https://picsum.photos/seed/titan/800/600' },
            ].map((p, i) => (
              <ProjectCard 
                key={p.title}
                title={p.title}
                description="Short project description showcasing the core functionality and tech stack."
                image={p.img}
                tags={p.tags}
                link="#"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-bg-slate/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div>
            <SectionTitle subtitle="Ready to start your next project? Drop me a message and let's discuss how I can help.">
              Get in <span className="text-neon-green">Touch</span>
            </SectionTitle>

            <div className="space-y-8 mt-12">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-bg-card border border-white/5 flex items-center justify-center group-hover:border-neon-green/50 transition-all">
                  <Mail className="text-neon-green w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Email Me</div>
                  <div className="text-xl font-bold">hello@koodaaja.com</div>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-bg-card border border-white/5 flex items-center justify-center group-hover:border-neon-green/50 transition-all">
                  <Github className="text-neon-green w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">GitHub</div>
                  <div className="text-xl font-bold">github.com/koodaaja</div>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-bg-card border border-white/5 flex items-center justify-center group-hover:border-neon-green/50 transition-all">
                  <Linkedin className="text-neon-green w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">LinkedIn</div>
                  <div className="text-xl font-bold">linkedin.com/in/koodaaja</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-bg-card border border-white/5 relative"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Name</label>
                  <input type="text" className="w-full bg-bg-slate border border-white/5 rounded-xl px-4 py-3 focus:border-neon-green outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Email</label>
                  <input type="email" className="w-full bg-bg-slate border border-white/5 rounded-xl px-4 py-3 focus:border-neon-green outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Message</label>
                <textarea rows={5} className="w-full bg-bg-slate border border-white/5 rounded-xl px-4 py-3 focus:border-neon-green outline-none transition-all resize-none" placeholder="Tell me about your project..."></textarea>
              </div>
              <button className="w-full py-4 bg-neon-green text-bg-deep font-bold rounded-xl transition-all glow-neon hover:glow-neon-strong hover:-translate-y-1">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-green rounded flex items-center justify-center">
              <Terminal className="text-bg-deep w-5 h-5" />
            </div>
            <span className="text-lg font-display font-bold tracking-tighter uppercase">
              Koodaaja<span className="text-neon-green">.com</span>
            </span>
          </div>

          <div className="text-text-muted text-sm">
            © {new Date().getFullYear()} Koodaaja. All rights reserved. Built with passion and neon.
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-neon-green transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="text-text-muted hover:text-neon-green transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-text-muted hover:text-neon-green transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
