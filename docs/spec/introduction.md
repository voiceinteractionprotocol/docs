---
id: introduction
title: Introduction
slug: /spec/introduction
---

# 1. Introduction

The Voice Interaction Protocol (VIP) defines a standard interface for integrating voice-driven user experiences into web and mobile applications. This specification establishes a unified framework for the lifecycle, state management, and message exchange required to conduct fluid, bi-directional voice conversations between a User Agent (client application) and a Voice Runtime (processing agent).

## 1.1 Problem Statement

Current voice interaction implementations rely heavily on proprietary software development kits (SDKs), platform-specific logic, and fragmented integration patterns. While Graphical User Interfaces (GUI) benefit from mature standards such as the Document Object Model (DOM) and accessibility trees (ARIA), there is no equivalent standardized layer for "Voice-First" interactions.

Consequently, applications generally lack a consistent mechanism to:
*   Expose application state and navigation structure to voice agents.
*   Define actionable intents (clicks, inputs, navigation) in a format consumable by Large Language Models (LLMs).
*   Manage interruption handling, latency masking, and turn-taking without bespoke implementation logic.
*   Decouple the application logic from the underlying speech processing provider.

## 1.2 Purpose of the Protocol

The primary purpose of VIP is to decouple the **Voice Interaction Layer** from the application logic and the specific AI model providers. By standardizing the communication flow, VIP allows applications to expose a "Voice Interaction Tree"—an auditory equivalent of the DOM—enabling any compliant voice agent to understand, navigate, and control the application.

Specifically, this standard defines:
*   **Protocol Lifecycle:** The sequence of connection establishment, authentication (Session Handshake), and termination.
*   **Interaction States:** A finite state machine defining the status of the interaction (e.g., `idle`, `listening`, `processing`, `speaking`, `action`).
*   **Context Propagation:** A schema for describing the current view, available actions, and conversation history.
*   **Architectural Modes:** Support for both **Internal Mode** (direct client-to-provider streaming for low latency) and **External Mode** (server-mediated orchestration).

## 1.3 Audience

This specification is intended for:
*   **User Agent Implementers:** Developers of browsers, operating systems, or runtimes that support native voice interaction.
*   **Framework Developers:** Creators of frontend libraries attempting to provide drop-in voice capabilities.
*   **Voice Service Providers:** Vendors of Speech-to-Text (STT), Text-to-Speech (TTS), and Large Language Model (LLM) services seeking compliance with standard client interfaces.
*   **Application Architects:** Engineers designing systems that require interoperability between visual interfaces and voice control systems.

## 1.4 High-Level Description

VIP operates as an application-layer protocol that manages the exchange of audio streams, control signals, and structured data events. It treats the voice interface not merely as a command-and-control input, but as a conversational partner with awareness of the application's context.

The protocol abstracts the complexity of the underlying model execution into a standardized workflow:
1.  **Session Initialization:** The client negotiates a session with the VIP Server, establishing authentication and operational parameters (environment, prompt context, and mode).
2.  **Context Synchronization:** The client transmits the current application state (Narrated State Description) and available intents (Action Registry) to the runtime.
3.  **Interaction Loop:**
    *   **Audio Input:** Use of Voice Activity Detection (VAD) or manual triggers to capture user intent.
    *   **Processing:** The runtime interprets the audio against the current context and available actions.
    *   **Action Invocation:** The runtime commands the client to execute specific functions (navigation, form filling) or updates the client with synthesized speech responses.
4.  **Feedback Mechanisms:** Real-time state updates allow the client to render visual indicators (e.g., volume waves, listening indicators) synchronization with the agent's status.

## 1.5 Context

Existing interaction standards are predominantly designed for visual and tactile input, with voice often treated as a secondary accessibility feature or a unidirectional command line. With the advent of real-time, multimodal AI models, the distinction between "using an app" and "conversing with an app" is diminishing.

VIP is necessary to provide the "glue code" between deterministic application logic (routes, buttons, forms) and probabilistic AI behaviors. It ensures that voice agents operate within safe, defined boundaries by strictly adhering to the capabilities exposed by the application's Action Registry, thereby preventing hallucinated actions or unauthorized state changes.