export class GameWriter {
    constructor() {
    }

    makeScriptJoinTable(tData) {
        const script = [];
        script.push({
            code: "_setupTable",
            data: tData
        })
        return script
    }
}