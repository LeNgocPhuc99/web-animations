import { useMagneticButton } from "../interactions";

const MagneticButton = () => {
  const magnetic = useMagneticButton();

  return (
    <button
      className="inline-block cursor-pointer rounded-lg border border-white/15 bg-[#1a1a24] px-7 py-3 font-mono text-[13px] text-[#e8e8f0] transition hover:border-[#5b8dee] hover:bg-[#5b8dee] hover:text-white"
      type="button"
      {...magnetic}
    >
      magnetic
    </button>
  );
};

export default MagneticButton;
