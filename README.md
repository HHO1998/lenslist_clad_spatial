# 🌌 Lenslist CLAD Spatial AR — World-First Spatial Experiences for Snap Spectacles

> **Project Name**: `lenslist_clad_spatial`  
> **Target Device**: Snap Spectacles (SPECS 27 / 2024 Platform)  
> **Lens Studio Version**: Lens Studio 5.23.1  
> **Hackathon**: **The CLAD Summer Hackathon 2026** (Snap Spectacles & Lenslist)  
> **Active Challenge**: **Hackathon #1 — Theme: ORGANIZE**  

---

## 📌 Project Overview
This repository contains the **Gravitational Kinetic Spatial Task Matrix**, a world-first spatial productivity and organizing system engineered for **Snap Spectacles** using **Lens Studio 5.23.1** and **Closed Loop Agentic Development (CLAD)**.

Unlike traditional 2D floating screens, this experience converts task management into a physical 3D gravitational ecosystem where tasks exist as energy spheres with real volumetric mass, orbital mechanics, elastic laser-tethers, and synesthetic spatial audio feedback.

---

## 🏆 Architecture & Key Features

1. **Volumetric Kinetic Task Nodes** ([KineticTaskOrb.ts](scripts/KineticTaskOrb.ts)):
   - Tasks exist as 3D energy orbs floating in real physical space.
   - Higher priority tasks possess higher gravitational mass, adjusting their equilibrium altitude.
   - Elastic laser-tethers bend around physical room obstacles using depth mesh collisions.

2. **Spatial Matrix & Sub-Task Orbit Dynamics** ([SpatialMatrixManager.ts](scripts/SpatialMatrixManager.ts)):
   - Automatically clusters task nodes into 3D Keplerian elliptical orbits.
   - Integrates **LEAF automated assertion testing** (`runLeafTestSuite()`) for closed-loop AI validation.

3. **Hyper-Dimensional Focus Chronometer** ([SpatialWarpTimer.ts](scripts/SpatialWarpTimer.ts)):
   - Replaces 2D text clocks with an expanding 3D hyper-torus mesh that pulsates and distorts ambient light during focus sessions.

4. **Synesthetic Spatial Audio** ([SpatialAudioController.ts](scripts/SpatialAudioController.ts)):
   - 3D directional positional sound physics triggered on task completion and tether interaction.

5. **Spatial Voice & Gesture Classifier** ([SpatialVoiceGestureController.ts](scripts/SpatialVoiceGestureController.ts)):
   - Parses Spectacles hands-free voice commands ("Organize Matrix", "Focus Warp", "Shatter Completed") and hand tracking pinch/expand vectors with LEAF automated unit tests.

6. **Volumetric Spatial Holographic Ring HUD** ([SpatialHolographicRingHUD.ts](scripts/SpatialHolographicRingHUD.ts)):
   - 3D wrist and palm relative status ring HUD displaying completion percentages, luminous arc segments, and active category states via palm-up gestures and voice triggers.

7. **Volumetric Particle Shockwave System** ([SpatialBurstFX.ts](scripts/SpatialBurstFX.ts)):
   - Generates 3D radial particle shockwaves with scale/alpha decay upon task completion, triggering color flashes and spatial audio resonance.

8. **Adaptive Magnetic Repulsion Physics** ([SpatialAdaptivePhysicsEngine.ts](scripts/SpatialAdaptivePhysicsEngine.ts)):
   - Implements inverse-square magnetic repulsion forces preventing 3D task nodes from overlapping in room space.

9. **Procedural 3D Mesh & Custom GLSL Shaders** (`assets/`):
   - 3D Model: [`KineticTaskOrbMesh.obj`](assets/models/KineticTaskOrbMesh.obj) (Wavefront procedural sphere).
   - Shaders: [`FresnelEnergyShader.glsl`](assets/shaders/FresnelEnergyShader.glsl), [`SpatialShockwaveShader.glsl`](assets/shaders/SpatialShockwaveShader.glsl).

10. **Closed-Loop Agentic Prompt Log** ([prompts_log.md](clad/prompts_log.md)):
    - Full 8-loop closed-loop agentic design transcript fulfilling the 50% "CLAD Execution" judging criteria.

---

## 📁 Repository Directory Structure

```
lenslist_clad_spatial/
├── ASSEMBLY_GUIDE.md               # Step-by-Step Lens Studio Hierarchy & Recording Guide
├── README.md                       # Project Overview & Hackathon Documentation
├── scripts/                        # Lens Studio TypeScript & Spatial Controllers
│   ├── KineticTaskOrb.ts           # Volumetric Gravitational Task Node System
│   ├── SpatialMatrixManager.ts     # Orbital Dynamics & LEAF Automated Test Suite
│   ├── SpatialWarpTimer.ts         # Hyper-Dimensional Focus Chronometer
│   ├── SpatialAudioController.ts   # 3D Directional Audio Resonator
│   ├── SpatialVoiceGestureController.ts # Voice Intent & Hand Gesture Classifier Engine
│   ├── SpatialHolographicRingHUD.ts # Volumetric Spatial Wrist Status Ring HUD
│   ├── SpatialBurstFX.ts           # Volumetric Particle Shockwave Generator
│   └── SpatialAdaptivePhysicsEngine.ts # Inverse-Square Magnetic Repulsion Engine
├── assets/                         # Procedural 3D Meshes & Custom Shaders
│   ├── models/KineticTaskOrbMesh.obj
│   └── shaders/
│       ├── FresnelEnergyShader.glsl
│       └── SpatialShockwaveShader.glsl
├── clad/                           # CLAD AI Agent Prompts & Logs
│   ├── CLAD_SPECS.md               # CLAD Integration Blueprint
│   └── prompts_log.md              # Official CLAD Closed-Loop Agentic Transcript
└── config/                         # Lens Studio & Spectacles Configurations
```

---

## ⚡ Submission Checklist (Week 1: ORGANIZE)
- [x] Public GitHub Repository Setup & Clean Structure
- [x] 100% Volumetric 3D Code (Zero 2D Canvas Fallbacks)
- [x] Automated LEAF Assertion Unit Tests Integrated
- [x] CLAD Closed-Loop Execution Transcript ([prompts_log.md](clad/prompts_log.md))
- [x] Visual Assets: Procedural 3D Mesh & Fresnel/Shockwave GLSL Shaders Generated
- [x] Step-by-Step Scene Hierarchy Guide Created ([ASSEMBLY_GUIDE.md](ASSEMBLY_GUIDE.md))
