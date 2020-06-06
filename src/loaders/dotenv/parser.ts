
const PAIR = /^\s*((?!\s*=).*)\s*=\s*(.+)\s*$/;
const EMPTY = /^\s*$/;
const COMMENT = /^\s*#.+$/;
const LINE_BREAK = /\n|\r|\r\n/;

/**
 * Parse .env config file contents using spec defined at
 * https://smartmob-rfc.readthedocs.io/en/latest/2-dotenv.html
 */
export class DotEnvParser {
  public parse(content: string): any {
    // Split lines
    return content
      .split(LINE_BREAK)
      .reduce((result, line, lineNumber) => {
        // Skip empty lines
        if (EMPTY.test(line))
          return result;
        // Skip comment lines
        if (COMMENT.test(line))
          return result;

        const match = line.match(PAIR);
        if (!match) {
          // KVP not found, assuming bad format
          throw new Error(`Invalid line ${lineNumber}`)
        }

        // If KVP found append to result
        result[match[1].trim()] = match[2];
        return result;
      }, {})
    ;
  }
}