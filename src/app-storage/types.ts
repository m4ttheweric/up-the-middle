export interface IAppStorage {
   uiTheme: 'light' | 'dark';
}

//if adding to this, try to avoid changing nested object properties else we will need to extend our validation to look for them
export const DefaultAppStorageValues: IAppStorage = Object.freeze<IAppStorage>({
   uiTheme: 'light'
});

export type AppStorageKey = keyof IAppStorage;
