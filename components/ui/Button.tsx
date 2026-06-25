import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const buttonClass = `${styles.btn} ${styles[variant]} ${
    props.disabled ? styles.disabled : ""
  } ${className}`.trim();

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}
