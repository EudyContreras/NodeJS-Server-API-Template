import 'styled-components'
import { CSSProp } from 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        controls:{
            colors: {
                primary: string,
                secondary: string,
                hovered: string,
                pressed: string,
                icon: {
                    primary: string,
                    selected: string,
                    unselected: string,
                    disabled: string,
                }
            }
        },
        easing: {
            easeInInterpolator: string,
            easeOutInterpolator: string,
            standardInterpolator: string,
        }
    }
}

declare module 'react' {
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        css?: CSSProp<DefaultTheme>;
	}
}