import strcmp from 'strcmp';

const distance = 0.95;
const wildcards = [
  ['&', 'and'],
  ['-'],
  ['remastered'],
  ['studio'],
  ['acoustic'],
  ['version'],
  [/^(i)/i]
]
.map(([a, b]) => {
  a = typeof a !== 'object' ? new RegExp(`(${a})`, 'ig') : a;
  return [a, b];
});


export default function stringsMatch(a, b) {
  if (!a || !b) return false;

  let items = [a, b].map(item => {
    item = item.toLowerCase();
    wildcards.forEach(([a, b = '']) => {
      item = item.replace(a, b).trim();
    });
    return item;
  });

  return strcmp.jaro(items[0], items[1]) >= distance;
}
