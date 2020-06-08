# typenv
[![codecov](https://codecov.io/gh/mcountryman/typenv/branch/master/graph/badge.svg)](https://codecov.io/gh/mcountryman/typenv)
![Build](https://github.com/mcountryman/typenv/workflows/Build/badge.svg)

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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what 
you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](LICENSE.md)