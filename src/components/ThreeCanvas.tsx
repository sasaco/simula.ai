"use client";
import { NextPage } from "next";
import { useEffect } from "react";
import * as THREE from "three";
import { useScene } from './SceneContext'; // useSceneフックをインポート

import AddCube, { rotateBox, renderer, setCamera, setRenderer, setOrbitControls, controls, render } from "./scene";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const ThreeCanvas: NextPage = () => {
  let canvas: HTMLElement;
  const scene = useScene(); // コンテキストからsceneを取得

  // useEffectとは、関数の実行タイミングをReactのレンダリング後まで遅らせる
  useEffect(() => {

    async function init() {
      await AddCube(scene);
      render();
    }

    function render() {
      renderer.render(scene, camera);
    }


    if (canvas) return;

    // canvasを取得
    // eslint-disable-next-line react-hooks/exhaustive-deps
    canvas = document.getElementById("canvas")!;

    // サイズ
    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };

    // カメラ
    /*
    setCamera(sizes.width, sizes.height);
    */
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );

    // レンダラー
    /*
    setRenderer(canvas, sizes.width, sizes.height);
    */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    /*
    setOrbitControls(scene);
    */
    const controls = new OrbitControls(
      camera,
      renderer.domElement
    );
    controls.addEventListener("change", render);

    // 非同期関数を呼び出してボックスを作成し、シーンに追加
    // AddCube(scene);

    // ライト
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.2);
    pointLight.position.set(1, 2, 3);
    scene.add(pointLight);

    // アニメーション
    
    const clock = new THREE.Clock();
    const tick = () => {
      rotateBox(clock.getElapsedTime());
      window.requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    //tick();
    render();
    
    // ブラウザのリサイズ処理
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    });
    
    init();

  }, [scene]);

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
};

export default ThreeCanvas;
