import * as THREE from 'three';

const createBox = () => {
  // ボックスジオメトリー
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  // メッシュのマテリアルを黄色に変更
  const boxMaterial = new THREE.MeshLambertMaterial({
    color: "#ffff00", // 黄色に設定
  });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.z = -5;
  box.rotation.set(10, 10, 10);

  // エッジジオメトリーとラインマテリアルが存在しないというリンターエラーを修正
  const edges = new THREE.EdgesGeometry(boxGeometry); // THREE.EdgesGeometryが存在するか確認してください
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // THREE.LineBasicMaterialが存在するか確認してください
  const lineSegments = new THREE.LineSegments(edges, lineMaterial); // THREE.LineSegmentsが存在するか確認してください
  box.add(lineSegments); // ボックスにエッジを追加

  return box;
};

export default createBox;