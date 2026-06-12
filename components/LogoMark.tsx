import Image from "next/image";

export function LogoMark({
  size = 44,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/logo.png"
      alt="SharpEleven"
      width={size}
      height={size}
      priority
      className={`pointer-events-none select-none ${className}`}
      style={{ display: "block", width: size, height: size }}
    />
  );
}
