import { type Entry } from './types'

export type ValidationOptions = {
	excludedCategories: string[]
	excludedPartsOfSpeech: string[]
	excludedTags: string[]
	excludedWords: string[]
	limitCharacters: boolean
	minLength: number
}

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
		(limitCharacters ? /^[\p{L}\p{Pd}'`‘’]+$/u.test(entry.word) : true) &&
		// The word's part of speech is not in the excluded list
		!excludedPartsOfSpeech.includes(entry.pos) &&
		// The word itself is not in the excluded list
		!excludedWords.includes(entry.word) &&
		// The word is not in an excluded category
		!entry.senses.some((sense) =>
			(sense.categories ?? []).some(
				(category) =>
					excludedCategories.includes(category.name) ||
					category.parents.some((parent) => excludedCategories.includes(parent)),
			),
		) &&
		// The word does not have an excluded tag
		!entry.senses.some((sense) => (sense.tags ?? []).some((tag) => excludedTags.includes(tag)))
	)
}
