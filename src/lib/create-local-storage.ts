export const createLocalStorage = function <TState, TPersisted>(
    storageKey: string,
    serialize: (state: TState) => TPersisted,
    deserialize: (value: TPersisted) => TState
) {
    return {
        read: function (): TState {
            return deserialize(JSON.parse(localStorage.getItem(storageKey)!) as TPersisted);
        },
        write: function (state: TState): void {
            localStorage.setItem(storageKey, JSON.stringify(serialize(state)));
        },
    };
};
