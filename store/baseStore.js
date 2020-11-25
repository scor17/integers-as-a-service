const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const stat = util.promisify(fs.stat);
const path = require('path');

async function fileExists (path) {
  try {
    await stat(path);
    return true;
  } catch (err) {
    return false;
  }
}

class BaseStore {
  constructor (name, { storePath, initialPath }) {
    this.name = name;
    this.path = path.resolve(__dirname, storePath);
    this.initialPath = path.resolve(__dirname, initialPath);
  }

  async init () {
    try {
      if (await fileExists(this.path)) {
        return;
      }

      if (!await fileExists(this.initialPath)) {
        throw new Error(`Json definition for ${this.name} store is missing.`);
      }

      const data = await readFile(this.initialPath);
      const items = JSON.parse(data);
      await writeFile(this.path, JSON.stringify(items));
    } catch (err) {
      console.log(err);
      throw new Error(`Failed to initialize ${this.name} store.`);
    }
  }

  async read () {
    const buffer = await readFile(this.path);
    return JSON.parse(buffer.toString());
  }

  async write (content) {
    return writeFile(this.path, JSON.stringify(content));
  }
}

module.exports = BaseStore;
