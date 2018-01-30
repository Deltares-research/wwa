varying float intensity;

void main() {
  vec3 glow = vec3(0.75, 0.9, 0.9) * intensity;

  gl_FragColor = vec4(glow, 1.0);
}