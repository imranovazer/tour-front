import React from "react";

interface buttonProps {
  title: string;
}
function AuthButton({ title }: buttonProps) {
  return (
    <button
      className="font-bold  max-w-[200px] bg-blue-600 text-white rounded-3xl px-5 py-2   shadow-sm"
      type="submit"
    >
      {title}
    </button>
  );
}

export default AuthButton;
