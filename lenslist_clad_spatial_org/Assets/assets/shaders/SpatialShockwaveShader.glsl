// 🌌 SpatialShockwaveShader.glsl — Task Completion Shockwave Ring Shader
// Part of Lenslist CLAD Spatial AR (The CLAD Summer Hackathon 2026)

#ifdef VERTEX_SHADER
attribute vec3 position;
attribute vec2 uv;
uniform mat4 modelViewProjectionMatrix;
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);
}
#endif

#ifdef FRAGMENT_SHADER
varying vec2 vUv;
uniform float expansionProgress; // 0.0 to 1.0 expansion
uniform vec3 shockwaveColor;     // Golden/Gold Energy Ring

void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = length(vUv - center);
    
    float ringRadius = expansionProgress * 0.5;
    float ringThickness = 0.05;
    
    float ringIntensity = smoothstep(ringRadius - ringThickness, ringRadius, dist) -
                          smoothstep(ringRadius, ringRadius + ringThickness, dist);
    
    float fadeOut = 1.0 - expansionProgress;
    vec3 color = shockwaveColor * ringIntensity * 2.0;
    float alpha = ringIntensity * fadeOut;
    
    gl_FragColor = vec4(color, alpha);
}
#endif
