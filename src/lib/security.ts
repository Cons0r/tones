import { noopStorage, type StorageInterface } from "@macfja/svelte-persistent-store"
import * as SimpleCrypto from "simple-crypto-js"
import type { PlainData } from 'simple-crypto-js'
const SUPER_SECRET_KEY = import.meta.env.VITE_APP_SECURITY_KEY
const cryptoJS = new SimpleCrypto.SimpleCrypto(SUPER_SECRET_KEY)

function encrypt(obj: unknown): string {
    return cryptoJS.encrypt(JSON.stringify(obj))
}

function decrypt(str: string | null): PlainData {
    if(str === null || str.length === 0) return []
    return cryptoJS.decrypt(str || "")
}

function getBrowserStorage(browserStorage: Storage, listenExternalChanges = false) {
    const listeners: Array<{key: string, listener: (newValue: any) => void}> = []
    const listenerFunction = (event: StorageEvent) => {
        const eventKey = event.key
        if (event.storageArea === browserStorage) {
            listeners
                .filter(({key}) => key === eventKey)
                .forEach(({listener}) => {
                    listener(decrypt(event.newValue))
                })
        }
    }
    const connect = () => {
        if (listenExternalChanges && typeof window !== "undefined" && window?.addEventListener) {
            window.addEventListener("storage", listenerFunction)
        }
    }
    const disconnect = () => {
        if (listenExternalChanges && typeof window !== "undefined" && window?.removeEventListener) {
            window.removeEventListener("storage", listenerFunction)
        }
    }

    return {
        addListener(key: string, listener: (newValue: any) => void) {
            listeners.push({key, listener})
            if (listeners.length === 1) {
                connect()
            }
        },
        removeListener(key: string, listener: (newValue: any) => void) {
            const index = listeners.indexOf({key, listener})
            if (index !== -1) {
                listeners.splice(index, 1)
            }
            if (listeners.length === 0) {
                disconnect()
            }
        },
        getValue(key: string): any | null {
            const value = browserStorage.getItem(key)
            return decrypt(value)
        },
        deleteValue(key: string) {
            browserStorage.removeItem(key)
        },
        setValue(key: string, value: any) {
            browserStorage.setItem(key, encrypt(value))
        }
    }
}

function encryptedLocalStorage<T>(listenExternalChanges = false): StorageInterface<T> {
    if (typeof window !== "undefined" && window?.localStorage) {
        return getBrowserStorage(window.localStorage, listenExternalChanges)
    }
    // warnStorageNotFound("window.localStorage")
    return noopStorage()
}


export {
    encrypt,
    decrypt,
    encryptedLocalStorage
}

export default encryptedLocalStorage