import React, { useRef } from "react";
import { FlakesTexture } from "./r3f-helpers/FlakesTexture";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { CanvasTexture, RepeatWrapping, Vector2 } from "three";

import deck from "../../assets/models/deck.glb";
import degreesToRadian from "./r3f-helpers/degreesToRadian";

const Skateboard = (() => {
  const create = (props) => {
    const ref = useRef();

    const productName = props?.product?.name;
    const designDecal = useTexture(
      props.product ? props.product.image.design : tag
    );

    let scale = [15, 18, 15];
    let position = [0, 0, 0];
    let rotation = degreesToRadian([0, 90, 90]);

    const decalXPos =
      (productName && productName === "html") ||
      (productName && productName === "swift")
        ? 0.1
        : 0;

    const decals = {
      skateboard: {
        a: {
          position: [0, 0.065, 0],
          rotation: degreesToRadian([90, 180, 90]),
          scale: 0.15,
          map: designDecal,
          "map-anisotropy": 16,
        },
        small: {
          position: [0, 0.0569, 0],
          rotation: degreesToRadian([90, 180, 90]),
          scale: 0.15,
          map: designDecal,
          "map-anisotropy": 16,
        },
        big: {
          position: [decalXPos ? decalXPos : 0, 0.065, 0],
          rotation: degreesToRadian([90, 180, 90]),
          scale: 1,
          map: designDecal,
          "map-anisotropy": 16,
        },
      },
    };

    const { nodes } = useGLTF(deck);
    const mesh = Object.entries(nodes)[1][0];

    const normalMap3 = new CanvasTexture(new FlakesTexture());
    normalMap3.wrapS = RepeatWrapping;
    normalMap3.wrapT = RepeatWrapping;
    normalMap3.repeat.x = 10;
    normalMap3.repeat.y = 6;
    normalMap3.anisotropy = 16;

    const carpaint = {
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      metalness: 0.9,
      roughness: 0.5,
      normalMap: normalMap3,
      normalScale: new Vector2(0.15, 0.15),
    };

    const wood = {
      clearcoat: 1.0,
      clearcoatRoughness: 0.5,
      metalness: 0.6,
      roughness: 1,
      normalMap: normalMap3,

      normalScale: new Vector2(0.15, 0.15),
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
        <mesh castShadow receiveShadow geometry={nodes[mesh].geometry}>
          <meshPhysicalMaterial
            {...carpaint}
            color="lightgrey"
            wireframe={props.wireframe}
          />
          <Decal {...decals.skateboard.big} />
          {/* <Decal {...decals.skateboard.small}/> */}
        </mesh>
      </group>
    );
  };

  useGLTF.preload(deck);
  return { create };
})();

export default Skateboard;
