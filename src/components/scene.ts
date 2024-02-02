import * as THREE from 'three';
import createBox from './geometory';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let box: THREE.Mesh | null = null;


// addCubeをReactの関数コンポーネントに変更する
const AddCube = (scene: THREE.Scene) => {
    // ここでキューブを追加するロジックを実装
    box = createBox();
    scene.add(box);
};
export default AddCube;

// boxを回転させる
export const rotateBox = (elapsedTime: number) => {
    if(box === null) return;
    // アニメーション
    box.rotation.x = elapsedTime;
    box.rotation.y = elapsedTime;
};

export let camera: THREE.PerspectiveCamera | THREE.OrthographicCamera | null = null;
export const setCamera = (width: number, height: number) => {
    camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      );
}

export let renderer: THREE.WebGLRenderer | null = null;
export const setRenderer = (canvas: HTMLElement, width: number, height: number) => {
    renderer = new THREE.WebGLRenderer({
        canvas: canvas || undefined,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio); 
}

export let controls: OrbitControls;
export const setOrbitControls = (scene: THREE.Scene) => {
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

export const render = (scene: THREE.Scene) => {
    if (renderer === null) return;
    if(camera === null ) return;
    renderer.render(scene, camera);
}