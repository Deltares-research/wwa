uniform vec3 viewVector;
varying float intensity;

float c = 0.25;
float p = 2.7;

void main() {
  vec3 vNormal = normalize(normalMatrix * normal);
  vec3 vNormel = normalize(normalMatrix * viewVector);
  intensity = pow(c - dot(vNormal, vNormel), p);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}