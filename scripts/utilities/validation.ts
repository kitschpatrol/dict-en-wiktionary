import type { Entry } from './types'

export type ValidationOptions = {
	excludedCategories: string[]
	excludedPartsOfSpeech: string[]
	excludedTags: string[]
	excludedWords: string[]
	limitCharacters: boolean
	minLength: number
}

const WORD_VALIDATION_REGEX = /^(?!.*[ʽǃ])[\p{L}\p{Pd}'`’]+$/v

/**
 * Returns true if a Wiktionary entry qualifies for inclusion in the dictionary.
 */
export function isValid(entry: Entry, options?: Partial<ValidationOptions>): boolean {
	// No validation by default
	const {
		excludedCategories = [],
		excludedPartsOfSpeech = [],
		excludedTags = [],
		excludedWords = [],
		limitCharacters = false,
		minLength = 0,
	} = options ?? {}

	return (
		// Length of the word is greater than the minimum length
		entry.word.length >= minLength &&
		// The word is not a symbol or determiner
		(!limitCharacters || WORD_VALIDATION_REGEX.test(entry.word)) &&
		// The word's part of speech is not in the excluded list
		!excludedPartsOfSpeech.includes(entry.pos) &&
		// The word itself is not in the excluded list
		!excludedWords.includes(entry.word) &&
		// The word is not in an excluded category
		entry.senses.every((sense) =>
			(sense.categories ?? []).every(
				(category) =>
					!excludedCategories.includes(category.name) &&
					category.parents.every((parent) => !excludedCategories.includes(parent)),
			),
		) &&
		// The word does not have an excluded tag
		entry.senses.every((sense) => (sense.tags ?? []).every((tag) => !excludedTags.includes(tag)))
	)
}
