import React from "react";
import classNames from "classnames";

export enum ButtonSize {
	Large = 'lg',
	Small = 'sm'
}

export enum ButtonType {
	Primary = 'primary',
	Default = 'default',
	Danger = 'danger',
	Link = 'link'
}

interface BaseButtonProps {
	className?: string;
	disabled?: boolean;
	size?: ButtonSize;
	btnType?: ButtonType;
	children: React.ReactNode;
	href?: string;
}

// intersections
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
// utility type, make all attributes optional
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
	const {
		btnType,
		disabled,
		className,  // user custom class
		size,
		children,
		href,
		...restprops
	} = props;
	// btn, btn-lg, btn-primary
	const classes = classNames('btn', className, {
		[`btn-${btnType}`]: btnType,
		[`btn-${size}`]: size,
		'disabled': (btnType === 'link') && disabled
	});
	if (btnType === ButtonType.Link && href) {
		return (
			<a
				className={classes}
				href={href}
				{...restprops}
			>
				{children}
			</a>
		)
	} else {
		return (
			<button
				className={classes}
				disabled={disabled}
				{...restprops}
			>
				{children}
			</button>
		)
	}
}

Button.defaultProps = {
	disabled: false,
	btnType: ButtonType.Default
}

export default Button;