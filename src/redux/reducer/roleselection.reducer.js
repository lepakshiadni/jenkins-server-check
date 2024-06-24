import { EMPLOYER, TRAINER } from '../action/roleselection.action'
let initialState = {
    role:''
}
let roleSelection = (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYER:
            return { role: "employer" }
        case TRAINER:
            return { role: "trainer" }
        default:
            return state
    }

}
export { roleSelection }