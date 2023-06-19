const fs = require("fs");

class Journal {
  constructor() {
    this.entries = {};
    this.count = 0;
  }

  addEntry(text) {
    let idx = ++this.count;
    let entry = `${idx}: ${text}`;
    this.entries[idx] = entry;
    return idx;
  }

  removeEntry(idx) {
    delete this.entries[idx];
  }

  viewEntries() {
    return Object.values(this.entries).join("\n");
  }

  saveToFile(journal, filename) {
    fs.writeFileSync(journal, filename);
  }
}

class PersistenceManager {
  saveToFile(journal, filename) {
    fs.writeFileSync(journal, filename);
  }

  loadFromFile() {}

  loadFromURL() {}

  saveToURL() {}
}

let journal1 = new Journal();
journal1.addEntry("I woke at 7:00AM.");
journal1.addEntry("It was raining cats and dogs in the morning");
journal1.addEntry("I went to office");
journal1.removeEntry(2);
console.log(journal1.viewEntries());
