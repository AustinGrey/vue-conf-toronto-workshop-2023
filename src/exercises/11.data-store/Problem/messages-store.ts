import {reactive, toRefs} from "vue";
import useFakeData from "./useFakeData";

const state = reactive({
    messages: useFakeData().messages
});

export function useMessages(){
    const addMessage = (message, to: string) => {
        state.messages.unshift({
            id: state.messages.length + 1,
            from: 'You',
            to,
            content: message,
            time: new Date().toLocaleTimeString(),
        });
    };
    return {...toRefs(state), addMessage};
}