---
id: scope-and-goals
title: Scope and Goals
slug: /spec/scope-and-goals
---

# 2. Scope and Goals

This section delimits the boundaries of the Voice Interaction Protocol (VIP) and establishes the technical objectives that drive its design.

## 2.1 Scope

The Voice Interaction Protocol defines the semantic layer and control mechanisms required to facilitate stateful, context-aware voice conversations between a client application (User Agent) and a Voice Runtime.

### 2.1.1 Mandatory Components
This specification standardizes the following components:
*   **Session Lifecycle:** The precise message flow for connection establishment, authentication (handshake), session token generation, and termination.
*   **Context Schema:** The structure for representing the **Voice Interaction Tree** (the auditory equivalent of the DOM), including the "Narrated State Description," "Action Registry," and "Visibility Registry."
*   **Control Signals:** The command set for flow control, including start/stop triggers, interruption handling, and muting.
*   **State Machine:** A normative definition of interaction states (`idle`, `listening`, `processing`, `speaking`, `action`) and the valid transitions between them.
*   **Operational Modes:**
    *   **Internal Mode:** A configuration where the VIP Server brokers authentication (via ephemeral tokens) but offloads the real-time audio streaming directly to a third-party Model Provider to minimize latency.
    *   **External Mode:** A configuration where the VIP Server acts as a full proxy, orchestrating Speech-to-Text (STT), Large Language Model (LLM), and Text-to-Speech (TTS) flows independent of the client.

### 2.1.2 Applicability
VIP is designed for:
*   **Web Applications:** Browsers utilizing Web Audio API or WebRTC.
*   **Mobile Applications:** Native implementations (iOS/Android) requiring standardized voice interfaces.
*   **Headless/IoT Devices:** Systems where voice is the primary or sole interaction method.

### 2.1.3 Non-Goals and Out of Scope
The following are explicitly **out of scope** for this specification:
*   **Underlying Transport Standards:** VIP does not redefine WebSocket or WebRTC standards; it utilizes them as transport layers.
*   **Audio Codec Specifications:** VIP does not mandate specific audio encodings (e.g., OPUS, PCM). Implementations defer to the capabilities of the underlying transport and provider.
*   **Visual Rendering:** How the application visually represents the "listening" or "speaking" state is implementation-specific, though the *signal* to trigger these visuals is within scope.
*   **Model Intelligence:** The internal logic, weights, or reasoning capabilities of the LLM are outside the protocol’s control. VIP strictly manages the *interface* to these models.

## 2.2 Goals

The primary objective of VIP is to elevate voice interaction from a proprietary feature to a standardized architectural layer.

### 2.2.1 Decoupling and Agnosticism
VIP aims to fully decouple the **Application Layer** from the **Intelligence Layer**.
*   **Provider Agnosticism:** Applications implementing VIP must be able to switch underlying providers (e.g., swapping OpenAI for a local on-device model) without altering frontend business logic.
*   **Platform Agnosticism:** The protocol must function identically across web, mobile, and desktop environments.

### 2.2.2 Deterministic Execution and Safety
Voice agents traditionally suffer from "hallucination," where the model attempts actions the application does not support. VIP enforces safety through:
*   **Bounded Action Spaces:** The AI Agent is restricted to invoking only those intents explicitly exposed in the current **Action Registry**.
*   **State Integrity:** The protocol ensures the agent is aware of the application's current route and view, preventing it from interacting with stale or invisible elements.

### 2.2.3 Latency and Real-Time Performance
A critical goal of VIP is to support "human-speed" conversation.
*   **Internal Mode Optimization:** The specification explicitly supports architectures that reduce network hops (direct client-to-provider streaming) while maintaining a standardized control plane.
*   **Interruption Handling:** The protocol enforces mechanisms for handling full-duplex communication, ensuring users can interrupt the agent ("barge-in") with immediate state reconciliation.

### 2.2.4 Standardization of "Voice Context"
VIP seeks to standardize how visual interfaces are translated into auditory context. Just as HTML defines the visual structure, VIP defines the **Voice Interaction Tree**, ensuring that any compliant agent can programmatically understand "what is on the screen" and "what can be done" without requiring custom integration logic for every application.