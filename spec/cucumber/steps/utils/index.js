import Chance from 'chance'
const chance = new Chance()

export function generateSampleData (type, valid = true) {
	switch (type) {
	case 'email':
		return valid ? chance.email() : chance.string()
	case 'password':
		return valid ? chance.string({ length: 13 }) : chance.string({ length: 5 })
	default:
		throw new Error('Unsupported data type')
	}
}
