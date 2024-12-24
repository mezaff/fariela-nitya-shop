document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Beige", img: "product-1.jpg", price: 30000 },
      { id: 2, name: "Breeze", img: "product-2.jpg", price: 35000 },
      { id: 3, name: "Cloud", img: "product-3.jpg", price: 25000 },
      { id: 4, name: "Henna", img: "product-4.jpg", price: 30000 },
      { id: 5, name: "Leaf", img: "product-5.jpg", price: 32000 },
      { id: 6, name: "Lotus", img: "product-6.jpg", price: 27000 },
      { id: 7, name: "Midnight", img: "product-7.jpg", price: 40000 },
      { id: 8, name: "Onyx", img: "product-8.jpg", price: 45000 },
      { id: 9, name: "Safari", img: "product-9.jpg", price: 43000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          //jika barang ada
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudag ada, tambah quantity n total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      //ambil item yang akan di remove
      const cartItem = this.items.find((item) => item.id === id);

      //jika item lebih dari satu
      if (cartItem.quantity > 1) {
        //telusuri satu persatu
        this.items = this.items.map((item) => {
          //jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            //kurangi quantity dan total
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        //jika item hanya satu
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Konversi Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
