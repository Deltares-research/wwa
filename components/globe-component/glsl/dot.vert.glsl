uniform float time;
uniform float pointSize;

attribute vec3 targetPosition;
attribute vec3 targetColor;
attribute float value;
attribute float ix;

varying vec3 vColor;

/**
 * Random function
 * @param  {[type]} vec2 co            [description]
 * @return {[type]}      [description]
 */
float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

/**
 * Cubic in/out easing function
 * @param  {[type]} float t             [description]
 * @return {[type]}       [description]
 */
float cubicInOut(float t) {
  if (t < 0.5) {
    return 4.0 * t * t * t;
  } else {
    return (0.5 * pow((2.0 * t) - 2.0, 3.0)) + 1.0;
  }
}
//rand(vec2(position.x, position.y))

/**
 * Vertex shader that determines the position of the particles.
 * It calculates the transition for the position, as well as from
 * the source color to the target color.
 * @return {[type]} [description]
 */
void main() {
  /**
   * Number of particles
   * @type {Number}
   */
  float DATA_SIZE = 57773.0; // UPDATE THIS WITH DIFFERENT DATASET!!
  // float MAX_DELAY = 10.0 * (5.0 - value);
  float TRANSITION_SPEED = 0.1;

  // float delay = (ix / DATA_SIZE) * MAX_DELAY;
  /**
   * Incremental delay for each particle on transition
   * @type {[type]}
   */
  float delay = ((ix / DATA_SIZE) * 15.0) + (((5.0 - value) / 5.0) * 30.0);
  // float delay2 = ((ix / DATA_SIZE) * 30.0) + (((5.0 - value) / 5.0) * 30.0);

  float t = clamp(TRANSITION_SPEED * (time - delay), 0.0, 1.0);

  vColor = color + t * (targetColor - color);

  // vec4 mvPosition = modelViewMatrix * vec4(position + (abs(sin(rand(vec2(position.x, position.y)) * 5.0 * log((value * value * value) + 1.0) * 0.1 * time)) * position * 0.005), 1.0);
  // vec4 mvPosition = modelViewMatrix * vec4(position + (abs(sin((1.0 + value) * time)) * (position * 0.005)), 1.0);

  // vec3 old_pos = position;
  // vec3 new_pos = targetPosition;
  // vec3 p = old_pos + (time * (new_pos - old_pos));

  // vec4 mvPosition = modelViewMatrix * vec4(targetPosition.x, targetPosition.y, targetPosition.z + (0.15 * sin(time - delay2)), 1.0);
  vec4 mvPosition = modelViewMatrix * vec4(position + t * (targetPosition - position), 1.0);
  // vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  // gl_PointSize = 5.0 + rand(vec2(position.x, position.y)) * sin(0.1 * time * (1.0 + 0.5 * value)) * (10.0 / -mvPosition.z);
  gl_PointSize = pointSize * (10.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
