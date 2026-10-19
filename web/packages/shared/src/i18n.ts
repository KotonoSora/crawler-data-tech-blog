// English-only product decision (BA 01 §4, spec 07 file 04 §5). The archive has a single
// operator and a single locale; there is deliberately no i18n framework, no locale switcher,
// and no translation catalog. `LOCALE_TAG` is the one place formatting can read a locale from,
// and `assertEnglishOnly` fails fast if a future change introduces another one.
//
// The shell document is `<html lang="en">`; the Playwright suite asserts that no Vietnamese
// strings are rendered anywhere.

export const SUPPORTED_LOCALES = ['en'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: SupportedLocale = 'en'
export const HTML_LANG = 'en'

/** BCP 47 tag used by Intl formatters. Always English, never the host machine locale. */
export const LOCALE_TAG = 'en-US'

export function assertEnglishOnly(locale: string): SupportedLocale {
  if ((SUPPORTED_LOCALES as readonly string[]).includes(locale)) {
    return locale as SupportedLocale
  }
  throw new Error(
    `Unsupported locale '${locale}'. This product is English-only; supported: ${SUPPORTED_LOCALES.join(', ')}.`,
  )
}
