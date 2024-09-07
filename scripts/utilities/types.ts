type Sense = {
	categories?: Category[]
	tags?: string[]
}

type Category = {
	// Not useful... only four values
	// kind: string
	name: string
	parents: string[]
}

export type Entry = {
	// Not useful... always "English"
	// lang: string
	// Not useful... always "en"
	// lang_code: string
	pos: string
	senses: Sense[]
	word: string
}
