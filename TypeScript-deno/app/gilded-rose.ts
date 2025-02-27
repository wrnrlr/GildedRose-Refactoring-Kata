export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (item.name==='Sulfuras, Hand of Ragnaros') continue
      item.sellIn--
      item.quality = clamp(item.quality + getQualityDifference(item), 0, 50)
    }
    return this.items
  }
}

// Return by how much the quality of an item should increase or decrease
function getQualityDifference({name, sellIn, quality}: Item): number {
  switch (name) {
    // Ages Bries becomes better each day, doubely so after its expiration date
    case 'Aged Brie': return sellIn < 0 ? 2 : 1
    // Conjured Mana Cake becomes progressivaly worse closer to its expiration date
    case 'Conjured Mana Cake': return sellIn > 4 ? -2 : -4
    // A backstage pass becomes progressively more valuable closer to the date of the concert
    // but loses all value after the concert
    case 'Backstage passes to a TAFKAL80ETC concert':
      return sellIn < 0 ? -quality :
        sellIn < 5 ? 3 :
        sellIn < 10 ? 2 : 1
    // Every other product loses quality with each passing day, doubely so after its expiration date
    default: return sellIn > 0 ? -1 : -2
  }
}

const clamp = (val:number, min:number, max:number) => Math.min(Math.max(val, min), max)
