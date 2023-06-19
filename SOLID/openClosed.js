//Open for Extension, Closed for Modification

const Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
  yellow: "yellow",
});

const Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
  huge: "huge",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

let apple = new Product("Apple", Color.green, Size.small);
let tree = new Product("Tree", Color.green, Size.large);
let house = new Product("House", Color.blue, Size.large);

let products = [apple, tree, house];

//BEFORE
/* Now let's say we have to filter these Products by Color */
class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }

  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }

  filterByColorAndSize(products, color, size) {
    return products.filter((p) => p.color === color && p.size === size);
  }
}

const filteredProducts = new ProductFilter();
console.log("****************  BEFORE ************************************");

console.log("Filter Products by Color - GREEN");
for (const fp of filteredProducts.filterByColor(products, Color.green)) {
  console.log(`${fp.name}`);
}

console.log("Filter Products by Size - LARGE");
for (const fp of filteredProducts.filterBySize(products, Size.large)) {
  console.log(`${fp.name}`);
}

console.log("Filter Products by Color -GREEN AND Size - LARGE");
for (const fp of filteredProducts.filterByColorAndSize(
  products,
  Color.green,
  Size.large
)) {
  console.log(`${fp.name}`);
}

/* Now let's say we have to add functionalities to filter by size, size and color, so 
this class keeps expanding and will keep increasing if more attributes are introduced 
3 attributes - 7 methods and so on...
*/

//AFTER
/**General Interface for a Specification */
class Specification {
  constructor() {}

  isSatisfied() {}
}

class ColorSpecification extends Specification {
  constructor(color) {
    super();
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification extends Specification {
  constructor(size) {
    super();
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

class AndSpecification extends Specification {
  constructor(...specs) {
    super();
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

class Filter {
  filter(item, spec) {
    return item.filter((x) => spec.isSatisfied(x));
  }
}

console.log("****************  AFTER ************************************");
let newfilter = new Filter();

console.log("Filter Products by Color - GREEN");
for (const fp of newfilter.filter(
  products,
  new ColorSpecification(Color.green)
)) {
  console.log(`${fp.name}`);
}

console.log("Filter Products by Size - LARGE");
for (const fp of newfilter.filter(
  products,
  new SizeSpecification(Size.large)
)) {
  console.log(`${fp.name}`);
}

console.log("Filter Products by Color -GREEN AND Size - LARGE");
let specs = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
);
for (const fp of newfilter.filter(products, specs)) {
  console.log(`${fp.name}`);
}
