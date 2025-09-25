// citizen/src/auth/PhoneLogin.tsx
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
  type ApplicationVerifier,
  type Auth,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

/**
 * Typed PhoneLogin for Vite+TS. Minimal casts are used where Firebase typings
 * and overload resolution confuse TypeScript. These casts are local and safe:
 * runtime values are actual Firebase objects created below.
 */

const PhoneLogin: React.FC = () => {
  const [phone, setPhone] = useState("+91");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure we have the firebase Auth object
    const authObj = auth as unknown as Auth;

    // If verifier already exists, reuse it
    if (!window.recaptchaVerifier) {
      const container = recaptchaRef.current ?? "recaptcha-container";

      // Because of overload resolution issues in some firebase type versions,
      // we narrow types using a tiny, local `as unknown as any` cast on the constructor.
      // This does NOT change runtime behavior: RecaptchaVerifier is created normally.
      // (We immediately type the result properly.)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const RecaptchaCtor: any = RecaptchaVerifier;
      const verifierInstance = new RecaptchaCtor(container, { size: "invisible" }, authObj);

      // Type it properly for the rest of the app
      window.recaptchaVerifier = verifierInstance as unknown as RecaptchaVerifier;
    }
  }, []);

  const sendOTP = async () => {
    setLoading(true);
    try {
      // defensive checks
      if (!window.recaptchaVerifier) {
        const authObj = auth as unknown as Auth;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const RecaptchaCtor: any = RecaptchaVerifier;
        window.recaptchaVerifier = new RecaptchaCtor(recaptchaRef.current ?? "recaptcha-container", { size: "invisible" }, authObj) as unknown as RecaptchaVerifier;
      }

      // Treat appVerifier as ApplicationVerifier for TS
      const appVerifier = window.recaptchaVerifier as unknown as ApplicationVerifier;

      // Correct order: (auth, phoneNumber, appVerifier)
      // cast auth to Auth to satisfy the signature
      const confirmation: ConfirmationResult = await signInWithPhoneNumber(auth as unknown as Auth, phone, appVerifier);

      window.confirmationResult = confirmation;
      navigate("/auth/verify");
    } catch (err: any) {
      console.error("sendOTP error:", err);
      alert("Failed to send OTP: " + (err?.message ?? String(err)));

      // try to recreate recaptcha if it failed
      try {
        // Clear if exists
        // @ts-ignore
        window.recaptchaVerifier?.clear?.();
        const authObj = auth as unknown as Auth;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const RecaptchaCtor: any = RecaptchaVerifier;
        window.recaptchaVerifier = new RecaptchaCtor(recaptchaRef.current ?? "recaptcha-container", { size: "invisible" }, authObj) as unknown as RecaptchaVerifier;
      } catch (e) {
        // ignore
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Phone login</h3>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+919812345678"
        style={{ marginRight: 8 }}
      />
      <button onClick={sendOTP} disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>

      <div id="recaptcha-container" ref={recaptchaRef} style={{ marginTop: 8 }} />
    </div>
  );
};

export default PhoneLogin;
