# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Maintenance

- Fetch full Git history in CI and dependency-update workflows so README generation calculates the dictionary update date correctly.

## [1.6.1] - 2026-11-01

### Documentation

- Fix the README's dictionary-generation script link to use a relative repository path.

### Maintenance

- Refresh development dependencies and GitHub Actions, including CSpell tools 10.4, shared-config 8.14, and pnpm 12.16.1, and remove obsolete dependency-age exemptions.
- Change automated dependency-update pull requests from a weekly to a monthly schedule.
- Exclude loopback URLs from link checking and allow checks with no matching input.
- Move contributor skill management from a prepare script to pnpm workspace configuration and remove the Claude-directory exception from deep cleanup.

## [1.6.0] - 2026-10-07

### Changed

- Refresh the dictionary from Wiktionary's October 2026 data, bringing it to 936,599 entries.

### Documentation

- Document that Kaikki's processed dictionary dumps are deprecated but remain available, and reference the upstream tracking issue.

### Maintenance

- Update dictionary regeneration to preserve embedded Unicode line separators in JSONL records and skip blank lines.
- Upgrade development tooling to shared-config 8, TypeScript 6, and pnpm 12, with contributor Node.js requirements of `^24.16.0 || >=26.3.0`.
- Add scheduled and pull-request link checks for repository documentation and configured websites.
- Add a scheduled workflow that proposes dependency updates through pull requests.
- Validate release tags against the repository's default branch, use the triggering tag consistently, and switch local npm publishing to OTP authentication.
- Refresh contributor setup with VS Code lint/fix tasks, shared TypeScript configuration, and automatic skill synchronization during repository preparation.

## [1.5.0] - 2026-05-16

### Changed

- Refresh the dictionary from Wiktionary's May 2026 data, bringing it to 925,148 entries.
- Remove the package's declared Node.js engine restriction.

### Documentation

- Correct project-local installation to use `npm install -D`, fix README typos, and repair the dictionary license link formatting.
- Document contribution expectations and the tools used for linting, formatting, and README generation.

### Maintenance

- Refresh dictionary build and development tooling, including CSpell tools 10, shared-config 7.6, pnpm 11, and GitHub Actions.
- Correct npm publish token scoping and support release tags with or without a `v` prefix.
- Use portable file removal in the cleanup script and preserve local Claude configuration.

## [1.4.0] - 2026-04-06

### Changed

- Refresh the dictionary from Wiktionary's April 2026 data, bringing it to 920,169 entries.

### Maintenance

- Add Linux, macOS, and Windows CI for dictionary builds, linting, and smoke tests.
- Migrate to shared-config 7 and the `ksc` CLI, refresh development dependencies, and declare Node.js 22.18+ for contributor tooling.
- Refresh GitHub Actions, pin checkout actions, and tighten workflow permissions and credential handling.

## [1.3.0] - 2026-01-28

### Changed

- Refresh the dictionary from Wiktionary's January 2026 data, bringing it to 913,922 entries.

### Documentation

- Display exact dictionary counts and update dates in the README, generated automatically from the word list and Git history.

### Maintenance

- Refresh development dependencies and pnpm, migrate CSpell and Prettier configuration to TypeScript, and update editor autofix settings.

## [1.2.2] - 2025-12-06

### Maintenance

- Fix contributor dependency hoisting by moving shared-config hoist patterns from `.npmrc` into the pnpm workspace configuration.
- Refresh dictionary build and development dependencies and update pnpm to 10.24.

## [1.2.1] - 2025-11-05

### Documentation

- Correct the documented dictionary snapshot date to November 2025 and describe an intended update cadence of at least once a year.

## [1.2.0] - 2025-11-05

### Changed

- Refresh the dictionary from Wiktionary's November 2025 data, bringing it to 906,065 entries.

### Maintenance

- Refresh development dependencies, including CSpell tools 9 and bumpp 10, update pnpm, and correct the Node.js typings requirement.
- Switch local npm publishing from one-time passwords to token authentication.
- Upgrade repository metadata synchronization to the v3 action and simplify its workflow.

## [1.1.1] - 2025-03-04

### Changed

- Lower the declared Node.js minimum from 22 to 18 and remove the pnpm engine requirement.

### Maintenance

- Correct the repository URL in package metadata.
- Update shared-config to 5.2 and adjust lint rules for the dictionary download script.

## [1.1.0] - 2025-02-28

### Changed

- Refresh the dictionary from Wiktionary's February 2025 data, bringing it to 879,423 entries.

### Documentation

- Document the versioning policy, including how dictionary additions and removals can change spell-checking results.
- Correct the CSpell import example to use valid JSON.

### Maintenance

- Migrate contributor tooling to shared-config 5 and pnpm 10, adopt flat ESLint configuration and unused-code checks, and refresh build dependencies.

## [1.0.2] - 2024-09-14

### Maintenance

- Refresh development dependencies and pnpm, including TypeScript 5.6, and streamline contributor and release scripts.

## [1.0.1] - 2024-09-07

### Changed

- Tighten character filtering, removing 10 dictionary entries containing `ʽ`, `ǃ`, or `‘`.

### Documentation

- Clarify README terminology for the CSpell extension and its source-code licensing.

### Maintenance

- Update shared-config to 4.7.5 and refresh contributor lint configuration.

## [1.0.0] - 2024-09-07

### Added

- Ship a precompiled CSpell dictionary containing 857,755 English words and affixes from Wiktionary's July 2024 data, with minimal filtering.
- Expose CSpell configuration through the package root, `/cspell`, and `/cspell-ext.json`, enabling the dictionary for English and US English across all file types.
- Distribute the dictionary through npm without runtime dependencies, initially declaring Node.js 22+ and pnpm 9+ requirements.

### Documentation

- Document global and project-local installation, CSpell configuration, and requirements for CSpell 6+ and the VS Code Code Spell Checker extension 2+.
- Explain dictionary filtering, Wiktionary and Kaikki data provenance, and the separate licenses for source code and dictionary data.

### Maintenance

- Establish dictionary generation and compilation, smoke tests, linting, and automated release and repository metadata workflows.

[Unreleased]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.6.1...HEAD
[1.0.0]: https://github.com/kitschpatrol/dict-en-wiktionary/releases/tag/v1.0.0
[1.0.1]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.0.1...v1.0.2
[1.1.0]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.0.2...v1.1.0
[1.1.1]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.1.0...v1.1.1
[1.2.0]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.1.1...v1.2.0
[1.2.1]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.2.0...v1.2.1
[1.2.2]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.2.1...v1.2.2
[1.3.0]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.2.2...v1.3.0
[1.4.0]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.3.0...v1.4.0
[1.5.0]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.4.0...v1.5.0
[1.6.0]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.5.0...v1.6.0
[1.6.1]: https://github.com/kitschpatrol/dict-en-wiktionary/compare/v1.6.0...v1.6.1
