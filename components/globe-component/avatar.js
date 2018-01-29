import * as THREE from 'three';
import { loadData } from 'd3-jetpack';

import { GLOBE_RADIUS, INIT_ANGLE, INIT_AXIS } from './constants';
import { lon2rad, lat2rad } from './common';

const SCALE = 1.1;

class Avatar {
  constructor() {
    this.texture = new THREE.TextureLoader().load('img/sample_avatar_rounded.png');
    this.mesh = new THREE.Object3D();
  }

  /**
   * load avatar data and create avatar objects
   * @param  {function} finished callback function, called when done
   * @return {[type]}          [description]
   */
  load(finished) {
    loadData('data/wwa_nbs.json', (err, result) => {
      const material = new THREE.SpriteMaterial({
        map: this.texture,
        color: 0xffffff,
      });

      const that = this;

      result[0].forEach((d) => {
        const avatar = new THREE.Sprite(material.clone());
        // latitude and longitude are mixed up in the data
        const lon = lon2rad(d.location.lat);
        const lat = lat2rad(d.location.lon);

        const x = SCALE * GLOBE_RADIUS * Math.sin(lat) * Math.cos(lon);
        const y = SCALE * GLOBE_RADIUS * Math.sin(lat) * Math.sin(lon);
        const z = SCALE * GLOBE_RADIUS * Math.cos(lat);

        const position = new THREE.Vector3(x, y, z);
        position.applyAxisAngle(INIT_AXIS, INIT_ANGLE);

        avatar.position.x = position.x;
        avatar.position.y = position.y;
        avatar.position.z = position.z;

        avatar.data = d;

        that.mesh.add(avatar);
      });

      finished(this.mesh);
    });
  }
}

export default Avatar;
