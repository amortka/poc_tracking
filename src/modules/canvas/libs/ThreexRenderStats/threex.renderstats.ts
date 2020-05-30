import * as THREE from 'three';

export class RendererStats {
  container: HTMLElement = document.createElement('div');
  msDiv: HTMLElement = document.createElement('div');
  msText: HTMLElement = document.createElement('div');

  msTexts = [];
  nLines = 9;

  lastTime = Date.now();

  domElement = this.container;

  constructor() {
    this.container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';
    this.msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#200;';
    this.container.appendChild(this.msDiv);

    this.msText.style.cssText =
      'color:#f00;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
    this.msText.innerHTML = 'WebGLRenderer';
    this.msDiv.appendChild(this.msText);

    for (let i = 0; i < this.nLines; i++) {
      this.msTexts[i] = document.createElement('div');
      this.msTexts[i].style.cssText =
        'color:#f00;background-color:#311;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
      this.msDiv.appendChild(this.msTexts[i]);
      this.msTexts[i].innerHTML = '-';
    }
  }

  update(webGLRenderer) {
    // sanity check
    console.assert(webGLRenderer instanceof THREE.WebGLRenderer);

    // refresh only 30time per second
    if (Date.now() - this.lastTime < 1000 / 30) return;
    this.lastTime = Date.now();

    let i = 0;
    this.msTexts[i++].textContent = '== Memory =====';
    this.msTexts[i++].textContent = 'Programs: ' + webGLRenderer.info.memory.programs;
    this.msTexts[i++].textContent = 'Geometries: ' + webGLRenderer.info.memory.geometries;
    this.msTexts[i++].textContent = 'Textures: ' + webGLRenderer.info.memory.textures;

    this.msTexts[i++].textContent = '== Render =====';
    this.msTexts[i++].textContent = 'Calls: ' + webGLRenderer.info.render.calls;
    this.msTexts[i++].textContent = 'Vertices: ' + webGLRenderer.info.render.vertices;
    this.msTexts[i++].textContent = 'Faces: ' + webGLRenderer.info.render.faces;
    this.msTexts[i++].textContent = 'Points: ' + webGLRenderer.info.render.points;
  }
}
