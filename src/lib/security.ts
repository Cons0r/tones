import { noopStorage, type StorageInterface } from '@macfja/svelte-persistent-store'
import ls from 'localstorage-slim'
ls.config.encrypt = true

type KeyMap = Record<string, any>

function getBrokens(localStorage: typeof ls, keys: KeyMap) {
    let brokens: Array<string> = []
    Object.keys(keys).forEach(v => {
        try {
            localStorage.get(v)
        } catch {
            brokens.push(v)
        }
    })
    return brokens
}

function encryptedLocalStorage(key: number, defaults: KeyMap): StorageInterface<Teno[]> {
    if(!ls && !window.localStorage) return noopStorage()
    ls.config.secret = key
    let brokenValues = getBrokens(ls, defaults)
    brokenValues.forEach(v => {
        ls.set(v, defaults[v])
    })
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