export function createStaticParams(config) {
  return generateStaticParams.bind(config);
}
export async function generateStaticParams() {
  const { locales = [], param } = this;
  return locales.map(locale => ({ [param]: locale }));
}
