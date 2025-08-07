// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import styles from "./page.module.css";

// const MENU_API_URL = "https://4aj9xibpc7.microcms.io/api/v1/menu";

// type MenuItem = {
//   id: string;
//   name: string;
//   price: number;
//   comment?: string;
//   image?: {
//     url: string;
//     width: number;
//     height: number;
//   };
//   quantity?: number;
// };

// export default function MenuPage() {
//   const [menu, setMenu] = useState<MenuItem[]>([]);
//   const [cart, setCart] = useState<MenuItem[]>([]);
//   const [quantities, setQuantities] = useState<{ [id: string]: number }>({});

//   useEffect(() => {
//     // Fetch menu
//     fetch(MENU_API_URL, {
//       headers: {
//         "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         const parsedMenu = data.contents.map((item: any) => ({
//           ...item,
//           price: Number(item.price), // 👈 Convert to number here
//         }));
//         setMenu(parsedMenu);
//       });

//     // Restore cart
//     const saved = localStorage.getItem("cart");
//     if (saved) {
//       const parsedCart = JSON.parse(saved).map((item: MenuItem) => ({
//         ...item,
//         quantity: Number(item.quantity) || 1,
//       }));
//       setCart(parsedCart);
//     }
//   }, []);

//   // Quantity input handler
//   const handleQuantityChange = (id: string, qty: number) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: qty > 0 ? qty : 1,
//     }));
//   };

//   // Add these two functions inside MenuPage component, after useEffect
//   const increaseQuantity = (id: string) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 1) + 1,
//     }));
//   };

//   const decreaseQuantity = (id: string) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max((prev[id] || 1) - 1, 1),
//     }));
//   };

//   // Add to cart
//   const addToCart = (item: MenuItem) => {
//     const quantity = Number(quantities[item.id]) || 1;
//     const updated = [...cart, { ...item, quantity }];
//     setCart(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   // Remove item
//   const removeFromCart = (index: number) => {
//     const updated = [...cart];
//     updated.splice(index, 1);
//     setCart(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   // Clear cart
//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem("cart");
//   };

//   const totalAmount = cart.reduce(
//     (sum, item) => sum + item.price * (Number(item.quantity) || 1),
//     0
//   );

//   return (
//     <div className={styles.container}>
//       {/* Menu List */}
//       <main className={styles.menuList}>
//         <h1 className={styles.title}>メニュー一覧</h1>
//         <ul className={styles.list}>
//           {menu.map((item) => (
//             <li key={item.id} className={styles.item}>
//               {item.image && (
//                 <Image
//                   src={item.image.url}
//                   alt={item.name}
//                   width={item.image.width}
//                   height={item.image.height}
//                   className={styles.menuImage}
//                 />
//               )}
//               <p className={styles.name}>
//                 {item.name} — {item.price}円
//               </p>

//               <div className={styles.quantityControls}>
//                 <button
//                   onClick={() => decreaseQuantity(item.id)}
//                   className={styles.quantityButton}
//                 >
//                   -
//                 </button>
//                 <span className={styles.quantityDisplay}>
//                   {quantities[item.id] || 1}
//                 </span>
//                 <button
//                   onClick={() => increaseQuantity(item.id)}
//                   className={styles.quantityButton}
//                 >
//                   +
//                 </button>
//               </div>

//               <button
//                 className={styles.addButton}
//                 onClick={() => addToCart(item)}
//               >
//                 追加
//               </button>

//               {item.comment && <p className={styles.comment}>{item.comment}</p>}
//               <hr className={styles.separator} />
//             </li>
//           ))}
//         </ul>

//         <Link href="/cart" className={styles.checkoutLink}>
//           注文確認へ進む
//         </Link>
//       </main>

//       {/* Cart Section */}
//       <aside className={styles.cart}>
//         <h2 className={styles.cartTitle}>注文状況</h2>
//         {cart.length === 0 ? (
//           <p className={styles.empty}>まだ注文はありません。</p>
//         ) : (
//           <>
//             {cart.map((item, i) => (
//               <div key={`${item.id}-${i}`} className={styles.cartItem}>
//                 {item.image && (
//                   <Image
//                     src={item.image.url}
//                     alt={item.name}
//                     width={60}
//                     height={40}
//                     className={styles.cartImage}
//                   />
//                 )}
//                 <p className={styles.cartName}>
//                   {item.name} × {Number(item.quantity) || 1} —{" "}
//                   {item.price * (Number(item.quantity) || 1)}円
//                 </p>
//                 <button
//                   className={styles.removeButton}
//                   onClick={() => removeFromCart(i)}
//                 >
//                   削除
//                 </button>
//               </div>
//             ))}

//             <p className={styles.total}>合計: {totalAmount}円</p>

//             <button
//               className={styles.confirmButton}
//               onClick={() => {
//                 localStorage.removeItem("cart");
//                 setCart([]);
//                 window.location.href = "/thankyou";
//               }}
//             >
//               注文を確定する
//             </button>

//             <button className={styles.clearCartButton} onClick={clearCart}>
//               カートを全て削除
//             </button>
//           </>
//         )}
//       </aside>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

// Updated URL for the logo (place the edited logo as 'public/logo.png')
const LOGO_URL = "/images/logo.png";

const MENU_API_URL = "https://4aj9xibpc7.microcms.io/api/v1/menu";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  comment?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  quantity?: number;
  category?: string;
};

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Fetch menu
    fetch(MENU_API_URL, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const parsedMenu = data.contents.map((item: any) => ({
          ...item,
          price: Number(item.price),
          category: assignCategory(item.name), // Assign category based on name
        }));
        setMenu(parsedMenu);
      });

    // Restore cart
    const saved = localStorage.getItem("cart");
    if (saved) {
      const parsedCart = JSON.parse(saved).map((item: MenuItem) => ({
        ...item,
        quantity: Number(item.quantity) || 1,
      }));
      setCart(parsedCart);
    }
  }, []);

  // Function to assign categories based on item name
  const assignCategory = (name: string): string => {
    if (
      name.includes("カフェラテ") ||
      name.includes("エスプレッソ") ||
      name.includes("カフェモカ") ||
      name.includes("カプチーノ ") ||
      name.includes("アメリカーノ") ||
      name.includes("ブレンドコーヒー")
    )
      return "飲み物";
    if (name.includes("ケーキ") || name.includes("デザート")) return "デザート";
    return "全て"; // Default category
  };

  const increaseQuantity = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQuantity = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const addToCart = (item: MenuItem) => {
    const quantity = Number(quantities[item.id]) || 1;
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity! + quantity }
          : cartItem
      );
    } else {
      updatedCart = [...cart, { ...item, quantity }];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleConfirmOrder = () => {
    setIsConfirmed(true);
    localStorage.removeItem("cart");
    setCart([]);
  };

  const handleBackToMenu = () => {
    setIsConfirmed(false);
    setCart([]);
    setQuantities({});
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (Number(item.quantity) || 1),
    0
  );

  // Define fixed categories
  const categories = ["全て", "飲み物", "デザート"];

  // Filter menu items based on selected category
  const filteredMenu = selectedCategory
    ? menu.filter((item) =>
        selectedCategory === "全て" ? true : item.category === selectedCategory
      )
    : menu;

  return (
    <div className={styles.container}>
      <main className={styles.menuList}>
        <div className={styles.branding}>
          <Image
            src={LOGO_URL}
            alt="Cafe Sora Logo"
            width={100}
            height={100}
            className={styles.logo}
          />
          <h1 className={styles.title}>メニュー一覧</h1>
        </div>
        {/* Category Bar */}
        <div className={styles.categoryBar}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.activeCategory : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <ul className={styles.list}>
          {filteredMenu.map((item) => (
            <li key={item.id} className={styles.item}>
              {item.image && (
                <Image
                  src={item.image.url}
                  alt={item.name}
                  width={250}
                  height={250}
                  className={styles.menuImage}
                />
              )}
              <p className={styles.name}>
                {item.name} — {item.price}円
              </p>
              <div className={styles.quantityControls}>
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className={styles.quantityButton}
                >
                  -
                </button>
                <span className={styles.quantityDisplay}>
                  {quantities[item.id] || 1}
                </span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className={styles.quantityButton}
                >
                  +
                </button>
              </div>
              <button
                className={styles.addButton}
                onClick={() => addToCart(item)}
              >
                追加
              </button>
              {item.comment && <p className={styles.comment}>{item.comment}</p>}
              <hr className={styles.separator} />
            </li>
          ))}
        </ul>
      </main>
      <aside className={styles.cart}>
        <h2 className={styles.cartTitle}>注文状況</h2>
        {cart.length === 0 ? (
          <p className={styles.empty}>まだ注文はありません。</p>
        ) : (
          <>
            {cart.map((item, i) => (
              <div key={`${item.id}-${i}`} className={styles.cartItem}>
                {item.image && (
                  <Image
                    src={item.image.url}
                    alt={item.name}
                    width={80}
                    height={80}
                    className={styles.cartImage}
                  />
                )}
                <p className={styles.cartName}>
                  {item.name} × {Number(item.quantity) || 1} —{" "}
                  {item.price * (Number(item.quantity) || 1)}円
                </p>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(i)}
                >
                  削除
                </button>
              </div>
            ))}
            <p className={styles.total}>合計: {totalAmount}円(税込)</p>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmOrder}
            >
              注文を確定する
            </button>
            <button className={styles.clearCartButton} onClick={clearCart}>
              カートを全て削除
            </button>
          </>
        )}
      </aside>
      {isConfirmed && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h1 className={styles.modalTitle}>
              ありがとうございました！またお越しください。
            </h1>
            <button className={styles.backButton} onClick={handleBackToMenu}>
              メニューに戻る
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
