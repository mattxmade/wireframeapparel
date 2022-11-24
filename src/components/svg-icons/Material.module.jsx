import React from "react";

const MaterialSvg = (() => {
  const CartIcon = (props) => (
    <svg
      className={props && props.className ? props.className : ""}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18.746931 16.215296"
    >
      {props.type === "sharp" ? (
        <path
          style={{ display: "inline", stroke: "none", strokeWidth: 0.0838438 }}
          d="M 9.3495221,1.8672945e-4 C 9.3301331,-3.1370583e-4 9.3106686,1.9467782e-4 9.2908714,0.00167641 8.6981859,0.04604107 8.2621501,1.0358949 7.9654338,1.4756356 7.0715502,2.8006292 6.2200986,4.7108854 5.0350806,5.7707247 4.671961,6.0954727 4.0159722,5.967197 3.566907,5.967197 H 0 c 0.32889389,2.4932411 1.3343145,5.028261 1.9783568,7.457688 0.1625348,0.61314 0.3093932,2.235416 0.8173621,2.624657 0.4068182,0.31178 1.6006102,0.08723 2.0984091,0.08723 h 5.557739 4.064616 c 0.369301,0 1.147423,0.149787 1.432691,-0.135893 0.497129,-0.497796 0.615128,-1.980647 0.806994,-2.660738 C 17.430066,10.951054 18.392965,8.4252715 18.747,5.9672 h -3.649858 c -0.453991,0 -1.107267,0.1264101 -1.477895,-0.1964711 C 12.425163,4.7304619 11.516799,2.7264082 10.645312,1.3908892 10.364457,0.96045692 9.951032,0.01570023 9.3495221,1.8672945e-4 Z M 9.2075974,1.8146214 H 9.4564529 L 12.110894,5.967197 H 6.5531547 Z M 1.6590265,7.238394 H 17.087973 l -1.480648,5.593266 -0.635421,1.946685 -1.782643,0.08723 H 8.3780841 4.9770796 L 3.7102899,14.729682 3.0596403,12.662167 Z"
        />
      ) : (
        <path
          style={{ display: "inline", stroke: "none", strokWidth: 0.0846667 }}
          d="m 35.255859,0 c -0.145301,0.0033783 -0.293772,0.02138561 -0.445312,0.0546875 -2.16737,0.47628849 -3.582484,3.8641406 -4.759766,5.5175781 -3.63072,5.0988174 -6.715977,11.4649624 -11.074219,15.9531254 -2.369917,2.440671 -10.3590707,1.007812 -13.6113276,1.007812 -1.6514231,0 -4.1088685,-0.421257 -5.06250002,1.314453 -0.78198426,1.423042 0.14921824,3.347705 0.53320312,4.765625 1.070434,3.95232 2.2395272,7.881125 3.2851563,11.839844 1.2160666,4.603839 2.6210283,9.159446 3.8417968,13.759766 0.4873247,1.83648 0.7564689,4.532082 2.3105474,5.80664 2.620833,2.14944 9.145879,0.91211 12.371093,0.91211 h 24.960938 c 3.514242,0 8.135833,0.794343 11.519531,-0.181641 2.843187,-0.81984 3.097631,-4.459342 3.832031,-6.857422 2.19326,-7.16064 4.323116,-14.483287 6.087891,-21.759766 0.534425,-2.203841 3.007111,-6.864063 1.097656,-8.777343 -1.152302,-1.155137 -3.135915,-0.822266 -4.617187,-0.822266 -3.492473,0 -11.805916,1.515121 -14.234375,-1.298828 C 47.004275,16.267751 43.566449,10.073633 39.925781,4.6132812 38.920191,3.104821 37.435379,-0.05067454 35.255859,0 Z m -0.451171,6.8515625 h 0.960937 L 46.005859,22.533203 H 24.564453 Z M 5.6855469,27.332031 H 65.205078 l -5.710937,21.121094 -2.453125,7.349609 -6.875,0.330078 H 31.605469 18.484375 L 13.597656,55.619141 11.087891,47.8125 Z"
          transform="scale(0.26458333)"
        />
      )}
    </svg>
  );

  return { CartIcon };
})();

export default MaterialSvg;