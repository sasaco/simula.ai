import * as THREE from 'three';
import createBox from './geometory';

let box: THREE.Mesh | null = null;

// ビジーwaitを使う方法
const sleep = () => {
    var startMsec = new Date().getTime();
    while (new Date().getTime() - startMsec < 9000);
}

// addCubeをReactの関数コンポーネントに変更する
const AddCube = (scene: THREE.Scene) => {
    sleep();
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
