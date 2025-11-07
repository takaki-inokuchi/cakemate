"use client";
type CakemenubuttonProps = {
  label: string;
  onClick: () => void;
};

const Cakemenubutton = ({ label, onClick }: CakemenubuttonProps) => {
  return (
    <div className="flex flex-col gap-10">
      <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 cursor-pointer text-white 
                 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 
                 p-4 text-2xl rounded-full hover:from-amber-700 hover:via-amber-700 hover:to-amber-700"
      >
        {label}
      </button>
    </div>
  );
};

export default Cakemenubutton;
