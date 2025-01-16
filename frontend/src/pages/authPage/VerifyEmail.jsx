import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();
 
  

  const {error, isLoading,verifyEmail} = useAuthStore();

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      const numericCode = pastedCode.filter((char) => /^\d$/.test(char));

      for (let i = 0; i < 6; i++) {
        newCode[i] = numericCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRef.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(code);
    const verificationCode = code.join('');
   try {
    await verifyEmail(verificationCode);
    navigate("/");
    toast.success("Email verified successfully");
   } catch (error) {
    console.log(error);
   }
  };

  useEffect(() => {
    if(code.every(digit => digit !== '')){
        handleSubmit(new Event('submit'));
    }
  }, [code])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col">
        <p className="text-2xl font-bold justify-center flex">verify email</p>
        <p className="text-sm text-gray-500 justify-center flex pb-5">
          Enter the code sent to your email
        </p>

        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold text-black border-2 border-gray-400 rounded-lg focus:border-indigo-500 focus:outline-none"
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button className="bg-indigo-500 text-white p-3 rounded-lg w-full hover:bg-indigo-600 transition transform hover:scale-105">
              Verify Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
