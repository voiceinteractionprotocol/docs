import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function IconSwap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h16M4 8l3-3M4 8l3 3M20 16H4M20 16l-3-3M20 16l-3 3" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function IconSignal() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroRings} aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot} />
          v0.1 Draft Specification
        </div>

        <img
          src="/img/logo.svg"
          alt="Voice Interaction Protocol"
          className={styles.heroLogo}
        />

        <Heading as="h1" className={styles.heroTitle}>
          Voice Interaction<br />
          <em>Protocol</em>
        </Heading>

        <p className={styles.heroSubtitle}>
          An open standard for voice-first applications.
          Like the DOM for visual interfaces, VIP gives every app
          a standard voice layer that works across any device, model, or platform.
        </p>

        <div className={styles.heroButtons}>
          <Link className={clsx('button button--lg', styles.btnPrimary)} to="/docs/spec/introduction">
            Read the Specification
          </Link>
          <Link className={clsx('button button--lg', styles.btnOutline)} href="https://github.com/voiceinteractionprotocol/docs">
            View on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}

function PremiseSection() {
  return (
    <section className={clsx(styles.section, styles.sectionLight)}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>The Problem</span>
          <Heading as="h2" className={styles.sectionTitle}>
            There is no standard for voice
          </Heading>
          <p className={styles.sectionSubtitle}>
            Visual interfaces have the DOM and ARIA. Voice has nothing.
            Every implementation today is proprietary, brittle, and model-locked.
          </p>
        </div>

        <div className={styles.premiseCols}>
          <div className={clsx(styles.premiseCard, styles.premiseCardProblem)}>
            <h3>Without VIP</h3>
            <ul>
              <li>Apps are tightly coupled to a specific AI provider</li>
              <li>Swapping models breaks the entire voice layer</li>
              <li>AI can invoke actions the application never intended</li>
              <li>Turn-taking, barge-in, and latency require bespoke logic</li>
              <li>No shared vocabulary between the app and the voice agent</li>
              <li>IoT and constrained devices are left out entirely</li>
            </ul>
          </div>
          <div className={clsx(styles.premiseCard, styles.premiseCardSolution)}>
            <h3>With VIP</h3>
            <ul>
              <li>Swap any model or provider with no frontend changes</li>
              <li>Works on browsers, mobile apps, IoT, and feature phones</li>
              <li>AI is bounded to actions the app explicitly declared</li>
              <li>Turn-taking, barge-in, and states are standardized</li>
              <li>The Voice Interaction Tree gives agents full app context</li>
              <li>One protocol for any device with a mic and a speaker</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  const principles = [
    {
      icon: <IconSwap />,
      title: 'Model-Agnostic',
      desc: 'Swap OpenAI, Gemini, or a local on-device model with zero changes to application logic.',
    },
    {
      icon: <IconLayers />,
      title: 'Platform-Agnostic',
      desc: 'Identical protocol behaviour on web, iOS, Android, desktop, and embedded devices.',
    },
    {
      icon: <IconSignal />,
      title: 'Device-Agnostic',
      desc: 'Any device with a mic, speaker, and network connection is a valid VIP client.',
    },
    {
      icon: <IconShield />,
      title: 'Safety-First',
      desc: 'The AI can only invoke actions declared in the Action Registry. No hallucinated actions.',
    },
  ];

  return (
    <section className={clsx(styles.section, styles.sectionDark)}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Design Principles</span>
          <Heading as="h2" className={styles.sectionTitle}>
            Built to evolve
          </Heading>
          <p className={styles.sectionSubtitle}>
            VIP is designed to outlast any specific model or platform.
            As AI capabilities improve, the protocol adapts. Applications do not.
          </p>
        </div>

        <div className={styles.principlesGrid}>
          {principles.map((p) => (
            <div key={p.title} className={styles.principleCard}>
              <div className={styles.principleIconWrap}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      n: '01',
      title: 'Initialize Session',
      desc: 'Client authenticates via the VIP Server. The Voice Interaction Tree — current view and available actions — is transmitted to the runtime.',
    },
    {
      n: '02',
      title: 'User Speaks',
      desc: 'VAD or Push-to-Talk activates Listening state. Audio streams to the model provider, directly or via the VIP Server.',
    },
    {
      n: '03',
      title: 'Model Reasons',
      desc: 'The model transcribes and infers intent against the Action Registry. It selects: reply with speech, or invoke an action.',
    },
    {
      n: '04',
      title: 'App Responds',
      desc: 'The client executes the action or plays synthesized audio, returns a result to the runtime, then transitions back to Idle.',
    },
  ];

  return (
    <section className={clsx(styles.section, styles.sectionLight)}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>How It Works</span>
          <Heading as="h2" className={styles.sectionTitle}>
            The interaction loop
          </Heading>
          <p className={styles.sectionSubtitle}>
            A strict Finite State Machine keeps the client and runtime synchronized
            through every turn. Both sides must agree on state at all times.
          </p>
        </div>

        <div className={styles.stepsRow}>
          {steps.map((s, i) => (
            <>
              <div key={s.n} className={styles.step}>
                <div className={styles.stepNumber}>{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div key={`arrow-${i}`} className={styles.stepArrow}>
                  <IconArrow />
                </div>
              )}
            </>
          ))}
        </div>

        <div className={styles.stateMachine}>
          <div className={styles.stateNode}>
            <div className={clsx(styles.stateCircle, styles.stateIdle)}>Idle</div>
            <span className={styles.stateLabel}>Waiting</span>
          </div>
          <span className={styles.stateArrow}><IconArrow /></span>
          <div className={styles.stateNode}>
            <div className={clsx(styles.stateCircle, styles.stateListen)}>Listen&shy;ing</div>
            <span className={styles.stateLabel}>Input</span>
          </div>
          <span className={styles.stateArrow}><IconArrow /></span>
          <div className={styles.stateNode}>
            <div className={clsx(styles.stateCircle, styles.stateProcess)}>Process&shy;ing</div>
            <span className={styles.stateLabel}>Thinking</span>
          </div>
          <span className={styles.stateArrow}><IconArrow /></span>
          <div className={styles.stateNode}>
            <div className={clsx(styles.stateCircle, styles.stateSpeak)}>Speak&shy;ing</div>
            <span className={styles.stateLabel}>Output</span>
          </div>
          <span className={styles.stateOr}>or</span>
          <div className={styles.stateNode}>
            <div className={clsx(styles.stateCircle, styles.stateAction)}>Action</div>
            <span className={styles.stateLabel}>Execute</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className={clsx(styles.section, styles.sectionMid)}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Architecture</span>
          <Heading as="h2" className={styles.sectionTitle}>
            Two modes, one protocol
          </Heading>
          <p className={styles.sectionSubtitle}>
            VIP separates the control plane from the media plane, giving
            implementations flexibility to optimize for latency or orchestration.
          </p>
        </div>

        <div className={styles.modesGrid}>
          <div className={styles.modeCard}>
            <h3>
              Internal Mode
              <span className={clsx(styles.modeBadge, styles.modeBadgeRecommended)}>Recommended</span>
            </h3>
            <p>
              The VIP Server handles authentication and issues a short-lived ephemeral token.
              The client then streams audio directly to the model provider,
              minimizing latency. Ideal for production applications.
            </p>
          </div>
          <div className={styles.modeCard}>
            <h3>
              External Mode
              <span className={clsx(styles.modeBadge, styles.modeBadgeFlexible)}>Flexible</span>
            </h3>
            <p>
              The VIP Server acts as a full proxy and orchestrator. The client streams
              everything through it, enabling server-side model chaining
              and provider swaps with zero client changes.
            </p>
          </div>
        </div>

        <div className={styles.componentsRow}>
          {[
            { title: 'User Agent',     desc: 'Browser, mobile app, or IoT device' },
            { title: 'VIP Server',     desc: 'Session gateway and policy enforcer' },
            { title: 'Model Provider', desc: 'STT, LLM, TTS (any vendor)' },
            { title: 'App Backend',    desc: 'Identity provider for session auth' },
          ].map((c) => (
            <div key={c.title} className={styles.componentCard}>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecStatusSection() {
  const sections = [
    { num: '§1',  title: 'Introduction',              desc: 'Problem statement, purpose, and audience',          status: 'draft'   },
    { num: '§2',  title: 'Scope and Goals',           desc: 'Boundaries, non-goals, design objectives',          status: 'draft'   },
    { num: '§3',  title: 'Terminology',               desc: 'Normative glossary of all protocol terms',          status: 'draft'   },
    { num: '§4',  title: 'Protocol Overview',         desc: 'Architecture, modes, and component roles',          status: 'draft'   },
    { num: '§5',  title: 'Core Interaction Model',    desc: 'FSM, turn-taking, and action invocation',           status: 'draft'   },
    { num: '§6',  title: 'Interaction Primitives',    desc: 'Navigation, button, input, confirmation',           status: 'draft'   },
    { num: '§7',  title: 'State and Flow Management', desc: 'Full transition matrix and interruption rules',     status: 'draft'   },
    { num: '§8',  title: 'Message Format',            desc: 'JSON schemas, event payloads, error codes',         status: 'planned' },
    { num: '§9',  title: 'Transport Layer',           desc: 'WebSocket events and WebRTC channel setup',         status: 'planned' },
    { num: '§10', title: 'Authentication Flow',       desc: 'Token exchange and ephemeral credential lifecycle', status: 'planned' },
  ];

  return (
    <section className={clsx(styles.section, styles.sectionDark)}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Specification Status</span>
          <Heading as="h2" className={styles.sectionTitle}>
            What is in v0.1 Draft
          </Heading>
          <p className={styles.sectionSubtitle}>
            Seven sections establish the full interaction model.
            Message format and transport specs are next.
          </p>
        </div>

        <div className={styles.specGrid}>
          {sections.map((s) => (
            <div key={s.num} className={styles.specCard}>
              <span className={styles.specNum}>{s.num}</span>
              <span className={styles.specCardTitle}>{s.title}</span>
              <span className={clsx(styles.statusBadge, s.status === 'draft' ? styles.statusDraft : styles.statusPlanned)}>
                {s.status === 'draft' ? 'Draft' : 'Planned'}
              </span>
              <p className={styles.specCardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaGlow} aria-hidden="true" />
      <div style={{position: 'relative', zIndex: 1}}>
        <Heading as="h2">Start with the specification</Heading>
        <p>
          VIP is an open effort. Read the draft, share your feedback,
          and help shape the standard for voice-native applications.
        </p>
        <div className={styles.ctaButtons}>
          <Link className={clsx('button button--lg', styles.btnPrimary)} to="/docs/spec/introduction">
            Read the Spec
          </Link>
          <Link className={clsx('button button--lg', styles.btnOutline)} href="https://github.com/voiceinteractionprotocol/docs">
            Contribute on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Voice Interaction Protocol — Open standard for voice-first apps"
      description="VIP is an open standard for integrating voice-first experiences into any application. Device-agnostic, model-agnostic, and platform-agnostic.">
      <Hero />
      <PremiseSection />
      <PrinciplesSection />
      <HowItWorksSection />
      <ArchitectureSection />
      <SpecStatusSection />
      <CtaSection />
    </Layout>
  );
}
