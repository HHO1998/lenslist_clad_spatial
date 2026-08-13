// 🌌 FresnelEnergyShader.glsl — Volumetric Energy Orb Shader for Snap Spectacles
// Part of Lenslist CLAD Spatial AR (The CLAD Summer Hackathon 2026)
// Target: Lens Studio 5.23.1 Material Editor (GLSL / Lens Studio Shader Graph)

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
uniform vec3 baseColor;       // Base task energy color (e.g., Cyan #00F0FF)
uniform vec3 rimColor;        // High-intensity rim color (e.g., Violet #9D00FF)
uniform float fresnelPower;   // Fresnel exponent (default: 2.5)
uniform float pulseFrequency; // Pulsation rate
uniform float time;           // Engine time in seconds

void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - clamp(dot(viewDirection, vNormal), 0.0, 1.0), fresnelPower);
    
    // Dynamic sine-wave pulse energy modulation
    float pulse = 0.8 + 0.2 * sin(time * pulseFrequency);
    
    vec3 finalColor = mix(baseColor * pulse, rimColor, fresnel);
    float alpha = clamp(fresnel + 0.3, 0.0, 1.0);
    
    gl_FragColor = vec4(finalColor, alpha);
}
#endif
