# 🌌 AUM AI WORKSPACE DIRECTIVE & SYSTEM ARCHITECTURE
**Project:** `lenslist_clad_spatial` / `lenslist_clad_spatial_org`  
**Event:** Lenslist CLAD Summer Hackathon 2026 (Snap Spectacles) — Theme: ORGANIZE (Week 1)  
**Agent Identity:** Aum (Antigravity AI Pair Programmer)  
**Last Updated:** 2026-08-13  

---

## 🏗️ SYSTEM ARCHITECTURE & DUAL-ENVIRONMENT SETUP

### 1. **NixOS Host (Linux)**
* **Local Workspace Directory:** `/home/sagar/lenslist_clad_spatial`
* **Lens Studio Project Root:** `/home/sagar/lenslist_clad_spatial/lenslist_clad_spatial_org`
* **Role:** Native AI code editing, TypeScript compiling, Git version control, background server hosting.

### 2. **Windows 11 VM (GNOME Boxes / QEMU-KVM)**
* **Allocated Hardware:** 10 GB RAM | 8 vCPU threads | KVM Hardware Acceleration
* **Role:** Runs Snap Spectacles **Lens Studio v5.23.1** & 3D Preview Engine.

### 3. **⚡ Real-Time Live WebDAV Shared Drive (The Bridge)**
* **Host WebDAV Server:** `wsgidav` running on `0.0.0.0:8080` serving `/home/sagar/lenslist_clad_spatial`
* **Windows VM Network Mount:** `This PC > DavWWWRoot (\\10.0.2.2@8080) (Z:)`
* **Lens Studio Project Location:** `Z:\lenslist_clad_spatial_org\`

---

## 🔄 REAL-TIME WORKFLOW PROTOCOL

When the user asks Aum AI in chat to create, refactor, edit, or fix scripts/assets:
1. **Aum AI edits code natively** on Linux Host at `/home/sagar/lenslist_clad_spatial/lenslist_clad_spatial_org/Assets/scripts/*.ts`.
2. **WebDAV Bridge instantly updates Drive `Z:`** in Windows VM (< 0.01s latency).
3. **Lens Studio File Watcher detects change** and triggers `TypeScript compilation...` in Logger.
4. **Lens Studio 3D Preview Window reloads live** with the updated functionality.
5. **No manual typing inside Windows VM is required.**

---

## 🎨 PROJECT COMPONENTS & SCRIPT MAP

* **`SpatialAudioController.ts`**: Synesthetic 3D spatial audio resonator & acoustic feedback.
* **`SpatialMatrixManager.ts`**: Spatial matrix grid layout & 3D task organization.
* **`KineticTaskOrb.ts`**: Interactive 3D Task Orbs (grabbable, responsive objects).
* **`SpatialTetherRenderer.ts`**: Laser tether connections between task nodes.
* **`SpatialVoiceGestureController.ts`**: Snap Spectacles hand gestures & voice command handlers.

---

## 📌 QUICK RE-START COMMAND (IF REBOOTED)

If the WebDAV background server ever stops or host reboots, run:
```bash
nix-shell -p python3Packages.wsgidav --run "wsgidav --host=0.0.0.0 --port=8080 --root=/home/sagar/lenslist_clad_spatial --auth=anonymous"
```
*(Windows drive `Z:\` will instantly reconnect!)*
