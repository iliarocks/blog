import { InputHTMLAttributes } from "react";

type TextInputProps = {
	placeholder?: string;
	onUpdate: (input: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

function TextInput({ placeholder, onUpdate, ...props }: TextInputProps) {
	return (
		<input
			type="text"
			placeholder={placeholder}
			className="p-xs bg-[var(--tertiary)]"
			onChange={(e) => onUpdate(e.currentTarget.value)}
			{...props}
		/>
	);
}

export default TextInput;
