# 🛠️ Lens Studio 5.23.1 Assembly & Scene Setup Guide

> **Project**: `lenslist_clad_spatial`  
> **Target Device**: Snap Spectacles (SPECS 27)  
> **Challenge**: Hackathon #1 (ORGANIZE)  

---

## 🎯 Assembly Steps for Lens Studio GUI / Simulator

When opening Lens Studio, follow this exact scene hierarchy setup:

### 1. Create Project Profile
- Click **New Project** -> Select **SPECS (2024 / SPECS 27)** Target Platform.
- Set Project Name: `GravitationalKineticTaskMatrix`.

### 2. Import Assets & Scripts
- All TypeScript controllers in `scripts/` are pre-compiled and synced directly:
  - [KineticTaskOrb.ts](scripts/KineticTaskOrb.ts) — Volumetric Gravitational Task Node
  - [SpatialMatrixManager.ts](scripts/SpatialMatrixManager.ts) — Orbital Dynamics & Master Manager
  - [SpatialCategoryClusterSwitcher.ts](scripts/SpatialCategoryClusterSwitcher.ts) — 4-Category Radial Switcher
  - [SpatialTaskSpawner.ts](scripts/SpatialTaskSpawner.ts) — Dynamic Task Spawner & Shatter Engine
  - [SpatialTetherRenderer.ts](scripts/SpatialTetherRenderer.ts) — Elastic Laser Tension Beams
  - [SpatialPriorityColorAura.ts](scripts/SpatialPriorityColorAura.ts) — Chromatic Priority Aura Engine
  - [SpatialQuantumBeacon.ts](scripts/SpatialQuantumBeacon.ts) — Vertical Quantum Core Beacons
  - [SpatialRoomOcclusion.ts](scripts/SpatialRoomOcclusion.ts) — Physical Room Depth Mesh Occlusion
  - [SpatialPersistenceManager.ts](scripts/SpatialPersistenceManager.ts) — GeneralDataStore Session Persistence
  - [SpatialWarpTimer.ts](scripts/SpatialWarpTimer.ts) — Hyper-Dimensional Focus Chronometer
  - [SpatialAudioController.ts](scripts/SpatialAudioController.ts) — 3D Directional Positional Audio Resonator
  - [SpatialVoiceGestureController.ts](scripts/SpatialVoiceGestureController.ts) — Voice & Gesture Classifier
  - [SpatialHolographicRingHUD.ts](scripts/SpatialHolographicRingHUD.ts) — Wrist Holographic Status Ring HUD
  - [SpatialBurstFX.ts](scripts/SpatialBurstFX.ts) — Volumetric Particle Shockwave Generator
  - [SpatialAdaptivePhysicsEngine.ts](scripts/SpatialAdaptivePhysicsEngine.ts) — Inverse-Square Repulsion Engine
- 3D Meshes & Custom Shaders from `assets/`:
  - 3D Model: [`assets/models/KineticTaskOrbMesh.obj`](assets/models/KineticTaskOrbMesh.obj)
  - Shader 1: [`assets/shaders/FresnelEnergyShader.glsl`](assets/shaders/FresnelEnergyShader.glsl)
  - Shader 2: [`assets/shaders/SpatialShockwaveShader.glsl`](assets/shaders/SpatialShockwaveShader.glsl)

### 3. Production Scene Hierarchy (Pre-Wired in `Scene.scene`)
```
Scene Hierarchy
├── Camera Object (Spectacles Head Tracking 6DOF)
├── Envmap (Spectacles Ambient Lighting)
├── Light Source (Directional Fill)
├── TaskMatrixManager (Empty SceneObject)
│   ├── Component: SpatialMatrixManager.ts (Master Orbital Manager)
│   ├── Component: SpatialVoiceGestureController.ts (Voice & Hand Gesture Classifier)
│   └── Component: SpatialAdaptivePhysicsEngine.ts (Magnetic Repulsion Physics)
├── SpatialCategoryClusterSwitcher (SceneObject)
│   └── Component: SpatialCategoryClusterSwitcher.ts (WORK / PERSONAL / CREATIVE / HEALTH)
├── SpatialTaskSpawner (SceneObject)
│   └── Component: SpatialTaskSpawner.ts (Procedural Spawning & Task Shatter)
├── SpatialRoomOcclusion (SceneObject)
│   └── Component: SpatialRoomOcclusion.ts (Environment Depth Occlusion)
├── SpatialPersistenceManager (SceneObject)
│   └── Component: SpatialPersistenceManager.ts (Session Restore Engine)
├── ParticleShockwaveSystem (SceneObject)
│   └── Component: SpatialBurstFX.ts (Volumetric Particle Burst FX)
├── WristHolographicRing (SceneObject Anchor)
│   └── Component: SpatialHolographicRingHUD.ts (Volumetric Status Ring HUD)
├── ParentTaskOrb_Work (SceneObject + RenderMesh + Fresnel Material)
│   ├── Child: 3D Text (`PROJECT ALPHA`)
│   ├── Component: KineticTaskOrb.ts (priorityMass = 2.0)
│   └── Component: SpatialPriorityColorAura.ts (Luminous Cyan Aura)
├── 5 Orbiting Kinetic Sub-Task Satellites:
│   ├── SubTaskOrb_Code (⚡ CODE REFACTOR — Neon Amber)
│   ├── SubTaskOrb_Design (🎨 UI DESIGN — Vibrant Violet)
│   ├── SubTaskOrb_Email (🍃 EMAIL TASK — Emerald Mint)
│   ├── SubTaskOrb_AI (🤖 AI PROMPT — Sky Blue)
│   └── SubTaskOrb_Follow-Up (📌 FOLLOW-UP — Sunset Coral)
├── 5 Elastic Laser Tethers:
│   ├── Tether_Code, Tether_Design, Tether_Email, Tether_AI, Tether_Follow-Up
│   └── Component: SpatialTetherRenderer.ts (Dynamic Elongation Color Shifting)
├── SpatialQuantumBeacon (Vertical Laser Pillar)
│   └── Component: SpatialQuantumBeacon.ts
└── SpatialWarpChronometer (Torus SceneObject + Dynamic Shader)
    └── Component: SpatialWarpTimer.ts (focusDurationMinutes = 25)
```

### 4. Verification & Live Preview
1. Open `lenslist_clad_spatial_org` in Lens Studio 5.23.1.
2. In Lens Studio Logger window, verify stdout:
   ```
   [SpatialMatrixManager] Master Cluster 'Spatial Work Matrix' initialized successfully! 🚀
   [SpatialPersistenceManager] Initialized with 6 tracked tasks.
   [SpatialVoiceGestureController] Voice & Gesture Engine Initialized.
   [LEAF Test Framework] ✅ ALL TESTS PASSED SUCCESSFULLY!
   ```

---

## 🎥 Recording Demo Video Walkthrough
1. Set Lens Studio Simulator view to **Spectacles Hand Tracking / Gaze Mode**.
2. Click **Record Preview** in Lens Studio top bar.
3. Perform Hand Pinch on `ParentTaskOrb_Work` to demonstrate elastic laser-tethers and orbital satellite dynamics.
4. Complete a task orb to show volumetric shockwave dissolve & 3D audio resonance.
5. Save MP4 video for submission!
