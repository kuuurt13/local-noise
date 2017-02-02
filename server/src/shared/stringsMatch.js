import strcmp from 'strcmp';

const distance = 0.95;
const wildcards = [
  { a: '&', b: 'and' },
  { a: '-', b: '' }
];

export default function stringsMatch(a, b) {
  let items = [a, b].map(item => {
    item = item.toLowerCase();
    wildcards.forEach(w => {
      item = item.replace(w.a, w.b);
    });
    return item;
  });

  return strcmp.jaro(items[0], items[1]) >= distance;
}
