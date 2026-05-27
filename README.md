<div align="center">
  <img src="static/img/logo.svg" alt="Voice Interaction Protocol" width="96" height="96" style="border-radius: 16px;" />
  <h1>Voice Interaction Protocol</h1>
  <p><strong>An open standard for voice-first applications.</strong><br/>
  Device-agnostic &nbsp;·&nbsp; Model-agnostic &nbsp;·&nbsp; Platform-agnostic</p>

  <p>
    <a href="https://voiceinteractionprotocol.io/docs/spec/introduction">
      <img src="https://img.shields.io/badge/Specification-v0.1--draft-yellow?style=flat-square" alt="Specification v0.1 Draft" />
    </a>
    <a href="https://voiceinteractionprotocol.io">
      <img src="https://img.shields.io/badge/Website-voiceinteractionprotocol.io-6366f1?style=flat-square" alt="Website" />
    </a>
    <a href="https://github.com/voiceinteractionprotocol/docs/issues">
      <img src="https://img.shields.io/badge/Feedback-Open%20an%20Issue-slate?style=flat-square" alt="Feedback" />
    </a>
  </p>
</div>

---

## What is VIP?

The Voice Interaction Protocol (VIP) is an **open specification** that defines a standard interface for integrating voice-driven experiences into any application — the same way the DOM standardizes visual interfaces.

Today, every voice integration is proprietary: tightly coupled to a specific AI model, platform SDK, or device type. VIP breaks that coupling. An application implementing VIP can work with any STT/LLM/TTS provider, run on any device with a microphone and speaker, and be fully controlled by voice — without the application itself knowing or caring which AI is running underneath.

The screen becomes secondary. The voice becomes primary. Any device — browser, mobile app, IoT sensor, or a basic button phone — can be a VIP client.

---

## Core Design Principles

| Principle | What It Means |
|---|---|
| **Model-Agnostic** | Swap OpenAI, Gemini, or a local on-device model with no changes to application logic |
| **Platform-Agnostic** | Identical protocol behaviour across web, iOS, Android, desktop, and embedded |
| **Device-Agnostic** | Any device with a mic, speaker, and network connection is a valid VIP client |
| **Safety-First** | The AI can only invoke actions explicitly declared in the app's Action Registry — no hallucinated actions |
| **Latency-Conscious** | Internal Mode allows direct client-to-provider streaming to minimize round-trip time |

---

## Key Concepts

**Voice Interaction Tree** — The auditory equivalent of the DOM. A structured representation of the application's current state — what's on screen, what can be done — transmitted to the AI before each interaction.

**Action Registry** — A JSON schema that declares every capability the AI is allowed to invoke: navigation routes, buttons, form inputs, custom functions. The AI cannot execute anything outside this registry.

**Interaction State Machine** — A strict Finite State Machine that both the client and server must maintain in sync. States: `not_connected → connecting → idle → listening → processing → speaking / action`.

**Two Modes**
- **Internal Mode**: VIP Server handles auth and issues ephemeral tokens; client streams audio directly to the model provider (low latency, recommended for production).
- **External Mode**: VIP Server acts as a full proxy and orchestrator; enables server-side model chaining without client changes.

---

## Specification Status

This repository contains the specification source, published at [voiceinteractionprotocol.io](https://voiceinteractionprotocol.io).

| Section | Status |
|---|---|
| §1 Introduction | ✅ Draft |
| §2 Scope & Goals | ✅ Draft |
| §3 Terminology & Definitions | ✅ Draft |
| §4 Protocol Overview | ✅ Draft |
| §5 Core Interaction Model | ✅ Draft |
| §6 Standard Interaction Primitives | ✅ Draft |
| §7 State & Flow Management | ✅ Draft |
| §8 Message Format (JSON Schemas) | 🔲 Planned |
| §9 Transport Layer Spec | 🔲 Planned |
| §10 Authentication Flow | 🔲 Planned |
| Concept Guides | 🔲 Planned |
| Implementation Guides (Web, Mobile, IoT) | 🔲 Planned |

---

## Reading the Spec

The full specification is published at **[voiceinteractionprotocol.io/docs/spec/introduction](https://voiceinteractionprotocol.io/docs/spec/introduction)**.

To read it locally:

```bash
# Clone the repository
git clone https://github.com/voiceinteractionprotocol/docs.git
cd docs

# Install dependencies
npm install

# Start local dev server
npm start
```

The site will be available at `http://localhost:3000`.

---

## Contributing

VIP is an open effort. Contributions, feedback, and discussion are welcome.

- **Issues** — [Report a problem or suggest a change](https://github.com/voiceinteractionprotocol/docs/issues)
- **Discussions** — [Ask questions or propose new sections](https://github.com/voiceinteractionprotocol/docs/discussions)
- **Pull Requests** — Spec edits, typo fixes, new sections

All specification files are in `docs/spec/`. The site is built with [Docusaurus](https://docusaurus.io).

---

## Roadmap

The current v0.1 draft establishes the core interaction model. The next phases will:

1. **v0.2** — Message format specification (exact JSON schemas for every protocol message)
2. **v0.3** — Transport layer details (WebSocket event names, WebRTC channel setup, heartbeat rules)
3. **v0.4** — Authentication flow spec (token exchange, ephemeral credential format)
4. **Concepts** — Developer-facing explainers for the Voice Interaction Tree, Action Registry patterns
5. **Guides** — Implementation walkthroughs for web, React Native, and IoT clients

---

## License

This specification is published under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

---

<div align="center">
  <sub>Built with intention. Voice is the most natural interface humans have.</sub>
</div>
