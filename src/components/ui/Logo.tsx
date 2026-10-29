import Image from "next/image";

type LogoProps = { size?: "header" | "micro" };

export default function Logo({ size = "header" }: LogoProps) {
  const dimensions = size === "micro"
    ? "h-[18px] w-[33px]"
    : "h-[49px] w-[90px] max-[680px]:h-[40px] max-[680px]:w-[74px]";
  const imageSizes = size === "micro" ? "33px" : "(max-width: 680px) 74px, 90px";

  return (
    <Image
      src="/logo/3mo.png"
      alt="3Mo logo"
      width={205}
      height={112}
      sizes={imageSizes}
      className={`shrink-0 object-contain object-left ${dimensions}`}
    />
  );
}
