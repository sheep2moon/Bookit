import Link from "next/link";
import React from "react";

type LinkButtonProps = {
  children: React.ReactNode;
  href: string;
};

const LinkButton = ({ href, children }: LinkButtonProps) => {
  return (
    <Link
      className="bg-primary px-6 py-4 font-semibold shadow-sm shadow-black/40"
      href={href}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
