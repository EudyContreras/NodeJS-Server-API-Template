import 'styled-components'

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