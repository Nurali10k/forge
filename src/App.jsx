import { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3,
  Dumbbell, Instagram, Menu, MoveUpRight, Star, X,
} from 'lucide-react'
import './App.css'

const photo = (id, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

const programs = [
  { number: '01', title: 'STRENGTH', label: 'CrossFit & weight training', text: 'Build power with expert coaching, purposeful programming, and a crew that keeps you showing up.', image: 'photo-1534438327276-14e5300c3a48', className: 'program-tall', icon: '01' },
  { number: '02', title: 'BOXING', label: 'Technique & conditioning', text: 'Sharpen your focus. Find your rhythm. Leave every ounce of stress on the floor.', image: 'photo-1549719386-74dfcbf7dbed', className: 'program-wide', icon: '02' },
  { number: '03', title: 'HIIT', label: 'High intensity intervals', text: 'Fast, focused sessions that challenge your limits and make every minute count.', image: 'photo-1517836357463-d25dfeac3438', className: 'program-wide', icon: '03' },
  { number: '04', title: 'RECOVERY', label: 'Mobility & movement', text: 'Train hard, recover smarter. Rebuild range, balance, and the energy to come back stronger.', image: 'photo-1518611012118-696072aa579a', className: 'program-tall', icon: '04' },
]

const coaches = [
  { name: 'MARCUS REED', specialty: 'STRENGTH & CONDITIONING', image: 'photo-1567013127542-490d757e51fc', number: '01' },
  { name: 'ALINA BROOKS', specialty: 'BOXING & HIIT', image: 'photo-1534528741775-53994a69daeb', number: '02' },
  { name: 'JAMIE PARK', specialty: 'MOBILITY & PERFORMANCE', image: 'photo-1500648767791-00dcc994a43e', number: '03' },
]

const plans = [
  { name: 'BASIC', price: '39', period: '/ month', description: 'Your training starts here.', perks: ['Open gym access', '2 group classes / week', 'Fitness assessment'], className: '' },
  { name: 'PRO', price: '69', period: '/ month', description: 'For the ones all in.', perks: ['Unlimited gym access', 'Unlimited group classes', 'Monthly coach check-in', 'Recovery suite access'], className: 'plan-featured' },
  { name: 'ELITE', price: '119', period: '/ month', description: 'Your goals. Your own coach.', perks: ['Everything in Pro', '4 personal training sessions', 'Priority class booking', 'Nutrition coaching'], className: '' },
]

const stories = [
  { quote: 'I came in wanting to get stronger. I found a community that makes me want to show up for myself every single day.', name: 'TAYLOR M.', detail: 'MEMBER SINCE 2022', initials: 'TM' },
  { quote: 'The coaches actually know your name, your goals, and when you need a push. That changes everything.', name: 'JORDAN K.', detail: 'MEMBER SINCE 2021', initials: 'JK' },
  { quote: 'It’s not just a gym. It’s the hour of my day that belongs to me. I leave better than I came in, every time.', name: 'SAM R.', detail: 'MEMBER SINCE 2023', initials: 'SR' },
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [storyIndex, setStoryIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const items = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -32px 0px' })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const changeStory = (direction) => setStoryIndex((index) => (index + direction + stories.length) % stories.length)
  const submitTrial = (event) => {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return <div className="fitness-site">
    <a href="#main" className="skip-link">Skip to content</a>
    <header className={`fit-header ${scrolled || menuOpen ? 'fit-header-solid' : ''}`}>
      <a href="#home" className="fit-logo" aria-label="Forge Athletics home"><span>FORGE<span className="logo-dot">.</span></span><small>ATHLETICS CLUB</small></a>
      <nav className="fit-nav" aria-label="Main navigation"><a href="#programs">Training</a><a href="#coaches">Coaches</a><a href="#membership">Membership</a><a href="#stories">Our people</a></nav>
      <a href="#trial" className="join-button">JOIN THE CLUB <ArrowUpRight size={15} /></a>
      <button className="fit-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    </header>
    {menuOpen && <nav className="fit-mobile-nav" aria-label="Mobile navigation"><a href="#programs" onClick={() => setMenuOpen(false)}>Training <ArrowUpRight size={16} /></a><a href="#coaches" onClick={() => setMenuOpen(false)}>Coaches <ArrowUpRight size={16} /></a><a href="#membership" onClick={() => setMenuOpen(false)}>Membership <ArrowUpRight size={16} /></a><a href="#stories" onClick={() => setMenuOpen(false)}>Our people <ArrowUpRight size={16} /></a><a className="mobile-join" href="#trial" onClick={() => setMenuOpen(false)}>Start your free trial <ArrowRight size={16} /></a></nav>}

    <main id="main">
      <section id="home" className="fit-hero">
        <img className="fit-hero-image" src={photo('photo-1534438327276-14e5300c3a48', 2400)} alt="Athletes training in a dramatic, light-filled strength gym" fetchPriority="high" />
        <div className="fit-hero-overlay" />
        <div className="hero-kicker"><span className="live-dot" /> BUILT FOR THE WORK · EST. 2012</div>
        <div className="hero-copy-block"><p className="hero-pretitle">NO SHORTCUTS. NO SPECTATORS.</p><h1>UNLEASH<br />YOUR <span>POTENTIAL.</span></h1><p className="hero-subtitle">Train hard. <em>Live strong.</em></p><a href="#trial" className="primary-cta">START YOUR FREE TRIAL <ArrowRight size={17} /></a><p className="hero-availability"><span /> 3 DAY PASS · NO COMMITMENT</p></div>
        <a className="hero-scroll" href="#stats"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        <span className="hero-side-label">35°41'22.8"N · 139°41'30.2"E</span>
      </section>

      <section id="stats" className="stats-bar" aria-label="Forge club statistics"><div className="stats-intro"><Dumbbell size={18} /><span>BUILT BY SHOWING UP</span></div><div className="fit-stat"><strong>2.4<span>K</span></strong><small>ACTIVE MEMBERS</small></div><div className="fit-stat"><strong>18</strong><small>EXPERT COACHES</small></div><div className="fit-stat"><strong>64</strong><small>CLASSES / WEEK</small></div><div className="fit-stat"><strong>12<span>+</span></strong><small>YEARS STRONG</small></div></section>

      <section id="programs" className="programs-section">
        <div className="section-head reveal"><div><p className="section-eyebrow"><span /> FIND YOUR EDGE</p><h2>CHOOSE<br className="mobile-break" /> YOUR <em>PATH.</em></h2></div><p className="section-intro">Four ways to get after it. One place to find out what you’re made of.</p></div>
        <div className="program-grid">{programs.map((program, index) => <article className={`program-card ${program.className} reveal`} style={{ '--delay': `${index * 90}ms` }} key={program.number}>
          <a className="program-photo" href="#trial" aria-label={`${program.title}: book a free trial`}><img src={photo(program.image)} alt={`${program.label} workout session at Forge Athletics`} loading="lazy" /><span className="program-overlay" /><span className="program-index">{program.number} / 04</span><span className="program-arrow"><MoveUpRight size={19} /></span><span className="program-photo-caption">FORGE TRAINING SYSTEM</span></a>
          <div className="program-details"><div><p>{program.label}</p><h3>{program.title}</h3></div><a href="#trial" aria-label={`View ${program.title} schedule`} className="schedule-link">VIEW SCHEDULE <ArrowRight size={14} /></a></div>
          <p className="program-description">{program.text}</p>
        </article>)}</div>
        <div className="program-footer reveal"><span>01 — 04</span><p>GOOD FORM. GREAT ENERGY. YOUR KIND OF PEOPLE.</p><a href="#membership">SEE ALL MEMBERSHIPS <ArrowUpRight size={14} /></a></div>
      </section>

      <section id="coaches" className="coaches-section">
        <div className="coaches-heading reveal"><p className="section-eyebrow"><span /> PEOPLE WHO PUSH YOU</p><h2>MEET YOUR<br /><em>NEW FAVORITE COACH.</em></h2><p>Real experience. Zero ego. All in your corner.</p></div>
        <div className="coach-grid">{coaches.map((coach, index) => <article className={`coach-card reveal coach-${index + 1}`} key={coach.name} style={{ '--delay': `${index * 100}ms` }}><div className="coach-photo"><img src={photo(coach.image, 900)} alt={`Forge Athletics coach ${coach.name}`} loading="lazy" /><span className="coach-ring" /><span className="coach-number">{coach.number}</span></div><div className="coach-info"><div><h3>{coach.name}</h3><p>{coach.specialty}</p></div><a href="#trial" aria-label={`Meet coach ${coach.name}`}><ArrowUpRight size={17} /></a></div></article>)}</div>
        <div className="coach-note"><span className="note-line" /><p>“WE DON’T JUST COUNT REPS.<br />WE NOTICE WHEN YOU SHOW UP.”</p><span className="note-signature">— THE FORGE COACHING CREW</span></div>
      </section>

      <section id="membership" className="membership-section">
        <div className="membership-title reveal"><div><p className="section-eyebrow"><span /> INVEST IN YOURSELF</p><h2>YOUR WORK.<br /><em>YOUR CALL.</em></h2></div><p>All the support you need. None of the pressure. Start with a free three-day pass and find your pace.</p></div>
        <div className="pricing-grid">{plans.map((plan, index) => <article className={`price-card ${plan.className} reveal`} key={plan.name} style={{ '--delay': `${index * 100}ms` }}>
          {plan.className && <span className="popular-tag">MOST POPULAR</span>}<span className="plan-index">0{index + 1} / MEMBERSHIP</span><h3>{plan.name}</h3><p className="plan-description">{plan.description}</p><div className="price"><span className="dollar">$</span>{plan.price}<small>{plan.period}</small></div><p className="billing-note">BILLED MONTHLY · CANCEL ANYTIME</p><ul>{plan.perks.map((perk) => <li key={perk}><Check size={15} />{perk}</li>)}</ul><a href="#trial" className={plan.className ? 'plan-button plan-button-primary' : 'plan-button'}>CLAIM YOUR 3 DAY PASS <ArrowRight size={15} /></a>
        </article>)}</div>
        <p className="pricing-footnote"><Clock3 size={13} /> All memberships include a movement screen and first-session orientation.</p>
      </section>

      <section id="stories" className="stories-section">
        <div className="story-image"><img src={photo('photo-1517836357463-d25dfeac3438', 1300)} alt="Forge member finishing a focused strength training session" loading="lazy" /><span className="story-image-tag">MORE THAN A WORKOUT.</span></div>
        <div className="story-content"><p className="section-eyebrow"><span /> STRONGER TOGETHER</p><h2>THE BEST PART<br />IS <em>SHOWING UP.</em></h2><div className="star-row" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}<span>5.0 MEMBER RATING</span></div><div className="story-quote" aria-live="polite" aria-atomic="true"><span className="quote-glyph">“</span><blockquote>{stories[storyIndex].quote}</blockquote><div className="story-author"><span className="author-avatar">{stories[storyIndex].initials}</span><span><strong>{stories[storyIndex].name}</strong><small>{stories[storyIndex].detail}</small></span></div></div><div className="story-controls"><span>0{storyIndex + 1}<i />0{stories.length}</span><div><button type="button" onClick={() => changeStory(-1)} aria-label="Previous member story"><ArrowLeft size={17} /></button><button type="button" onClick={() => changeStory(1)} aria-label="Next member story"><ArrowRight size={17} /></button></div></div></div>
      </section>

      <footer id="trial" className="fit-footer">
        <div className="footer-glow" />
        <div className="footer-content"><div className="footer-heading reveal"><p className="section-eyebrow"><span /> YOUR NEXT REP STARTS HERE</p><h2>READY TO<br /><em>TRANSFORM?</em></h2><p>First session is on us. Bring what you’ve got. We’ll meet you there.</p><div className="footer-contact"><span>FIND YOUR FORGE</span><a href="mailto:hello@forgeclub.example">HELLO@FORGECLUB.EXAMPLE</a><a href="tel:+12125550128">+1 212 555 0128</a></div></div>
          <form className="trial-form reveal" onSubmit={submitTrial}><div className="form-topline"><span>BOOK YOUR 3 DAY PASS</span><span>01 — 03</span></div><label>YOUR NAME<input type="text" name="name" autoComplete="name" placeholder="First and last name" required /></label><label>EMAIL ADDRESS<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label><label>PHONE NUMBER<input type="tel" name="phone" autoComplete="tel" placeholder="(555) 000-0000" required /></label><div className="form-bottom"><button type="submit">{submitted ? 'YOU’RE ON THE LIST' : 'LET’S GET TO WORK'} {submitted ? <Check size={17} /> : <ArrowRight size={17} />}</button><p aria-live="polite">{submitted ? 'Thanks — our team will reach out shortly.' : 'No contracts. No pressure. Just a better first workout.'}</p></div></form></div>
        <div className="footer-bottom"><a href="#home" className="fit-logo footer-logo"><span>FORGE<span className="logo-dot">.</span></span><small>ATHLETICS CLUB</small></a><span className="copyright">© 2026 FORGE ATHLETICS CLUB</span><div className="footer-social"><a href="https://www.instagram.com/" aria-label="Forge on Instagram"><Instagram size={16} /></a><a href="#programs">TRAINING</a><a href="#membership">MEMBERSHIP</a></div><span className="footer-address">BROOKLYN, NEW YORK · OPEN DAILY</span></div>
      </footer>
    </main>
  </div>
}

export default App
