export const createLocalStorage = function <TState, TPersisted>(
    storageKey: string,
    serialize: (state: TState) => TPersisted,
    deserialize: (value: TPersisted) => TState,
    initState: TState
) {
    const read = function (): TState {
        const serialized = localStorage.getItem(storageKey);
        if (serialized === null) throw new Error(`Missing localStorage entry for key "${storageKey}"`);
        return deserialize(JSON.parse(serialized) as TPersisted);
    };

    const write = function (state: TState): void {
        localStorage.setItem(storageKey, JSON.stringify(serialize(state)));
    };

    try {
        read();
    } catch {
        write(initState);
    }

    return {read, write};
};
