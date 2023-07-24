import React, { useRef } from "react";

import { LinearEncoding } from "three";
import { useGLTF, useTexture } from "@react-three/drei";

import color from "../../assets/three/textures/beanie_map.webp";
import normal from "../../assets/three/textures/beanie_normal.webp";

import hat from "../../assets/three/models/beanie.glb";
import degreesToRadian from "./r3f-helpers/degreesToRadian";

const Hat = (() => {
  const create = (props) => {
    const ref = useRef();

    let scale = [0.5, 0.5, 0.5];
    let position = [0, -3, 0];
    let rotation = [0, degreesToRadian(0), 0];

    const { nodes, materials } = useGLTF(hat);

    const hatTextureProps = useTexture({
      map: color,
      normalMap: normal,
    });

    hatTextureProps.map.flipY = false;
    hatTextureProps.normalMap.flipY = false;

    const hatMaterialProps = {
      normalScale: 1,
      roughness: 0.75,
      metalness: 0,
      aoMapIntensity: 0.5,
      normalMapEncoding: LinearEncoding,
    };

    return (
      <group
        {...props}
        dispose={null}
        ref={ref}
        scale={scale}
        rotation={rotation}
        position={position}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.hat.geometry}
          rotation={nodes.hat.rotation}
          position={nodes.hat.position}
        >
          <meshPhysicalMaterial
            color={props.itemColor}
            {...hatTextureProps}
            {...hatMaterialProps}
            wireframe={props.wireframe}
          />
        </mesh>
      </group>
    );
  };

  useGLTF.preload(hat);
  return { create };
})();

export default Hat;
