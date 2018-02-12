varying float intensity;

void main() {
  vec3 glow = vec3(1.75, 1.9, 1.9) * intensity;

  gl_FragColor = vec4(glow, 1.0);
}