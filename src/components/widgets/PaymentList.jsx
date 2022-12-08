import React from "react";

import PaymentSvg from "../svg-icons/Payment.module";

const { AmazonPayLogo, ApplePayLogo, DigitalPayLogos } = PaymentSvg;
const { GooglePayLogo, PayPalLogo, VisaLogo } = PaymentSvg;

const AcceptedPaymentTypes = () => (
  <ul className="payment-list">
    <li>
      <AmazonPayLogo className="pay-logo" backgroundClassName={"pay-logo-bg"} />
    </li>
    <li>
      <ApplePayLogo className="pay-logo" backgroundClassName={"pay-logo-bg"} />
    </li>
    <li>
      <DigitalPayLogos
        className="pay-logo"
        backgroundClassName={"pay-logo-bg"}
      />
    </li>
    <li>
      <GooglePayLogo className="pay-logo" backgroundClassName={"pay-logo-bg"} />
    </li>
    <li>
      <PayPalLogo className="pay-logo" backgroundClassName="pay-logo-bg" />
    </li>
    <li>
      <VisaLogo className="pay-logo" backgroundClassName={"pay-logo-bg"} />
    </li>
  </ul>
);

export default AcceptedPaymentTypes;
