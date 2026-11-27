async function main() {
  const { writeFileSync } = await import("node:fs");
  const placeholder = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAAAAAAAAAAA", "base64");
  const names = ["food-1", "food-2", "food-3", "events-1", "events-2", "events-3", "cakes-1", "cakes-3"];

  names.forEach((name) => writeFileSync(`public/images/gallery/${name}.jpg`, placeholder));
  console.log(`Created ${names.length} gallery placeholders`);
}

main();
