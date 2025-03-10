# comick-downloader

## Usage

```bash
ck-dl --help
```

```bash
ck-dl --seriesUrl "https://url-to-series.com/" --outputPath "/path/to/cbz/location" --createXml 
```

**--createXml** is optional. If present, a ComicInfo.xml file will be created in the cbz archive. Still in development.

## Bun commands

### To install dependencies:

```bash
bun install
```

### To run:

```bash
bun run index.ts --seriesUrl "https://url-to-series.com/" --outputPath "/path/to/cbz/location" --createXml
```

**--createXml** is optional. If present, a ComicInfo.xml file will be created in the cbz archive. Still in development.

### To compile to binary:

```bash
bun run compile 
```

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
