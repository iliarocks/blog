import { InputHTMLAttributes } from "react";

type FileInputProps = {
	label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function FileInput({ label = "Choose a file", ...props }: FileInputProps) {
	return (
		<label className="cursor-pointer">
			{label}
			<input type="file" className="hidden" {...props} />
		</label>
	);
}

export default FileInput;
