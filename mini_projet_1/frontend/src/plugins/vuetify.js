// src/plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary:   '#C4D6B0',
                    secondary: '#477998',
                    accent:    '#F64740',
                    info:      '#291F1E',
                    error:     '#A3333D',
                    success:   '#C4D6B0',
                    warning:   '#F64740'
                }
            }
        }
    }
})
