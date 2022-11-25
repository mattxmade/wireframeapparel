import React, { useRef } from "react";

import { FrontSide, LinearEncoding } from "three";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import tag from "../../assets/designs/globe_wf.png";
import trainers from "../../assets/models/trainers.glb";
import degreesToRadian from "./r3f-helpers/degreesToRadian";

import color from "./r3f-textures/shoe_mod.webp";
import normal from "./r3f-textures/shoe_normal.webp";

const Trainers = (() => {
  const create = (props) => {
    const ref = useRef();

    const fallback = { image: { design: tag }, style: "fmbn" };

    //const product = props.product ? props.product : fallback;
    const product = fallback;

    const designDecal = useTexture(product.image.design);

    let scale = [28, 28, 28];
    let position = [-1, -3, 0];
    let rotation = [0, degreesToRadian(45), 0];

    const decals = {
      trainers: {
        pocket: {
          position: [-0.09, 0.02, -0.1],
          rotation: degreesToRadian([-10, 180, 0]),
          scale: 0.035,
          map: designDecal,
          "map-anisotropy": 16,

          transparent: true,
          depthTest: true,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -4,

          side: FrontSide,
        },

        large: {
          position: [0, 35, 3],
          rotation: degreesToRadian([0, 0, 0]),
          scale: 8,
          map: designDecal,
          "map-anisotropy": 16,
        },

        medium: {
          position: [0, 35.5, 3],
          rotation: degreesToRadian([0, 0, 0]),
          scale: 6,
          map: designDecal,
          "map-anisotropy": 16,
        },
      },
    };

    let decalSetting = decals.trainers.pocket;

    const { nodes, materials } = useGLTF(trainers);

    const trainerTextureProps = useTexture({
      map: color,
      normalMap: normal,
    });

    trainerTextureProps.map.flipY = false;
    trainerTextureProps.normalMap.flipY = false;

    const trainerMaterialProps = {
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
          geometry={nodes.shoeLeft.geometry}
          rotation={nodes.shoeLeft.rotation}
          position={nodes.shoeLeft.position}
        >
          <meshPhysicalMaterial
            color={props.itemColor}
            {...trainerTextureProps}
            {...trainerMaterialProps}
            wireframe={props.wireframe}
          />
          <Decal {...decalSetting} roughness={0.5} />
        </mesh>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.shoeRight.geometry}
          rotation={nodes.shoeRight.rotation}
          position={nodes.shoeRight.position}
        >
          <meshPhysicalMaterial
            color={props.itemColor}
            {...trainerTextureProps}
            {...trainerMaterialProps}
            wireframe={props.wireframe}
          />
          <Decal {...decalSetting} roughness={0.5} />
        </mesh>
      </group>
    );
  };

  useGLTF.preload(trainers);
  return { create };
})();

export default Trainers;
