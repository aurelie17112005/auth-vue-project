import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary:   '#C4D6B0', // vert clair
                secondary: '#477998', // bleu
                accent:    '#F64740', // rouge vif
                info:      '#291F1E', // brun foncé
                error:     '#A3333D', // rouge sombre
                success:   '#C4D6B0', // réutilise le vert pour success
                warning:   '#F64740'  // réutilise le rouge vif pour warning
            }
        }
    }
})
