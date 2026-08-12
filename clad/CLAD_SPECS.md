# 🤖 CLAD Agent Context & Automation Blueprint

> **Target Platform**: Snap Spectacles (Lens Studio 5.22+)  
> **Framework**: Closed Loop Agentic Development (CLAD) via MCP  
> **Timestamp**: `2026-08-12T18:44:07+05:30` | **Epoch**: `1786540447`  

---

## 🎯 CLAD AI Agent Directives

When Lens Studio's CLAD AI Agent connects to this project workspace via MCP, it MUST adhere to the following rules:

1. **Scene Composition Protocol**:
   - Construct scenes using physical 3D mesh components rather than flat 2D screen canvases.
   - Attach physical collision layers and raycast targets to every interactive node.
   - Use `SpatialTransform` and `WorldPosition` relative to the Spectacles camera tracking frame.

2. **Kinetic Task Orb Mechanics**:
   - Primary interactable object type: `KineticTaskOrb`.
   - Attributes: `mass`, `priorityGravitas`, `orbitRadius`, `elasticTether`.
   - Interactions supported: `GazeSelect`, `PinchDrag`, `RayCastTether`, `SpatialAudioPulse`.

3. **LEAF Automated Test Integration**:
   - Implement `assertSceneState()` functions in Lens Studio scripts so LEAF can run automated headless interaction tests in the closed-loop agent pipeline.
