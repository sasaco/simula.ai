import { Injectable } from '@angular/core';
import * as THREE from 'three';
// import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Injectable({
  providedIn: 'root'
})
export class SceneService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;

  // カメラの動きを制御するコントロール
  //private controls: OrbitControls | undefined;

  public OnInit(canvasElement: HTMLCanvasElement): void {

    this.camera = new THREE.OrthographicCamera();
    this.camera.position.z = 1;

    this.scene = new THREE.Scene(); // シーンを作成
    this.scene.background = new THREE.Color(0x000000);  // シーンの背景を黒に設定
    //this.scene.background = new THREE.Color(0xffffff);  // シーンの背景を白に設定

    // 環境光源
    this.add(new THREE.AmbientLight(0xf0f0f0));

    // コントロール
    // this.controls = new OrbitControls(
    //   this.camera,
    // );
    // this.controls.addEventListener("change", this.render);

    // レンダラー
    this.onResize(canvasElement); // this.renderer=nullの状態で
    this.renderer = new THREE.WebGLRenderer( { canvas: canvasElement } );

  }

  // レンダリングする
  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  // リサイズ
  public onResize(canvasElement: HTMLCanvasElement): void {

    const Width = canvasElement.clientWidth;
    const Height = canvasElement.clientHeight;
    const aspectRatio = Width / Height;

    if ("aspect" in this.camera)
      this.camera["aspect"] = aspectRatio;

    if ("left" in this.camera)
      this.camera["left"] = -Width / 2;

    if ("right" in this.camera)
      this.camera["right"] = Width / 2;

    if ("top" in this.camera)
      this.camera["top"] = Height / 2;

    if ("bottom" in this.camera)
      this.camera["bottom"] = -Height / 2;

    this.camera.updateProjectionMatrix();

    if (this.renderer == null) return;
    this.renderer.setSize(Width, Height);
    this.renderer.setPixelRatio(aspectRatio);
    this.render();
  }


  // シーンにオブジェクトを追加する
  public add(...threeObject: THREE.Object3D[]): void {
    for (const obj of threeObject) {
      this.scene.add(obj);
    }
  }

  // シーンのオブジェクトを削除する
  public remove(...threeObject: THREE.Object3D[]): void {
    for (const obj of threeObject) {
      this.scene.remove(obj);
    }
  }

  // シーンにオブジェクトを削除する
  public removeByName(...threeName: string[]): void {
    for (const name of threeName) {
      const target = this.scene.getObjectByName(name);
      if (target === undefined) {
        continue;
      }
      this.scene.remove(target);
    }
  }

  // マウス位置とぶつかったオブジェクトを検出する
  public detectObject(mouse: THREE.Vector2, action: string): void {
    const raycaster = this.getRaycaster(mouse);

  }

  // 物体とマウスの交差判定に用いるレイキャスト
  public getRaycaster(mouse: THREE.Vector2): THREE.Raycaster {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    return raycaster;
  }

}
