"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const LOGO_URL = "/images/logo.png";
const MENU_API_URL = "https://4aj9xibpc7.microcms.io/api/v1/menu";

type MenuItem = {
  id: string;
  name_ja: string;
  name_en: string;
  price: number;
  comment_ja?: string;
  comment_en?: string;
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
  const [language, setLanguage] = useState<"ja" | "en">("ja");

  // Fetch menu & restore cart
  useEffect(() => {
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
          category: assignCategory(item.name_ja),
        }));
        setMenu(parsedMenu);
      });

    const saved = localStorage.getItem("cart");
    if (saved) {
      const parsedCart = JSON.parse(saved).map((item: MenuItem) => ({
        ...item,
        quantity: Number(item.quantity) || 1,
      }));
      setCart(parsedCart);
    }
  }, []);

  const assignCategory = (name: string): string => {
    if (
      name.includes("カフェラテ") ||
      name.includes("エスプレッソ") ||
      name.includes("カフェモカ") ||
      name.includes("カプチーノ") ||
      name.includes("アメリカーノ") ||
      name.includes("ブレンドコーヒー")
    )
      return "飲み物";
    if (name.includes("ケーキ") || name.includes("デザート")) return "デザート";
    return "全て";
  };

  const increaseQuantity = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
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

  const categories =
    language === "ja"
      ? ["全て", "飲み物", "デザート"]
      : ["All", "Drinks", "Desserts"];

  const filteredMenu = selectedCategory
    ? menu.filter((item) =>
        selectedCategory === (language === "ja" ? "全て" : "All")
          ? true
          : item.category === selectedCategory
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
          <h1 className={styles.title}>
            {language === "ja" ? "メニュー一覧" : "Menu"}
          </h1>
        </div>

        {/* Language toggle */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <button
            style={{
              marginRight: "0.5rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              backgroundColor: language === "ja" ? "#4a2c2a" : "#a3bffa",
              color: language === "ja" ? "#fff" : "#4a2c2a",
              border: "none",
              borderRadius: "6px",
            }}
            onClick={() => setLanguage("ja")}
          >
            JP
          </button>
          <button
            style={{
              padding: "0.5rem 1rem",
              cursor: "pointer",
              backgroundColor: language === "en" ? "#4a2c2a" : "#a3bffa",
              color: language === "en" ? "#fff" : "#4a2c2a",
              border: "none",
              borderRadius: "6px",
            }}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
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
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image.url}
                    alt={language === "ja" ? item.name_ja : item.name_en}
                    width={250}
                    height={250}
                    className={styles.menuImage}
                  />
                </div>
              )}
              <p className={styles.name}>
                {language === "ja" ? item.name_ja : item.name_en} — {item.price}
                円
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
                {language === "ja" ? "追加" : "Add"}
              </button>
              {language === "ja"
                ? item.comment_ja && (
                    <p className={styles.comment}>{item.comment_ja}</p>
                  )
                : item.comment_en && (
                    <p className={styles.comment}>{item.comment_en}</p>
                  )}
              <hr className={styles.separator} />
            </li>
          ))}
        </ul>
      </main>

      <aside className={styles.cart}>
        <h2 className={styles.cartTitle}>
          {language === "ja" ? "注文状況" : "Cart"}
        </h2>
        {cart.length === 0 ? (
          <p className={styles.empty}>
            {language === "ja"
              ? "まだ注文はありません。"
              : "Your cart is empty."}
          </p>
        ) : (
          <>
            {cart.map((item, i) => (
              <div key={`${item.id}-${i}`} className={styles.cartItem}>
                {item.image && (
                  <Image
                    src={item.image.url}
                    alt={language === "ja" ? item.name_ja : item.name_en}
                    width={80}
                    height={80}
                    className={styles.cartImage}
                  />
                )}
                <p className={styles.cartName}>
                  {language === "ja" ? item.name_ja : item.name_en} ×{" "}
                  {Number(item.quantity) || 1} —{" "}
                  {item.price * (Number(item.quantity) || 1)}円
                </p>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(i)}
                >
                  {language === "ja" ? "削除" : "Remove"}
                </button>
              </div>
            ))}
            <p className={styles.total}>
              {language === "ja" ? "合計" : "Total"}: {totalAmount}円(
              {language === "ja" ? "税込" : "Tax included"})
            </p>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmOrder}
            >
              {language === "ja" ? "注文を確定する" : "Confirm Order"}
            </button>
            <button className={styles.clearCartButton} onClick={clearCart}>
              {language === "ja" ? "カートを全て削除" : "Clear Cart"}
            </button>
          </>
        )}
      </aside>

      {isConfirmed && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h1 className={styles.modalTitle}>
              {language === "ja"
                ? "ありがとうございました！またお越しください。"
                : "Thank you! Please come again."}
            </h1>
            <button className={styles.backButton} onClick={handleBackToMenu}>
              {language === "ja" ? "メニューに戻る" : "Back to Menu"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
