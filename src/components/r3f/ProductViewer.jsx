import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Html, Environment, PresentationControls } from "@react-three/drei";

import lobby from "./r3f-hdrs/st_fagans_interior_1k.hdr";
import warehouse from "./r3f-hdrs/empty_warehouse_01_1k.hdr";

import Hat from "./Hat";
import TShirt from "./TShirt";
import Trainers from "./Trainers";
import Skateboard from "./Skateboard";
import AwesomeSvg from "../svg-icons/Awesome.module";
import degreesToRadian from "./r3f-helpers/degreesToRadian";

const ItemViewerOverlay = ({
  rotateView,
  handleRotateView,
  handleWireframe,
}) => {
  const { size, viewport } = useThree();

  const rotateModelRef = useRef();
  const wireframeModelRef = useRef();

  const CompassIcon = AwesomeSvg.CompassIcon;
  const WireframeIcon = AwesomeSvg.BorderNoneIcon;

  const HtmlProps = {
    position: [-viewport.width / 2, viewport.height / 2],
    style: { zIndex: 1000 },
  };

  useEffect(() => {}, []);

  return (
    <Html as="ul" {...HtmlProps}>
      <ul
        style={{
          cursor: "pointer",
        }}
      >
        {/* rotate view */}
        <li onClick={() => handleRotateView(!rotateView)}>
          <button
            ref={rotateModelRef}
            aria-expanded={rotateView}
            aria-label="Toggle model rotation angle"
            className="button--highlight"
          >
            <i>
              <CompassIcon width="30px" height="30px" fill="white" />
            </i>
          </button>
        </li>

        {/* wireframe mode */}
        <li
          onClick={() =>
            handleWireframe((prevWireframe) => {
              wireframeModelRef.current.setAttribute(
                "aria-expanded",
                !prevWireframe
              );

              return !prevWireframe;
            })
          }
        >
          <button
            ref={wireframeModelRef}
            aria-expanded={false}
            aria-label="Toggle wireframe material"
            className="button--highlight"
          >
            <i>
              <WireframeIcon width={"30px"} height={"30px"} fill={"white"} />
            </i>
          </button>
        </li>
      </ul>
    </Html>
  );
};

const Loadscreen = () => {
  return (
    <Html fullscreen className="canvas-loadscreen">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z" />
      </svg>
    </Html>
  );
};

const CHROMA_KEY = "#00b140";

const canvasProps = {
  flat: true,
  shadows: true,
  frameloop: "always",
  dpr: window.devicePixelRatio,
  camera: { fov: 25, position: [0, 0, 30] },
};

const ProductViewer = (props) => {
  const [Item, setItem] = useState(() => {
    const type = props.product ? props.product.type.kind : "tshirt";

    switch (type) {
      case "skateboard":
        return Skateboard.create;

      case "trainers":
        return Trainers.create;

      case "hat":
        return Hat.create;

      default:
        return TShirt.create;
    }
  });

  const hdr = props.itemColor === "#202020" ? warehouse : lobby;

  const [wireframe, setWireframe] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [rotateView, setRotateView] = useState(false);

  const handleWireframe = (boolean) => setWireframe(boolean);
  const handleRotateView = (boolean) => setRotateView(boolean);

  useEffect(() => {
    if (rotateView) return setRotation(degreesToRadian([0, 180, 0]));

    setRotation([0, 0, 0]);
  }, [rotateView]);

  return (
    <div className="canvas-container">
      <Canvas {...canvasProps}>
        <Suspense fallback={<Loadscreen />}>
          <PresentationControls
            global={false}
            cursor={true}
            snap={true} // snap back to default position
            speed={1}
            zoom={1}
            rotation={rotation} // Default rotation
            polar={[-Math.PI / 4, Math.PI / 4]} // Vertical limits
            azimuth={[-Infinity, Infinity]} // Horizontal limits
          >
            <Item
              wireframe={wireframe}
              product={props.product}
              itemColor={props.itemColor ? props.itemColor : "white"}
            />

            <Environment
              files={hdr} // hdr
            />
          </PresentationControls>

          <ItemViewerOverlay
            rotateView={rotateView}
            handleRotateView={handleRotateView}
            handleWireframe={handleWireframe}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

// black and dark colors | warehouse
// white or light colors | lobby

export default ProductViewer;
