import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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

  // カメラの動きを制御するコントロール
  private controls: OrbitControls | undefined;

  constructor() {
    THREE.Object3D.DEFAULT_UP.set(0, 0, 1);
    // シーンを作成
    this.scene = new THREE.Scene();
    // シーンの背景を白に設定
    this.scene.background = new THREE.Color(0xffffff);
    // レンダラーをバインド
    // this.render = this.render.bind(this);
  }

  public OnInit(
    canvasElement: HTMLCanvasElement,
    width: number,
    height: number
  ): void {

    // カメラ
    this.Width = width;
    this.Height = height;

    // レンダラー
    this.createRender(canvasElement, this.Width, this.Height);

    // 環境光源
    this.add(new THREE.AmbientLight(0xf0f0f0));

    // コントロール
    this.addControls();

    // 立方体のジオメトリとマテリアルを作成
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // 立方体のメッシュを作成
    const cube = new THREE.Mesh(geometry, material);
    // シーンに立方体を追加
    this.scene.add(cube);
  }

  // レンダリングのサイズを取得する
  public getBoundingClientRect(): DOMRect {
    return this.renderer.domElement.getBoundingClientRect();
  }

  // レンダラーを初期化する
  private createRender(
    canvasElement: HTMLCanvasElement,
    Width: number,
    Height: number
  ): void {
    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
      canvas: canvasElement,
      alpha: true, // transparent background
      antialias: true, // smooth edges
    });
    this.renderer.shadowMap.enabled = true;

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.domElement.style.position = "absolute";

    this.onResize(this.Width, this.Height);

  }

  // レンダリングする
  public render() {
    if (this.renderer === null) return;
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  // リサイズ
  public onResize(Width: number, Height: number): void {

    const aspectRatio: number = Width / Height;

    if ("aspect" in this.camera) {
      this.camera["aspect"] = aspectRatio;
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

    this.aspectRatio = Width / Height;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(Width, Height);
    this.renderer.setPixelRatio(this.aspectRatio);
    this.labelRenderer.setSize(Width, Height);
    this.render();
  }

  // コントロール
  public addControls() {
    if (this.labelRenderer == null) return;
    this.controls = new OrbitControls(
      this.camera,
      this.labelRenderer.domElement
    );
    this.controls.addEventListener("change", this.render);

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
