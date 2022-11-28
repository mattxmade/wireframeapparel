import React, { useRef } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import tshirt from "../../assets/three/models/tshirt.glb";
import tag from "../../assets/three/decals/wireframe_tag.webp";
import degreesToRadian from "./r3f-helpers/degreesToRadian";

const TShirt = (() => {
  const create = (props) => {
    const ref = useRef();

    const fallback = { image: { design: tag }, style: "fmbn" };
    const product = props.product ? props.product : fallback;

    const productTag = useTexture(tag);
    const designDecal = useTexture(product.image.design);

    let scale = [0.5, 0.5, 0.5];
    let position = [0, -16, -0.225];
    let rotation = [0.1, 0, 0];

    const decals = {
      tshirt: {
        pocket: {
          position: [2, 37, 2.5],
          rotation: degreesToRadian([0, 0, 0]),
          scale: 2,
          map: designDecal,
          "map-anisotropy": 16,
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

        tag: {
          position: [-2.8, 24.2, -3.6],
          rotation: degreesToRadian([0, 0, 0]),
          scale: 0.7,
          map: productTag,
          "map-anisotrpy": 16,
        },
      },
    };

    let decalSetting = decals.tshirt.pocket;

    switch (product.style) {
      case "fpbn": // decal position :: front: badge  | back: none
        decalSetting = decals.tshirt.pocket;
        break;
      case "fmbn": // decal position :: front: medium | back: none
        decalSetting = decals.tshirt.medium;
        break;
      case "flbn": // decal position :: front: large  | back: none
        decalSetting = decals.tshirt.large;
    }

    const { nodes } = useGLTF(tshirt);
    const tshirtMesh = Object.entries(nodes)[1][0];
    const tagMesh = Object.entries(nodes)[2][0];

    const tshirtMaterialProps = {
      roughness: 0.9,
      metalness: 0.5,
      sheen: 1,
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
        <mesh castShadow receiveShadow geometry={nodes[tshirtMesh].geometry}>
          <meshPhysicalMaterial
            color={props.itemColor}
            {...tshirtMaterialProps}
            wireframe={props.wireframe}
          />
          <Decal {...decalSetting} />
          <Decal {...decals.tshirt.tag} />
        </mesh>

        <mesh
          castShadow
          receiveShadow
          scale={[0.1, 0.1, 0.1]}
          position={[0, 40.9, -2.9]}
          rotation={degreesToRadian([180, 0, 0])}
          geometry={nodes[tagMesh].geometry}
        >
          <meshPhysicalMaterial
            color="#ffeeee"
            map={productTag}
            wireframe={props.wireframe}
            {...tshirtMaterialProps}
          />
        </mesh>
      </group>
    );
  };

  useGLTF.preload(tshirt);
  return { create };
})();

export default TShirt;
