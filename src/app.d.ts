type Teno = {
    title: string,
    pin?: number,
    body: string,
    date: number,
    id: string
}

type Context = {
    createteno(): () => void,
    openteno(teno: Teno): () => void,
    renameteno(teno: Teno): void,
    asktoremove(id: string): () => void,
    closeteno(id: string): () => void,
    keydown(e: KeyboardEvent): void,
    findteno(id: string, arr: Array<Teno | string>): Teno,
    lockmodal(teno: Teno): () => void,
    type: "electron" | "web",
    appVersion: string
}