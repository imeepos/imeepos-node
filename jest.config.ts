import { config } from 'dotenv';
import { Config } from 'jest'
config()
const cfg: Config = {
    roots: ['<rootDir>/src', '<rootDir>/packages', '<rootDir>/tests'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
export default cfg;