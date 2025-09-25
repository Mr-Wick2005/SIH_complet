// citizen/src/auth/VerifyOTP.tsx
import React, { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const VerifyOTP: React.FC = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const verifyCode = async () => {
    try {
      if (!window.confirmationResult) throw new Error("No confirmation result — resend OTP.");
      const result = await window.confirmationResult.confirm(code);
      const user = result.user;
      const phone = user.phoneNumber ?? null; // <-- use phoneNumber
      // optional: create a Firestore user doc (guard phoneNumber if null)
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          phone: phone,
          createdAt: new Date().toISOString(),
          role: "citizen",
        });
      }
      navigate("/citizen/dashboard");
    } catch (err: any) {
      console.error("verifyCode error:", err);
      alert("Failed to verify OTP: " + (err?.message || err));
    }
  };

  return (
    <div>
      <h3>Verify code</h3>
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" />
      <button onClick={verifyCode}>Verify</button>
    </div>
  );
};

export default VerifyOTP;
