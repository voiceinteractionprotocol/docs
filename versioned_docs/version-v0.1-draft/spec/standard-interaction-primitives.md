---
id: standard-interaction-primitives
title: Standard Interaction Primitives
slug: /spec/standard-interaction-primitives
---

# 6. Standard Interaction Primitives

This section defines the atomic units of interaction that all compliant VIP implementations **MUST** support. These primitives form the foundation of the Voice Interaction Tree and represent the only standardized mechanisms by which the Voice Runtime interacts with the User Agent.

## 6.1 Primitive Definition Framework

In the context of VIP, a **Primitive** is a standardized, indivisible interaction capability exposed by the Application via the **Action Registry**.

Primitives serve as the bridge between the Application's business logic and the AI's probabilistic reasoning.
*   **Registry Representation:** Every primitive corresponds to a predefined schema entry in the Action Registry.
*   **Deterministic Execution:** While the AI may use probabilistic logic to *select* a primitive, the *execution* of the primitive by the User Agent **MUST** be deterministic.
*   **State Dependency:** Primitives are only valid when the interaction state allows for `Action Invocation`.

## 6.2 Core Interaction Primitives

These primitives represent the fundamental bi-directional flow of the protocol.

### 6.2.1 System Output (Reply)
**Description:** The act of the Voice Runtime synthesizing and streaming audio to the User Agent.
**Required Properties:**
*   `content`: The text or SSML to be synthesized.
*   `interruptible`: Boolean flag indicating if the user can barge in.
**Supported Events:** `audio.start`, `audio.end`, `audio.interrupted`.
**Constraints:**
*   **MUST** be supported by all implementations.
*   **MUST** transition the state to `speaking`.

### 6.2.2 Input Capture (Listen)
**Description:** The act of the User Agent capturing audio or text input from the user.
**Required Properties:**
*   `timeout`: Maximum duration to wait for input.
*   `mode`: `voice` (default) or `text`.
**Supported Events:** `input.detected`, `input.timeout`, `input.complete`.
**Constraints:**
*   Triggered automatically by VAD or manually via Push-to-Talk.
*   **MUST** transition the state to `listening`.

## 6.3 Action-Based Primitives

The following primitives define the functional capabilities the Voice Runtime can invoke on the Client. These correspond directly to the `invoke_action` capabilities defined in the Action Registry.

### 6.3.1 Navigation Primitive
**Description:** A command to change the current application context (route, page, or view).
**Registry Type:** `navigation`
**Required Properties:**
*   `target`: The unique identifier or path of the destination.
**Supported Events:** `navigation.success`, `navigation.failure`.
**Constraints:**
*   The `target` **MUST** exist in the `get_available_routes` list provided during context propagation.
*   Successful execution **MUST** trigger a refresh of the `Narrated State Description`.

### 6.3.2 Trigger Primitive (Button)
**Description:** A command to invoke a stateless, immediate UI action (equivalent to a click/tap).
**Registry Type:** `button`
**Required Properties:**
*   `element_id`: The unique identifier of the UI element.
**Supported Events:** `action.success`, `action.failure`.
**Constraints:**
*   The `element_id` **MUST** be present in the current `Visibility Registry`.
*   The action **MUST** be idempotent from the perspective of the protocol (retry safe) unless explicitly marked otherwise.

### 6.3.3 Input Submission Primitive
**Description:** A command to input data into a specific form field.
**Registry Type:** `input`
**Required Properties:**
*   `element_id`: The identifier of the input field.
*   `value`: The data to be entered.
*   `input_type`: **MUST** match one of the supported types defined below.
**Supported Input Types:**
*   `text`: Arbitrary string data.
*   `number`: Numeric data.
*   `boolean`: True/False values.
*   `checkbox`: Selection state.
*   `radiobutton`: Exclusive selection state.
*   `password`: Sensitive string data (redacted in logs).
**Constraints:**
*   The User Agent **MUST** validate the `value` against the field's schema (e.g., ensure `number` is numeric) before execution.
*   The User Agent **SHOULD** provide auditory feedback confirming the value was set.

### 6.3.4 Confirmation Primitive
**Description:** A command requesting explicit user approval before finalizing a destructive or sensitive action.
**Registry Type:** `confirmation`
**Required Properties:**
*   `reference_action_id`: The ID of the pending action requiring approval.
*   `status`: `confirmed` or `rejected`.
**Constraints:**
*   The Voice Runtime **MUST NOT** execute the referenced action until the Confirmation Primitive returns `confirmed`.
*   This primitive is **REQUIRED** for any action marked as `sensitive` in the Registry.

## 6.4 Primitive Constraints

To ensure safety and interoperability, the following protocol-level constraints apply:

1.  **Registry Enforcement:** The Voice Runtime **MUST NOT** attempt to invoke a primitive that is not explicitly listed in the User Agent's current Action Registry.
2.  **Visibility Boundary:** Actions (Buttons/Inputs) that are not currently visible (not in the `Visibility Registry`) **MUST NOT** be invocable unless explicitly flagged as `global`.
3.  **Type Safety:** The User Agent **MUST** reject `Input Submission` requests where the data type does not match the target element's defined type (e.g., sending text to a checkbox).
4.  **Atomic Execution:** Primitives **MUST** be executed atomically. Partial execution (e.g., navigating halfway) is treated as a `failure`.

## 6.5 Extensible Primitive Model

VIP supports extension beyond the core primitives via Vendor Extensions.

1.  **Prefixing:** Custom primitives **MUST** use a vendor-specific prefix (e.g., `x-vendor-custom-action`) in the Action Registry.
2.  **Fallback:** If a Voice Runtime encounters an unknown primitive type in the Registry, it **MUST** ignore it and rely on Core Primitives.
3.  **Compliance:** Custom primitives **MUST** adhere to the standard `invoke_action` message structure and `action.success`/`action.failure` event flow.