import { describe, expect, it } from 'vitest'

import { assertEnglishOnly, DEFAULT_LOCALE, HTML_LANG, LOCALE_TAG, SUPPORTED_LOCALES } from './i18n'

// Guard for the English-only decision (BA 01 §4): the product must not grow a locale
// switcher or a second translation catalog. If a future change needs another locale,
// this test is the deliberate gate that has to be changed first.
describe('English-only locale', () => {
  it('supports exactly one locale: en', () => {
    expect(SUPPORTED_LOCALES).toEqual(['en'])
    expect(DEFAULT_LOCALE).toBe('en')
    expect(HTML_LANG).toBe('en')
    expect(LOCALE_TAG).toBe('en-US')
  })

  it('rejects every other locale', () => {
    for (const locale of ['vi', 'vi-VN', 'fr', 'ja-JP']) {
      expect(() => assertEnglishOnly(locale)).toThrowError(/English-only/)
    }
  })

  it('accepts en', () => {
    expect(assertEnglishOnly('en')).toBe('en')
  })
})
