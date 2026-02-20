import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
	size?: "s" | "m" | "l";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const sizes = {
	s: "text-sm",
	m: "text-base",
	l: "test-lg",
};

function Button({ size = "m", children, ...props}: ButtonProps) {
	return (
		<button className={`cursor-pointer ${sizes[size]}`} {...props}>
			{children}
		</button>
	);
}

export default Button;
