
import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import colors from './foundations/colors';
import typography from './foundations/typography';
import semanticTokens from './styles/semanticTokens';
import Button from './components/button';
import Badge from './components/badge';
import globalStyles from "./styles/globalStyles";

// Theme configuration
const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false
};

// Extend Chakra theme
const theme = extendTheme({
    config,
    colors,
    ...typography,
    // ...globalStyles,
    // semanticTokens
    components: {
        Button,
        // Badge,
    },
});

export default theme;


// import { extendTheme, ThemeConfig } from '@chakra-ui/react';
// import { lightModeColors, darkModeColors } from './colors';
//
// const config: ThemeConfig = {
//     initialColorMode: 'dark',
//     useSystemColorMode: true,
// };
//
// const theme = extendTheme({
//     config,
//     colors: {
//         light: lightModeColors,
//         dark: darkModeColors,
//         customPurple: {
//             50: '#f4eafa',
//             100: '#dbbef3',
//             200: '#c091ec',
//             300: '#a464e5',
//             400: '#8940df',
//             500: '#6f1bd8', // Primary color
//             600: '#5814ad',
//             700: '#420e82',
//             800: '#2b0857',
//             900: '#15042c',
//         },
//     },
//     semanticTokens: {
//         colors: {
//             background: {
//                 default: lightModeColors.background,
//                 _dark: darkModeColors.background,
//             },
//             text: {
//                 default: lightModeColors.text,
//                 _dark: darkModeColors.text,
//             },
//             primary: {
//                 default: lightModeColors.primary[500],
//                 _dark: darkModeColors.primary[500],
//             },
//         },
//     },
//     fonts: {
//         body: `"Rajdhani", sans-serif`,
//         heading: `"Rajdhani", sans-serif`,
//         mono: `"Fira Code", monospace`,
//     },
//     fontWeights: {
//         normal: 400,
//         medium: 500,
//         bold: 700,
//     },
//     fontSizes: {
//         sm: '0.8rem',
//         md: '1rem',
//         lg: '1.25rem',
//     },
//     space: {
//         px: '1px',
//         sm: '4px',
//         md: '8px',
//         lg: '16px',
//         xl: '24px',
//     },
//     breakpoints: {
//         sm: '30em',
//         md: '48em',
//         lg: '62em',
//         xl: '80em',
//     },
//     components: {
//         Button: {
//             baseStyle: {
//                 borderRadius: '8px',
//             },
//             variants: {
//
//             },
//         },
//     },
//     styles: {
//         global: {
//             body: {
//                 bg: 'background',
//                 color: 'text',
//             },
//             a: {
//                 color: 'primary',
//                 _hover: {
//                     textDecoration: 'underline',
//                 },
//             },
//         },
//     },
//     layerStyles: {
//         card: {
//             bg: 'background',
//             boxShadow: 'lg',
//             borderRadius: 'md',
//             padding: '4',
//         },
//     },
//     textStyles: {
//         subtitle: {
//             fontSize: 'lg',
//             fontWeight: 'medium',
//             color: 'text',
//         },
//     },
// });
//
// export default theme;