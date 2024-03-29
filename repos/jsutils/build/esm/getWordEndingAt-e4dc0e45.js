import { i as isStr } from './isStr-481ce69b.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { g as isUpperCase, h as isLowerCase } from './isQuoted-877344c4.js';
import { t as toStr$1 } from './toStr-0e5fe94c.js';
import { i as isNonNegative } from './isNonNegative-76ec0014.js';
import { i as isArr } from './isArr-a4420764.js';
import { i as isColl } from './isColl-15a1452b.js';
import { g as get } from './get-2e0bc293.js';

const buildPath = (...args) => {
  const built = args.reduce((path, arg) => {
    let str = toStr(arg);
    return `${path}${str && '/' + str || ''}`;
  }, '');
  return built.replace(/([^:\/]|^)\/{2,}/g, '$1/');
};

const mapString = (str, charMapper) => {
  if (!isStr(str)) return str;
  if (!isFunc(charMapper)) return str;
  let result = '';
  for (const char of str) {
    result += charMapper(char);
  }
  return result;
};

const delimitString = (str, delimiter, delimiters = ['-', '_', ' ']) => {
  if (!isStr(str)) return str;
  const isDelimiter = c => delimiters.some(del => del === c);
  let prevChar = '_';
  return mapString(str, char => {
    if (isDelimiter(char)) {
      prevChar = delimiter;
      return delimiter;
    }
    if (isUpperCase(char) && isLowerCase(prevChar) && !isDelimiter(prevChar)) {
      prevChar = char;
      return delimiter + char;
    }
    prevChar = char;
    return char;
  });
};

const snakeCase = str => {
  const underscored = delimitString(str, '_');
  return underscored.toLowerCase();
};

const capitalize = (str, lowercaseTail = true) => {
  if (!isStr(str) || !str[0]) return str;
  const tail = lowercaseTail ? str.slice(1).toLowerCase() : str.slice(1);
  return `${str[0].toUpperCase()}${tail}`;
};

const removeDot = string => {
  const noDot = string.indexOf('.') === 0 ? string.slice(1) : string;
  return noDot.indexOf('.') === noDot.length - 1 ? noDot.slice(0, -1) : noDot;
};

const cleanStr = str => {
  return str && removeDot(str).replace(/[-_]/gm, ' ') || str;
};

const camelCase = (str, compCase) => {
  return str && cleanStr(str).split(/[\s_-]/gm).reduce((cased, word, index) => {
    if (!word) return cased;
    cased += (index > 0 || compCase) && capitalize(word) || word.toLowerCase();
    return cased;
  }, '') || str;
};

const camelCasePath = path => {
  const split = path.split('.');
  const camelCasedSplit = split.map((str, idx) => idx > 0 ? capitalize(str, false) : str);
  return camelCasedSplit.length > 1 ? camelCasedSplit.join('') : path;
};

const containsStr = (str, substring, fromIndex) => {
  str = !isStr(str) && toStr$1(str) || str;
  substring = !isStr(substring) && toStr$1(substring) || substring;
  return str.indexOf(substring, fromIndex) !== -1;
};

const eitherStr = (str1, str2) => isStr(str1) && str1 || str2;

const uppercasePattern = /[A-Z]/g;
const msPattern = /^ms-/;
const hyphenCache = {};
const toHyphenLower = match => '-' + match.toLowerCase();
const hyphenator = rule => {
  if (hyphenCache.hasOwnProperty(rule)) return hyphenCache[rule];
  const hRule = rule.replace(uppercasePattern, toHyphenLower);
  return hyphenCache[rule] = msPattern.test(hRule) ? '-' + hRule : hRule;
};

const hashString = (str, maxLength) => {
  if (!isStr(str) || str.length == 0) return 0;
  str = str.split('').reverse().join('');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = `${Math.abs(hash & hash)}`;
  }
  return isNonNegative(maxLength) ? hash.slice(0, maxLength) : hash;
};

const parseJSON = (str, logErr = true) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    logErr && console.error(e.message);
    return null;
  }
};

const plural = str => {
  if (!str || !str.length) return str;
  return str[str.length - 1] !== 's' ? str + 's' : str;
};

const singular = str => {
  if (!str || !str.length) return str;
  return str[str.length - 1] === 's' ? str.slice(0, str.length - 1) : str;
};

const styleCase = str => {
  if (!isStr(str)) return str;
  const cased = camelCase(str);
  return `${cased[0].toLowerCase()}${cased.slice(1)}`;
};

const trainCase = str => isStr(str) && str.split(/(?=[A-Z])|[\s_-]/gm).join('-').toLowerCase() || str;

const wordCaps = str => {
  if (!isStr(str)) return str;
  let cleaned = cleanStr(str);
  return cleaned.split(' ').map(word => word && capitalize(word) || '').join(' ');
};

const spaceJoin = (original, toAdd) => {
  toAdd = isArr(toAdd) ? toAdd : [toAdd];
  return toAdd.reduce((joined, item) => {
    return isStr(item) ? `${joined ? joined + ' ' : ''}${item}`.trim() : joined;
  }, isStr(original) ? original : '');
};

const templateRx = (tempStr, data, fallback = '', rx) => {
  const orgRx = template.regex;
  template.regex = rx || /{{([^}]*)}}/g;
  const resp = template(tempStr, data, fallback);
  template.regex = orgRx;
  return resp;
};
const template = (tempStr, data, fallback = '') => {
  data = isColl(data) && data || {};
  const regex = template.regex || /\${(.*?)\}/g;
  return isStr(tempStr) ? tempStr.replace(regex, (match, exact) => {
    const path = (exact || match.substr(2, match.length - 3)).trim();
    const replaceWith = get(data, path, fallback);
    return isFunc(replaceWith) ? replaceWith(data, path, fallback) : replaceWith;
  }) : console.error(`template requires a string as the first argument`) || tempStr;
};

const validFilename = fileName => {
  if (!fileName) return false;
  const regex = /[<>:"/\\|?*\u0000-\u001F]/g;
  const windowsRegex = /^(con|prn|aux|nul|com\d|lpt\d)$/i;
  const periodRegex = /^\.\.?$/;
  return regex.test(fileName) || windowsRegex.test(fileName) || periodRegex.test(fileName) ? false : true;
};

const reverseStr = str => {
  if (!isStr(str)) return undefined;
  let reversed = '';
  for (let char of str) {
    reversed = char + reversed;
  }
  return reversed;
};

const getNearestDelimiterIndex = (text, index, delimiters = [' ']) => {
  const indices = delimiters.map(str => text.indexOf(str, index)).sort();
  return indices.find(idx => idx >= 0);
};
const getWordStartingAt = (text, index, delimiters = [' ']) => {
  const endingSpaceIdx = getNearestDelimiterIndex(text, index, delimiters);
  return text.substring(index, endingSpaceIdx === -1 ? text.length : endingSpaceIdx);
};

const getWordEndingAt = (text, index, delimiters = [' ']) => {
  const reversed = reverseStr(text);
  const reversedIndex = text.length - index;
  return reverseStr(getWordStartingAt(reversed, reversedIndex, delimiters));
};

export { getWordStartingAt as A, cleanStr as a, buildPath as b, camelCase as c, delimitString as d, capitalize as e, camelCasePath as f, containsStr as g, eitherStr as h, hyphenator as i, hashString as j, plural as k, singular as l, mapString as m, styleCase as n, spaceJoin as o, parseJSON as p, templateRx as q, removeDot as r, snakeCase as s, trainCase as t, template as u, validFilename as v, wordCaps as w, reverseStr as x, getWordEndingAt as y, getNearestDelimiterIndex as z };
//# sourceMappingURL=getWordEndingAt-e4dc0e45.js.map
