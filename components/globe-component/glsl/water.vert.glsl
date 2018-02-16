precision highp float;
precision highp int;

attribute vec2 uv2;

varying vec3 vPosition;

vec4 Star_Swamp_3D_version_1518181399092_348_main() {
    vec4 Star_Swamp_3D_version_1518181399092_348_gl_Position = vec4(0.0);
    vPosition = position;
    Star_Swamp_3D_version_1518181399092_348_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
    return Star_Swamp_3D_version_1518181399092_348_gl_Position *= 1.0;
}

void main() {
    gl_Position = Star_Swamp_3D_version_1518181399092_348_main();
}
