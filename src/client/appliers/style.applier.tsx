
import { join } from '../components/utililties/styling.utils';

export default class Styler {

	private styles: string[];
	private latest = true;

	constructor(...baseStyles: string[]) {
		this.styles = [...baseStyles];
	}
	
	append = (style: string, condition: boolean): Styler => {
		if (condition) this.styles.push(style);
		return this;
	};

	appendAndOr = (styleA: string, styleB: string, condition: boolean): Styler => {
		if (condition) {
			this.styles.push(styleA);
		} else {
			this.styles.push(styleB);
		}
		return this;
	};

	/**
	 * Appends a class to the chain of classes if the given condition
	 * is true and the last state evaluates to true. If the update state
	 * flag is left as true. The latest state will be updated with
	 * the value of the condition.
	 * @param style The class append to the chain.
	 * @param condition The condition that needs to be met in order to
	 * append the class to the chain.
	 * @param updateState Flag determining if the state should be updated.
	 * @returns The instance of this updater.
	 */
	appendWhen = (style: string, condition: boolean, updateState = true): Styler => {
		if (condition && this.latest) this.styles.push(style);
		if (updateState) {
			this.latest = condition;
		}
		return this;
	};

	getClasses = (): string => join(...this.styles);
}