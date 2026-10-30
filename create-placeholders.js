const fs = require('fs');
const p = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAAAAAAAAAAA', 'base64');
const names = ['food-1','food-2','food-3','events-1','events-2','events-3','cakes-1','cakes-3','hampers-1','hampers-2'];
names.forEach(n => fs.writeFileSync('public/images/gallery/' + n + '.jpg', p));
console.log('Created ' + names.length + ' gallery placeholders');