import path from "path";
import { readlines, readlinesChunk } from "../";

const example = path.join(__dirname, "example.jsonl");

test("readlines", async () => {
    const rl = readlines<{name: string}>(example);
    let count = 0;
    while (true) {
        const {value, done} = await rl.next();
        if (done) { break; }
        expect(!!value.name).toBeTruthy();
        count += 1;
    }
    expect(count).toBe(4);
});

test("readlines", async () => {
    const rl = readlinesChunk<{name: string}>(example, 3);
    let count = 0;
    while (true) {
        const {value, done} = await rl.next();
        if (done) { break; }
        expect(!!value[0].name).toBeTruthy();
        count += 1;
    }
    expect(count).toBe(2);
});
