---
id: protocol-overview
title: Protocol Overview
slug: /spec/protocol-overview
---

# 3. Protocol Overview

The Voice Interaction Protocol (VIP) is an application-layer standard designed to manage the full lifecycle of a voice-driven user session. It functions as a control plane that synchronizes the state between a visual interface (the User Agent) and a conversational intelligence (the Voice Runtime).

## 3.1 Architecture and Components

VIP is built upon a distributed architecture comprising four distinct entities. The protocol defines the interfaces and message exchanges between these entities to ensure interoperability.

| Component | Role | Responsibilities |
| :--- | :--- | :--- |
| **User Agent (Client)** | Frontend Interface | Captures audio input, renders audio output, maintains the visual application state, and executes client-side actions (navigation, form inputs). |
| **VIP Server** | Orchestrator | Manages session authentication, configuration, and token issuance. Acts as the protocol gateway and policy enforcer. |
| **Model Provider** | Intelligence | Performs Automatic Speech Recognition (STT), Language Inference (LLM), and Speech Synthesis (TTS). |
| **Application Backend** | Identity Provider | The existing host application server. Responsible for validating user identity and authorizing the creation of VIP sessions. |

### 3.1.1 High-Level Communication Path

1.  **Control Plane:** The User Agent communicates with the VIP Server to negotiate session parameters and authentication.
2.  **Data Plane:** Depending on the configured **Mode**, audio streams are transmitted either directly to the Model Provider or proxied through the VIP Server.
3.  **Context Plane:** The User Agent synchronizes the *Voice Interaction Tree* (Context) with the Runtime to ensure the model is aware of the current application state.

## 3.2 Modes of Operation

VIP defines two distinct architectural modes to accommodate different latency requirements and privacy constraints.

### 3.2.1 Internal Mode (Direct-to-Provider)
In Internal Mode, the VIP Server is used strictly for session negotiation and ephemeral credential generation.
*   **Workflow:** The VIP Server validates the session and issues a time-bound ephemeral token for a specific Model Provider.
*   **Data Flow:** The User Agent establishes a direct WebSocket or WebRTC connection to the Model Provider using this token.
*   **Benefit:** Minimizes latency by removing the VIP Server from the real-time media path. This is the recommended mode for high-performance public applications.

### 3.2.2 External Mode (Server-Mediated)
In External Mode, the VIP Server acts as a full proxy and orchestrator.
*   **Workflow:** The User Agent maintains a persistent connection only with the VIP Server.
*   **Data Flow:** The VIP Server receives audio/text, routes it to independent STT, LLM, and TTS services, and returns the synthesized result to the User Agent.
*   **Benefit:** Allows for provider agnosticism and complex server-side orchestration (e.g., chaining multiple models) without client updates.

### 3.2.3 Operational Environments
*   **Development:** Authentication may be relaxed; the VIP Server may accept self-issued tokens or skip Identity Provider verification for rapid prototyping.
*   **Production:** Strict authentication is enforced. The User Agent must present a valid token signed by the Application Backend to initiate a session.

## 3.3 Lifecycle and State Management

The protocol enforces a strict Finite State Machine (FSM) to manage turn-taking and synchronization.

### 3.3.1 Session Lifecycle
1.  **Not Connected:** The User Agent is initialized but has no active session.
2.  **Connection Establishment:** The User Agent requests a session from the VIP Server (via HTTP/REST). Upon success, transport connections (WebSocket/WebRTC) are opened.
3.  **Active Session:** The system enters the main interaction loop.
4.  **Termination:** The session is closed via user command ("Hang up"), system timeout, or error.

### 3.3.2 Interaction States
The active session transitions between the following states:

*   **Idle:** System is ready. No audio is being captured or played.
*   **Listening:** Microphone is active. Input is being streamed to the provider (triggered by VAD or Push-to-Talk).
*   **Processing:** User input is complete. The system is analyzing intent.
*   **Speaking:** The system is streaming audio response to the user.
*   **Action:** The system is waiting for the User Agent to execute a client-side command (e.g., `navigate_to_page`, `submit_form`).

*Note: Interruption events (Barge-in) trigger an immediate transition from **Speaking** or **Processing** back to **Listening** or **Idle**, cancelling the current output stream.*

## 3.4 Core Protocol Flow

The core interaction loop consists of Context Propagation, Input Processing, and Action Invocation.

### 3.4.1 Context Propagation
Before initiating an interaction or upon any significant UI change, the User Agent must transmit the **Narrated State Description**. This includes:
*   **Current Route:** The active page or screen.
*   **Action Registry:** A list of available intents (buttons, inputs) and their metadata.
*   **Visibility:** Which elements are currently perceptible to the user.

### 3.4.2 Message Exchange Flow
1.  **Input:** User audio is streamed to the Runtime.
2.  **Transcription & Inference:** The Runtime converts speech to text and evaluates it against the provided *System Prompt* and *Action Registry*.
3.  **Response Generation:**
    *   If the user intent requires a verbal reply, audio is streamed back (State: Speaking).
    *   If the user intent requires a UI change, a **Function Call** event is sent to the User Agent (State: Action).
4.  **Execution:** The User Agent executes the function (e.g., clicks a button) and returns the result (Success/Failure/New Data) to the Runtime.
5.  **Conclusion:** The Runtime acknowledges the execution and returns to *Idle* or generates a follow-up response.

## 3.5 Capabilities and Responsibilities

### 3.5.1 Standardization Scope
VIP mandates the format and behavior of:
*   **Session Handshake:** The specific JSON payloads required to authenticate and configure a session.
*   **Action Registry Schema:** The structure used to define application capabilities to the AI.
*   **State Signals:** The events emitted when transitioning between Idle, Listening, and Speaking.
*   **Error Codes:** Standardized identifiers for network, authentication, and recognition failures.

### 3.5.2 Out of Scope
This specification does not define:
*   **UI Rendering:** How the User Agent visually represents the "Listening" state (e.g., a waveform vs. a glowing orb) is implementation-specific.
*   **Transport Layer Implementation:** While VIP uses WebSocket/WebRTC, the low-level packet handling is governed by those respective standards.
*   **Model Logic:** The internal weights or reasoning process of the LLM is treated as a black box.