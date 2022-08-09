import { noopStorage, type StorageInterface } from '@macfja/svelte-persistent-store'
import ls from 'localstorage-slim';
ls.config.encrypt = true

function encryptedLocalStorage(key): StorageInterface<Teno[]> {
    if(!ls && !window.localStorage) return noopStorage()
    ls.config.secret = key
    return {
        getValue(k) {
            return ls.get<Teno[]>(k)
        },
        setValue(k, v) {
            ls.set(k, v)
        },
        deleteValue(k) {
            ls.remove(k)
        }
    }
}

export default encryptedLocalStorage;