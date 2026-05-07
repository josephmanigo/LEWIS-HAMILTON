import React from "react";
import Link from "next/link";

interface FlipLinkProps {
  children: string;
  href: string;
  className?: string;
  onClick?: () => void;
}

export const FlipLink = ({ children, href, className = "", onClick }: FlipLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative block overflow-hidden whitespace-nowrap ${className}`}
      style={{
        lineHeight: 0.85,
      }}
    >
      <div className="flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex text-red-600">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </Link>
  );
};
