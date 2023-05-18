import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

type TopicsKeys = Exclude<keyof typeof ui[typeof defaultLang], `nav${string}` > extends `topics.${infer Key}` ? Key : 'This should never happen';

export function normalizeTopicsSlug(slug: string) {
  return slug.replace("en/", "").replace("es/", "") as TopicsKeys
}

export function normalizeSlug(slug: string) {
  return slug.replace("en/", "").replace("es/", "")
}