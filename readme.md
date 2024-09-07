<!--+ Warning: Content inside HTML comment blocks was generated by mdat and may be overwritten. +-->

<!-- title -->

# @kitschpatrol/dict-en-wiktionary

<!-- /title -->

<!-- badges -->

[![NPM Package @kitschpatrol/dict-en-wiktionary](https://img.shields.io/npm/v/@kitschpatrol/dict-en-wiktionary.svg)](https://npmjs.com/package/@kitschpatrol/dict-en-wiktionary)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- /badges -->

<!-- short-description -->

**A highly permissive English dictionary sourced from Wiktionary for use with CSpell.**

<!-- /short-description -->

## Overview

This is a pre-built [CSpell](https://cspell.org/) dictionary with 800k+ English words sampled from the [Wiktionary](https://en.wiktionary.org/wiki/Wiktionary:Main_Page) project in July 2024.

## Getting started

### Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [cspell](https://github.com/streetsidesoftware/cspell)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) | `>= 2`  |

### Global Installation

To install globally:

```sh
npm install -g @kitschpatrol/dict-en-wiktionary
cspell link add @kitschpatrol/dict-en-wiktionary
```

To uninstall globally:

```sh
cspell link remove @kitschpatrol/dict-en-wiktionary
```

### Manual Installation

To install in a specific project:

```sh
npm install -d @kitschpatrol/dict-en-wiktionary
```

The `cspell-ext.json` file in this package should be added to the import section in your `cspell.json` configuration file.

```javascript
{
    // …
    "import": ["@kitschpatrol/dict-en-wiktionary/cspell-ext.json"],
    // …
}
```

### Implementation notes

This repository's structure is based on examples the [cspell-dicts](https://github.com/streetsidesoftware/cspell-dicts) repo.

No censorship and _almost_ no curation is performed when generating the dictionary file, with some minor exceptions:

- Certain Wiktionary categories, such as "Intentional Misspellings" are excluded.
- Some parts of speech, such as "symbol", are excluded.
- Certain Wiktionary tags, such as "archaic" are excluded.

See the [generate-dictionary.ts](/scripts/generate-dictionary.ts) script for additional
details.

My intention is to update this dictionary with the latest words from Wiktionary every quarter or two.

## Maintainers

@kitschpatrol

## Acknowledgments

### The CSpell project

Thanks to Jason Dent and [Street Side Software](https://streetsidesoftware.com/) for creating and maintaining the [CSpell](https://cspell.org/) project.

### Wiktionary

This CSpell dictionary uses data from [Wiktionary](https://www.wiktionary.org/), which is available under the [Creative Commons Attribution-ShareAlike License](https://creativecommons.org/licenses/by-sa/4.0/). Data sourced from Wiktionary is unmodified.

### Kaikki.org

Thanks to [Tatu Ylonen](https://ylonen.org) at [Kaikki.org](https://kaikki.org/dictionary/English/index.html) for providing pre-processed machine-readable versions of the Wiktionary data dumps.

<!-- contributing -->

## Contributing

[Issues](https://github.com/kitschpatrol/dict-en-wiktionary/issues) and pull requests are welcome.

<!-- /contributing -->

## License

This extension's (very small quantity of) code and (very large quantity of) dictionary data are shared under difference licenses:

### Extension source code

[MIT](license.txt)

### Wiktionary dictionary data

Dual-licensed under the Creative Commons Attribution-ShareAlike 4.0 International License ([CC-BY-SA)](https://en.wiktionary.org/wiki/Wiktionary:Text_of_Creative_Commons_Attribution-ShareAlike_4.0_International_License) and the GNU Free Documentation License ([GFDL](https://en.wiktionary.org/wiki/Wiktionary:Text_of_the_GNU_Free_Documentation_License)).

See the [full Wiktionary license text](https://en.wiktionary.org/wiki/Wiktionary:Copyrights).
