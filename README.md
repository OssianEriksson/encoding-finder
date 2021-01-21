# Encoding Finder

Encoding Finder is a web app for finding text encodings by

- Entering wrongly displayed characters along with what with what characters you think are correct, or
- Get a list of encodings which displays certain bytes as certain characters.

You can (hopefully) view it in action [here](https://dancis.se/tools/encoding-finder).

## Usage

When the server is not down, this app is hosted by the creator [here](https://dancis.se/tools/encoding-finder).
The tool is based on [iconv-lite](https://github.com/ashtuchkin/iconv-lite), which is what determines what [encodings are supported](https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings).

### Wrong Text Encoding?

Do you see `Ã¶` in your text where you think there shouldbe an `ö`?
Enter `Ã¶` into the left column oftext fields and `ö` on the right of the same row and try a search!
You can add multiple pairs of acutal and expeted strings/characters to narrow down the search.

### What Encoding Displays These Bytes as These Chars?

"hex" is a supported charset, so you can for example type in `8a` as the currently rendered text and `ä` as the char you expect.
The search will then tell you which text encodings display the byte `8a` as `ä`

## Getting Started

This is an example of how you may give instructions on setting up a copy of this project locally for development purposes.

### Prerequisites

This project is build with

* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)

### Installation

1. Clone the repo
```shell
git clone https://github.com/OssianEriksson/encoding-finder.git
```

2. Install NPM packages 
```shell
npm install
```

### Build

Build the app with
```shell
npm run build
```

### Deploy

After building the app, `dist` directory containing the built project can be hosted by static web server.

## Aknowledgements

- [iconv-lite](https://github.com/ashtuchkin/iconv-lite)

## Licence

This project is licensed under the MIT License - see the [LICENCE](LICENCE.txt) file for details
