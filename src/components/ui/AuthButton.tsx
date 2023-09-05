interface buttonProps {
  title: string;
  onClick: ((e: any) => Promise<void>) | any;
}
function AuthButton({ title, onClick }: buttonProps) {
  return (
    <button
      onClick={onClick}
      className="font-bold  max-w-[200px] bg-blue-600 text-white rounded-3xl px-5 py-2   shadow-sm"
      type="submit"
    >
      {title}
    </button>
  );
}

export default AuthButton;
