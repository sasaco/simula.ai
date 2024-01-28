import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

@Injectable({
  providedIn: 'root'
})
export class SceneService {
  // シーン
  private scene: THREE.Scene;

  // レンダラー
  private renderer = new THREE.WebGLRenderer();
  private labelRenderer = new CSS2DRenderer();

  // カメラ
  private camera: THREE.PerspectiveCamera | THREE.OrthographicCamera = new THREE.OrthographicCamera();
  private aspectRatio: number = 0;
  private Width: number = 0;;
  private Height: number = 0;;

  constructor() {
    THREE.Object3D.DEFAULT_UP.set(0, 0, 1);
    // シーンを作成
    this.scene = new THREE.Scene();
    // シーンの背景を白に設定
    this.scene.background = new THREE.Color(0xffffff);
    // レンダラーをバインド
    this.render = this.render.bind(this);
  }

  public OnInit(
    aspectRatio: number,
    canvasElement: HTMLCanvasElement,
    deviceRatio: number,
    width: number,
    height: number
  ): void {

    // カメラ
    this.aspectRatio = aspectRatio;
    this.Width = width;
    this.Height = height;
    this.onResize(this.aspectRatio, this.Width, this.Height);

    // 環境光源
    this.add(new THREE.AmbientLight(0xf0f0f0));

    // レンダラー
    this.createRender(canvasElement, this.aspectRatio, this.Width, this.Height);

  }

  // レンダリングのサイズを取得する
  public getBoundingClientRect(): DOMRect {
    return this.renderer.domElement.getBoundingClientRect();
  }

  // レンダラーを初期化する
  private createRender(
    canvasElement: HTMLCanvasElement,
    deviceRatio: number,
    Width: number,
    Height: number
  ): void {
    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
      canvas: canvasElement,
      alpha: true, // transparent background
      antialias: true, // smooth edges
    });
    this.renderer.setPixelRatio(deviceRatio);
    this.renderer.setSize(Width, Height);
    this.renderer.shadowMap.enabled = true;
    // this.renderer.setClearColorHex( 0x000000, 1 );

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(Width, Height);
    this.labelRenderer.domElement.style.position = "absolute";
  }

  // レンダリングする
  public render() {
    if (this.renderer === null) return;
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  // リサイズ
  public onResize(deviceRatio: number, Width: number, Height: number): void {
    if ("aspect" in this.camera) {
      this.camera["aspect"] = deviceRatio;
    }
    if ("left" in this.camera) {
      this.camera["left"] = -Width / 2;
    }
    if ("right" in this.camera) {
      this.camera["right"] = Width / 2;
    }
    if ("top" in this.camera) {
      this.camera["top"] = Height / 2;
    }
    if ("bottom" in this.camera) {
      this.camera["bottom"] = -Height / 2;
    }

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(Width, Height);
    this.labelRenderer.setSize(Width, Height);
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
