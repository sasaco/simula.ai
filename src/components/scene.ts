import * as THREE from 'three';
import createBox from './geometory';

let box: THREE.Mesh | null;

// addCubeをReactの関数コンポーネントに変更する
const AddCube = (scene: THREE.Scene) => {

    // ここでキューブを追加するロジックを実装
    box = createBox();
    scene.add(box);

    return box; // このコンポーネントは何も描画しない
};
export default AddCube;

// boxを回転させる
export const rotateBox = (elapsedTime: number) => {
    if(box === null) return;
    // アニメーション
    box.rotation.x = elapsedTime;
    box.rotation.y = elapsedTime;
};
