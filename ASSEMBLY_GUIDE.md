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
- Drag & drop the `scripts/` directory into Lens Studio's **Asset Browser**:
  - [KineticTaskOrb.ts](scripts/KineticTaskOrb.ts)
  - [SpatialMatrixManager.ts](scripts/SpatialMatrixManager.ts)
  - [SpatialWarpTimer.ts](scripts/SpatialWarpTimer.ts)
  - [SpatialAudioController.ts](scripts/SpatialAudioController.ts)
  - [SpatialVoiceGestureController.ts](scripts/SpatialVoiceGestureController.ts)
  - [SpatialHolographicRingHUD.ts](scripts/SpatialHolographicRingHUD.ts)
- Drag & drop 3D Mesh and Shaders from `assets/`:
  - 3D Model: [`assets/models/KineticTaskOrbMesh.obj`](assets/models/KineticTaskOrbMesh.obj)
  - Shader 1: [`assets/shaders/FresnelEnergyShader.glsl`](assets/shaders/FresnelEnergyShader.glsl)
  - Shader 2: [`assets/shaders/SpatialShockwaveShader.glsl`](assets/shaders/SpatialShockwaveShader.glsl)

### 3. Construct Scene Hierarchy
```
Scene Hierarchy
├── WorldCamera (Spectacles Head Tracking)
├── TaskMatrixManager (Empty SceneObject)
│   ├── Component: SpatialMatrixManager.ts
│   └── Component: SpatialVoiceGestureController.ts (Voice & Gesture Classifier)
├── WristHolographicRing (SceneObject Anchor)
│   └── Component: SpatialHolographicRingHUD.ts (Volumetric Wrist Status Ring)
├── ParentTaskOrb_Work (SceneObject + RenderMesh + Fresnel Material)
│   ├── Transform: Pos(0, 1.5, 1.2), Scale(0.2, 0.2, 0.2)
│   └── Component: KineticTaskOrb.ts (priorityMass = 2.0)
├── SubTaskOrb_Email (SceneObject + RenderMesh)
│   └── Component: KineticTaskOrb.ts (priorityMass = 1.0)
├── SubTaskOrb_Design (SceneObject + RenderMesh)
│   └── Component: KineticTaskOrb.ts (priorityMass = 1.2)
└── SpatialWarpChronometer (Torus SceneObject + Dynamic Shader)
    └── Component: SpatialWarpTimer.ts (focusDurationMinutes = 25)
```

### 4. Connect Script References
1. In `TaskMatrixManager`:
   - Drag `ParentTaskOrb_Work` into `parentTaskOrb` slot.
   - Add `SubTaskOrb_Email` and `SubTaskOrb_Design` into the `satelliteOrbs` array.
2. In Lens Studio Logger window, verify stdout:
   ```
   [SpatialMatrixManager] Cluster 'Spatial Work Matrix' initialized
   [LEAF Test Framework] Executing spatial matrix integration tests...
   [LEAF Test Framework] ✅ ALL TESTS PASSED SUCCESSFULLY!
   ```

---

## 🎥 Recording Demo Video Walkthrough
1. Set Lens Studio Simulator view to **Spectacles Hand Tracking / Gaze Mode**.
2. Click **Record Preview** in Lens Studio top bar.
3. Perform Hand Pinch on `ParentTaskOrb_Work` to demonstrate elastic laser-tethers and orbital satellite dynamics.
4. Complete a task orb to show volumetric shockwave dissolve & 3D audio resonance.
5. Save MP4 video for submission!
