<h1 align="center">typenv</h1>
<p align="center"> 
  <a href="https://codecov.io/gh/mcountryman/typenv" target="_blank">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/mcountryman/typenv?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/typenv">
    <img alt="npm (tag)" src="https://img.shields.io/npm/v/typenv/latest?style=flat-square">
  </a>
  <a href="https://github.com/mcountryman/typenv/actions?query=workflow%3ABuild">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/mcountryman/typenv/Build?style=flat-square">
  </a>
</p>

Typenv intends to provide .env configuration with type safety in mind.

## Installation
Using yarn
```bash
yarn add typenv
```
Using npm
```bash
npm i typenv
```

## Usage
[Documentation](https://mcountryman.github.io/typenv/)

### Quick Start
> .env
```
DB_HOST=192.168.1.1
DB_PORT=1234
```
> src/database_config.ts
```typescript
import { load, loadSync, Key } from "typenv"; 

class DatabaseConfig {
  @Key("DB_HOST", "localhost")
  public hostname: string;

  @Key("DB_PORT", 5432)
  public port: number;
}

const config = await load(DatabaseConfig);
// or
const config = loadSync(DatabaseConfig);

console.log(config.hostname);
// > "192.168.1.1"
console.log(config.port);
// > 1234
```

### Configuration
Environment variables
* `DOTENV_CONFIG_PATH` - Location of `.env` file (defaults to `$CWD`)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what 
you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](LICENSE.md)
