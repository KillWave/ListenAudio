
function setState(newState) {
    this.state = {
        ...this.state,
        ...newState
    }
    this.listener(this.state);
  
}

function useCustom(useState) {
    const  [state,newListener] = useState(this.state);
    this.state = state;
    return [this.state, this.setState, () => {
        this.listener = newListener;
        return () => {
            this.listener= ()=>{}
        }
    }]
}
const useGlobalHook = (initalState, useState) => {
    const store = {
        state: initalState,
        listener: ()=>{}
    }
    store.setState = setState.bind(store);
    return useCustom.bind(store, useState);
}

export default useGlobalHook;