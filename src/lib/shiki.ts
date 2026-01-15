import { createHighlighter } from 'shiki';
import theme from './shiki-theme.json';

const highlighter = createHighlighter({
  langs: ['tsx'],
  themes: [theme as any],
});

export const codeToHtml = async (code: string, options: any) =>
  (await highlighter).codeToHtml(code, options);
