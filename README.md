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
   - Tasks exist as 3D physical energy orbs floating in real spatial coordinates.
   - Higher priority tasks possess higher gravitational mass, dynamically modulating their hovering frequency and equilibrium altitude.
   - Elastic laser-tethers bend around physical room obstacles with depth-aware mechanics.

2. **Spatial Matrix & Sub-Task Orbit Dynamics** ([SpatialMatrixManager.ts](scripts/SpatialMatrixManager.ts)):
   - Automatically clusters task nodes into 3D Keplerian elliptical orbits around central project hubs.
   - Features dynamic speed modulation, radial repulsion, and LEAF automated assertion testing (`runLeafTestSuite()`).

3. **Multi-Category Spatial Switcher** ([SpatialCategoryClusterSwitcher.ts](scripts/SpatialCategoryClusterSwitcher.ts)):
   - Instant radial category switching across **Work**, **Personal**, **Creative**, and **Health** spatial task matrices with chromatic color shifts.

4. **Dynamic Task Spawner & Shatter Engine** ([SpatialTaskSpawner.ts](scripts/SpatialTaskSpawner.ts)):
   - Procedurally spawns new task nodes into physical space and shatters parent orbs into orbiting satellite sub-tasks upon completion.

5. **Elastic Laser-Tether Dynamics** ([SpatialTetherRenderer.ts](scripts/SpatialTetherRenderer.ts)):
   - Connects parent and child task nodes with real-time elastic tension beams that dynamically shift color (Cyan `#00F0FF` -> Magenta `#FF0077` -> Warning `#FF0055`) based on elongation.

6. **Chromatic Priority Auras & Quantum Beacons** ([SpatialPriorityColorAura.ts](scripts/SpatialPriorityColorAura.ts), [SpatialQuantumBeacon.ts](scripts/SpatialQuantumBeacon.ts)):
   - Color-coded luminous auras and vertical quantum beacons indicating task priority, urgency levels, and spatial anchor points.

7. **Physical Room Depth Occlusion & GeneralDataStore Persistence** ([SpatialRoomOcclusion.ts](scripts/SpatialRoomOcclusion.ts), [SpatialPersistenceManager.ts](scripts/SpatialPersistenceManager.ts)):
   - Environment depth sampling for realistic physical room occlusion and JSON-based spatial session state persistence across app reloads.

8. **Hyper-Dimensional Focus Chronometer** ([SpatialWarpTimer.ts](scripts/SpatialWarpTimer.ts)):
   - Replaces 2D text clocks with an expanding 3D hyper-torus mesh that pulsates and distorts ambient light during focus sessions.

9. **Synesthetic Spatial Audio** ([SpatialAudioController.ts](scripts/SpatialAudioController.ts)):
   - 3D directional positional sound physics triggered on task completion, grab interactions, and category shifts.

10. **Spatial Voice & Gesture Classifier** ([SpatialVoiceGestureController.ts](scripts/SpatialVoiceGestureController.ts)):
    - Parses Spectacles hands-free voice commands ("Organize Matrix", "Focus Warp", "Shatter Completed") and hand tracking pinch/expand vectors with LEAF automated unit tests.

11. **Volumetric Spatial Holographic Ring HUD** ([SpatialHolographicRingHUD.ts](scripts/SpatialHolographicRingHUD.ts)):
    - 3D wrist and palm relative status ring HUD displaying completion percentages, luminous radial arc segments, and active category states.

12. **Volumetric Particle Shockwave System & Physics** ([SpatialBurstFX.ts](scripts/SpatialBurstFX.ts), [SpatialAdaptivePhysicsEngine.ts](scripts/SpatialAdaptivePhysicsEngine.ts)):
    - Generates 3D radial particle shockwaves with alpha decay upon completion and implements inverse-square magnetic repulsion preventing node collisions.

13. **Procedural 3D Mesh & Custom GLSL Shaders** (`assets/`):
    - 3D Model: [`KineticTaskOrbMesh.obj`](assets/models/KineticTaskOrbMesh.obj) (Wavefront procedural sphere).
    - Shaders: [`FresnelEnergyShader.glsl`](assets/shaders/FresnelEnergyShader.glsl), [`SpatialShockwaveShader.glsl`](assets/shaders/SpatialShockwaveShader.glsl).

14. **Closed-Loop Agentic Prompt Log** ([prompts_log.md](clad/prompts_log.md)):
    - Full 11-loop closed-loop agentic design transcript fulfilling the 50% "CLAD Execution" judging criteria.

---

## 📁 Repository Directory Structure

```
lenslist_clad_spatial/
├── ASSEMBLY_GUIDE.md               # Step-by-Step Lens Studio Hierarchy & Scene Guide
├── README.md                       # Project Overview & Hackathon Documentation
├── scripts/                        # Lens Studio TypeScript & Spatial Controllers
│   ├── KineticTaskOrb.ts           # Volumetric Gravitational Task Node System
│   ├── SpatialMatrixManager.ts     # Orbital Dynamics & Master Cluster Manager
│   ├── SpatialCategoryClusterSwitcher.ts # Multi-Category Spatial Switcher
│   ├── SpatialTaskSpawner.ts       # Dynamic Task Spawner & Shatter Engine
│   ├── SpatialTetherRenderer.ts    # Elastic Laser Tension Beams
│   ├── SpatialPriorityColorAura.ts # Chromatic Priority Aura Engine
│   ├── SpatialQuantumBeacon.ts     # Vertical Quantum Core Beacons
│   ├── SpatialRoomOcclusion.ts     # Physical Room Depth Mesh Occlusion
│   ├── SpatialPersistenceManager.ts # Session Persistence via GeneralDataStore
│   ├── SpatialWarpTimer.ts         # Hyper-Dimensional Focus Chronometer
│   ├── SpatialAudioController.ts   # 3D Directional Audio Resonator
│   ├── SpatialVoiceGestureController.ts # Voice Intent & Spatial Gesture Classifier
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
├── config/                         # Lens Studio & Spectacles Configurations
├── tests/                          # 12 Vitest Automated Test Suites (47/47 Tests Passing)
└── tools/                          # Scene Graph Validator & Asset Generators
```

---

## ⚡ Submission Checklist (Week 1: ORGANIZE)
- [x] Public GitHub Repository Setup & Clean Structure
- [x] 100% Volumetric 3D Code (Zero 2D Canvas Fallbacks)
- [x] Automated LEAF Assertion Unit Tests Integrated (47/47 passing)
- [x] CLAD Closed-Loop Execution Transcript ([prompts_log.md](clad/prompts_log.md))
- [x] Visual Assets: Procedural 3D Mesh & Fresnel/Shockwave GLSL Shaders Generated
- [x] Step-by-Step Scene Hierarchy Guide Created ([ASSEMBLY_GUIDE.md](ASSEMBLY_GUIDE.md))
