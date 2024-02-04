"use client";
import * as THREE from 'three';
import createBox from './geometory';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let box: THREE.Mesh | null = null;


// addCubeをReactの関数コンポーネントに変更する
export default function AddCube(scene: THREE.Scene): void
{
    // ここでキューブを追加するロジックを実装
    box = createBox();
    scene.add(box);
}

// boxを回転させる
export function rotateBox(elapsedTime: number): void
{
    if(box === null) return;
    // アニメーション
    box.rotation.x = elapsedTime;
    box.rotation.y = elapsedTime;
}

export let camera: THREE.PerspectiveCamera | THREE.OrthographicCamera | null = null;
export function setCamera(width: number, height: number): void
{
    camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      );
}

export let renderer: THREE.WebGLRenderer | null = null;
export function setRenderer(canvas: HTMLElement, width: number, height: number): void
{
    renderer = new THREE.WebGLRenderer({
        canvas: canvas || undefined,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio); 
}

export let controls: OrbitControls;
export function setOrbitControls(scene: THREE.Scene): void
{
    if(renderer === null ) return;
    if(camera === null ) return;
    controls = new OrbitControls(
        camera,
        renderer.domElement
      );
      controls.addEventListener("change", (event) => {
        render(scene);
      });
}

export function render(scene: THREE.Scene): void
{
    if (renderer === null) return;
    if(camera === null ) return;
    renderer.render(scene, camera);
}