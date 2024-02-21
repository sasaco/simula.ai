import styled from "@emotion/styled";
import { FC, useState } from "react";

import {sceneHandler} from '../core/scene-handler';
import * as OBC from 'openbim-components';
import { Mesh, MeshBasicMaterial, Scene, SphereGeometry } from "three";


export const TextInfo: FC = () => {
  const Button = styled.button`
    position: absolute;
    background-color: #55ff55;
    padding: 20px;
    left: 50px;
    top: 50px;
  `;

  const TextDiv = styled.div`
    position: absolute;
    background-color: white;
    padding: 20px;
    left: 50px;
    top: 120px;
  `;


  const [sceneParamDatas, setSceneParamDatas] = useState<string>("");

  const onClickShowSceneParam = () => {

    const viewer = sceneHandler.viewer;
    if(viewer){
      const _components = viewer._components;
      const scene: Scene = _components.scene.get();
      const model = scene.children.filter((mesh) => {
        const ifc = mesh.name === "ifc" && mesh;
        return ifc;
      });

      // three.jsでmeshを作成し、
      const geom = new SphereGeometry(10, 8, 8);
      const material = new MeshBasicMaterial({ color: 0xff0000 });
      const sphereMesh = new Mesh(geom, material);
      sphereMesh.position.set(1, 2, 3);
      scene.add(sphereMesh);

    }else
      setSceneParamDatas("TESTです");
  };

  return (
    <>
      <Button onClick={onClickShowSceneParam}>SCENE 確認</Button>
      {sceneParamDatas && <TextDiv>{sceneParamDatas}</TextDiv>}
    </>
  );
};
