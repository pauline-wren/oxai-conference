import yaml from 'js-yaml'

/**
 * Parse a markdown file with YAML frontmatter.
 * Returns { data, content } where data is the parsed frontmatter
 * and content is the raw markdown body.
 */
export function parseMd(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw.trim() }
  const [, frontmatter, body] = match
  const data = yaml.load(frontmatter) || {}
  return { data, content: body.trim() }
}
