import fs from "fs";
import readline from "readline";

/**
 * Read JSONL one line at a time
 *
 * @param {string} filepath filepath
 * @returns {AsyncIterableIterator<T>}
 * @example
 *
 * const rl = readlines<T>(filepath)
 *
 * while (true) {
 *     const {value, done} = await rl.next()
 *     if (done) break;
 *     console.log(value); // value => T
 * }
 */
export async function * readlines<T>(filepath: string): AsyncIterableIterator<T> {
    const lineReader = readline.createInterface({input: fs.createReadStream(filepath)});

    for await (const line of lineReader) {
        yield JSON.parse(line);
    }
}

/**
 * Read JSONL multiple lines at a time
 *
 * @param {string} filepath filepath
 * @param {number} chunks maximum number of lines per chunk of lines
 * @returns {AsyncIterableIterator<T[]>}
 * @example
 *
 * const rl = readlinesChunk<T>(filepath, 100)
 *
 * while (true) {
 *     const {value, done} = await rl.next()
 *     if (done) break;
 *     console.log(value); // value => Array<T>
 * }
 */
export async function * readlinesChunk<T>(filepath: string, chunk: number) {
    let lines: T[] = [];
    const iter = await readlines<T>(filepath);
    while (true) {
        const {value, done} = await iter.next();
        if (done) { break; }
        lines.push(value);
        if (lines.length >= chunk) {
            yield lines;
            lines = [];
        }
    }
    if (lines.length) { yield lines; }
}
