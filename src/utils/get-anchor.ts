import slugify from '@sindresorhus/slugify';

export const getAnchor = (value: any) => {
  const isString = typeof value === 'string';

  return isString ? slugify(value) : '';
};
