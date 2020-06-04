
const PAIR = /^\s*((?!\s*=).*)\s*=\s*(.+)\s*$/;
const EMPTY = /^\s*$/;
const COMMENT = /^\s*#.+$/;
const LINE_BREAK = /\n|\r|\r\n/;

export class DotEnvParser {
  constructor(private readonly _content: string) {}

  public parse(): any {
    return this._content
      .split(LINE_BREAK)
      .reduce((result, line, lineNumber) => {
        if (EMPTY.test(line))
          return result;
        if (COMMENT.test(line))
          return result;

        const match = line.match(PAIR);
        if (!match) {
          throw new Error(`Invalid line ${lineNumber}`)
        }

        result[match[1].trim()] = match[2];
        return result;
      }, {})
    ;
  }
}