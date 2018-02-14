precision highp float;
precision highp int;

vec3 baseColor = vec3(0, 0.25098039215686274, 0.6901960784313725);
float brightness = 0.8;
float scale = 6.0;

uniform float time;

varying vec3 vPosition;

float field(in vec3 p) {
    float strength = 7. + .03 * log(1.e-6 + fract(sin(time) * 4373.11));
    float accum = 0.;
    float prev = 0.;
    float tw = 0.;
    for (int i = 0; i < 32; ++i) {
        float mag = dot(p, p);
        p = abs(p) / mag + vec3(-.51, -.4, -1.3);
        float w = exp(-float(i) / 7.);
        accum += w * exp(-strength * pow(abs(mag - prev), 2.3));
        tw += w;
        prev = mag;
    }
    return max(0., 5. * accum / tw - .2);
}

vec3 nrand3(vec2 co) {
    vec3 a = fract(cos(co.x * 8.3e-3 + co.y) * vec3(1.3e5, 4.7e5, 2.9e5));
    vec3 b = fract(sin(co.x * 0.3e-3 + co.y) * vec3(8.1e5, 1.0e5, 0.1e5));
    vec3 c = mix(a, b, 0.5);
    return c;
}

vec4 Star_Swamp_3D_version_1518181399092_348_main() {
    vec4 Star_Swamp_3D_version_1518181399092_348_gl_FragColor = vec4(0.0);
    vec3 pos = vPosition / scale;
    
    vec3 p = vec3(pos / 4.) + vec3(2., -1.3, -1.);
    p += 0.18 * vec3(sin(time / 16.), sin(time / 12.), sin(time / 128.));
    
    vec3 p2 = vec3(pos / (4. + sin(time * 0.11) * 0.2 + 0.2 + sin(time * 0.15) * 0.3 + 0.4)) + vec3(2., -1.3, -1.);
    p2 += 0.2 * vec3(sin(time / 16.), sin(time / 12.), sin(time / 128.));
    
    vec3 p3 = vec3(pos / (4. + sin(time * 0.14) * 0.23 + 0.23 + sin(time * 0.19) * 0.31 + 0.31)) + vec3(2., -1.3, -1.);
    p3 += 0.25 * vec3(sin(time / 16.), sin(time / 12.), sin(time / 128.));
    
    float t = field(p);
    float t2 = field(p2);
    float t3 = field(p3);
    float v = (1. - exp((abs(pos.x) - 1.) * 6.)) * (1. - exp((abs(pos.y) - 1.) * 6.)) * (1. - exp((abs(pos.z) - 1.) * 6.));
    
    vec3 c1 = mix(.9, 1., v) * vec3(1.8 * t * t * t, 1.4 * t * t, t);
    vec3 c2 = mix(.8, 1., v) * vec3(1.9 * t2 * t2 * t2, 1.8 * t2 * t2, t2);
    vec3 c3 = mix(.8, 1., v) * vec3(1.4 * t3 * t3 * t3, 1.8 * t3 * t3, t3);
    c1 *= baseColor;
    c2 *= baseColor;
    c3 *= baseColor;
    
    Star_Swamp_3D_version_1518181399092_348_gl_FragColor = vec4(brightness * vec3(c1 * 0.7 + c2 * 0.9 + c3 * 0.1), 0.85);
    
    return Star_Swamp_3D_version_1518181399092_348_gl_FragColor *= 1.0;
}

void main() {
    gl_FragColor = Star_Swamp_3D_version_1518181399092_348_main();
}
