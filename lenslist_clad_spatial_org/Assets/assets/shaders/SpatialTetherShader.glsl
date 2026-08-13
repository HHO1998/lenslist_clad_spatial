// 🌌 SpatialTetherShader.glsl — Volumetric Elastic Laser-Tether Beam Shader
// Part of Lenslist CLAD Spatial AR (The CLAD Summer Hackathon 2026)
// Target: Snap Spectacles 3D Beam Mesh Shader Graph

#ifdef VERTEX_SHADER
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
}
#endif

#ifdef FRAGMENT_SHADER
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;

uniform vec3 cameraPosition;
uniform vec3 tetherColor;       // Energy Beam Base (e.g. #00F0FF Cyan)
uniform vec3 coreGlowColor;      // Core High Energy Glow (#FFFFFF White/Cyan)
uniform float beamThickness;     // Beam core thickness exponent
uniform float pulseSpeed;        // Longitudinal pulse velocity
uniform float time;              // Global scene timestamp

void main() {
    // Distance from center of beam line along U-axis
    float distFromCenter = abs(vUv.x - 0.5) * 2.0;
    float coreIntensity = pow(1.0 - clamp(distFromCenter, 0.0, 1.0), beamThickness);
    
    // Longitudinal energy pulse travelling along tether (V-axis)
    float longitudinalPulse = 0.7 + 0.3 * sin(vUv.y * 20.0 - time * pulseSpeed);
    
    vec3 finalBeamColor = mix(tetherColor, coreGlowColor, coreIntensity * 0.8) * longitudinalPulse;
    float alpha = clamp(coreIntensity * longitudinalPulse, 0.0, 1.0);
    
    gl_FragColor = vec4(finalBeamColor, alpha);
}
#endif
