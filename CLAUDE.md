# Voice Interaction Protocol (VIP) — Project Context

## What This Is

VIP is an **open protocol specification** — not a product, not a library. The goal is to do for voice-first interaction what the DOM and ARIA did for visual interfaces: create a shared standard so that any application can expose itself to any voice agent without bespoke integration work.

The driving insight: with real-time multimodal AI, the line between "using an app" and "conversing with an app" is dissolving. VIP provides the glue between deterministic application logic (routes, buttons, forms) and probabilistic AI behavior.

**Device-agnostic by design.** Anything with a mic, speaker, and network connection can be a VIP client — a browser, a native mobile app, an IoT device, even a feature phone. The app logic lives on the server; the device just needs to speak and listen.

## Core Philosophy

- **Platform-agnostic** — works identically on web, mobile, desktop, headless/IoT
- **Model-agnostic** — swap OpenAI for a local on-device model without changing frontend logic
- **Language-agnostic** — the protocol defines interfaces, not implementations
- **Provider-agnostic** — STT, LLM, TTS services are all swappable
- **Safety-first** — the AI can only invoke actions the app explicitly declares; no hallucinated actions

## Architecture Overview

Four entities, three planes:

| Entity | Role |
|---|---|
| **User Agent (Client)** | Browser/app/device — captures audio, renders output, executes actions |
| **VIP Server** | Orchestrator/gateway — session auth, config, policy enforcement |
| **Model Provider** | Intelligence — STT, LLM, TTS (e.g., OpenAI, local model) |
| **Application Backend** | Identity Provider — validates user, authorizes VIP sessions |

**Control Plane**: User Agent ↔ VIP Server (session negotiation)  
**Data Plane**: Audio streaming (direct or proxied, depending on mode)  
**Context Plane**: User Agent → Runtime (Voice Interaction Tree sync)

### Two Operational Modes

**Internal Mode** — VIP Server handles auth only, then issues ephemeral token; User Agent streams audio directly to Model Provider. Lower latency, recommended for production.

**External Mode** — VIP Server is full proxy/orchestrator; User Agent streams everything through it. More flexible, enables server-side multi-model chaining without client changes.

## The Central Concept: Voice Interaction Tree

The auditory equivalent of the DOM. Three components:

- **Narrated State Description** — text description of the current view, used as LLM system prompt context
- **Action Registry** — JSON schema of every executable capability (navigation, buttons, form inputs, custom actions) in the current context
- **Visibility Registry** — subset of the Action Registry: only what's currently visible/reachable

The User Agent **must** transmit an updated Voice Interaction Tree on session start and whenever the UI changes significantly (route change, modal opens, etc.).

## State Machine

States are mutually exclusive. Both client and server must stay synchronized.

```
NotConnected → Connecting → Idle → Listening → Processing → Speaking → Idle
                                                          ↘ Action → Processing/Idle
```

| State | Identifier | Meaning |
|---|---|---|
| Not Connected | `not_connected` | No active session |
| Connecting | `connecting` | Handshake in progress |
| Idle | `idle` | Ready, waiting for trigger |
| Listening | `user_speaking` | Capturing user audio |
| Processing | `ai_thinking` | STT + LLM inference running |
| Speaking | `ai_speaking` | TTS audio streaming to client |
| Action | `invoke_action` | Client executing a command, waiting for result |

Key rules:
- Barge-in (interruption) is **mandatory** support — transitions Speaking/Processing → Listening immediately
- State transitions not in the defined matrix are **invalid** and must produce a protocol error
- Context updates are forbidden during Listening and Processing states

## Interaction Primitives

The atomic units the Voice Runtime can invoke on the client (all via `invoke_action`):

| Primitive | Registry Type | What It Does |
|---|---|---|
| System Output (Reply) | — | TTS audio stream to user |
| Input Capture (Listen) | — | Captures user speech/text |
| Navigation | `navigation` | Route/page/view change |
| Trigger (Button) | `button` | Stateless click/tap |
| Input Submission | `input` | Fill a form field (text/number/boolean/checkbox/radio/password) |
| Confirmation | `confirmation` | Gate for sensitive/destructive actions |

Safety constraints:
- Runtime **MUST NOT** invoke actions not in the current Action Registry
- Actions not in the Visibility Registry **MUST NOT** be invocable (unless flagged `global`)
- Input types must match schema — client validates before execution

## Current State of the Docs Site

Built with **Docusaurus**, targeting `voiceinteractionprotocol.io`.

**Spec section** (`docs/spec/`) — the real work, all substantive:
- `introduction.md` — problem statement, purpose, audience
- `scope-and-goals.md` — boundaries, what's in/out of scope
- `protocol-overview.md` — architecture, modes, lifecycle summary
- `terminology-and-definitions.md` — normative glossary
- `core-intercation-model.md` — FSM, turn-taking, action invocation flow (note: typo in filename "intercation")
- `standard-interaction-primitives.md` — all primitive definitions
- `state-and-flow-management.md` — full state/transition matrix, sequence diagrams, error recovery

**Stub sections** (empty, future work):
- `docs/_concept/` — concept guides (stub, not linked in nav)
- `docs/_guide/` — implementation guides (stub, not linked in nav)

**Leftover Docusaurus boilerplate** (should be cleaned up eventually):
- `docs/intro.md` — still the Docusaurus tutorial intro
- `docs/tutorial-basics/` and `docs/tutorial-extras/` — default sample content

## What's Missing / What Comes Next

Based on what exists, the natural next areas:

1. **Message Format Spec** — actual JSON schemas for each message type (session handshake payload, action registry schema, invoke_action structure, action.result structure, error codes)
2. **Transport Layer Spec** — WebSocket event names, WebRTC channel config, heartbeat/keepalive rules
3. **Authentication Flow Spec** — the token exchange details, ephemeral token format/TTL
4. **Concept Docs** — developer-facing explainers for the Voice Interaction Tree, Action Registry patterns, how to add VIP to an existing app
5. **Guide Docs** — implementation walkthroughs (web, mobile, IoT)
6. **Homepage** — still shows Docusaurus default content/features; needs real VIP content

## Dev Commands

```bash
yarn start      # local dev server at localhost:3000
yarn build      # static build to /build
yarn deploy     # deploy to GitHub Pages
```

Mermaid diagrams are enabled (`@docusaurus/theme-mermaid`). State machine and sequence diagrams are already used in the spec.

## Repo

GitHub org: `voiceinteractionprotocol`, repo: `docs`  
Edit URL base: `https://github.com/voiceinteractionprotocol/docs/tree/main/`
