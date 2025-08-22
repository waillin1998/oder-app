"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

type MenuItem = {
  id: string;
  name_ja: string;
  name_en: string;
  price: number;
  quantity?: number;
  image?: {
    url: string;
    width: number;
    height: number;
  };
};

export default function HistoryPage() {
  const [history, setHistory] = useState<MenuItem[][]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  return (
    <div className={styles.container}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Cafe Sora Logo"
            width={60}
            height={60}
          />
        </Link>
        <Link
          href="/"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#a3bffa",
            borderRadius: "6px",
            color: "#4a2c2a",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Back to Menu
        </Link>
      </nav>

      <main className={styles.menuList}>
        <h1 className={styles.title}>Order History</h1>

        {history.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No past orders.
          </p>
        ) : (
          history.map((order, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "2rem",
                padding: "1rem",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(74,44,42,0.1)",
              }}
            >
              <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
                Order #{idx + 1}
              </h2>
              {order.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.image && (
                    <Image
                      src={item.image.url}
                      alt={item.name_ja}
                      width={80}
                      height={80}
                      style={{ borderRadius: "8px" }}
                    />
                  )}
                  <p>
                    {item.name_ja} × {item.quantity} —{" "}
                    {item.price * (item.quantity || 1)}円
                  </p>
                </div>
              ))}
            </div>
          ))
        )}
      </main>
    </div>
  );
}
("use client");

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

type MenuItem = {
  id: string;
  name_ja: string;
  name_en: string;
  price: number;
  quantity?: number;
  image?: {
    url: string;
    width: number;
    height: number;
  };
};

export default function HistoryPage() {
  const [history, setHistory] = useState<MenuItem[][]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  return (
    <div className={styles.container}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Cafe Sora Logo"
            width={60}
            height={60}
          />
        </Link>
        <Link
          href="/"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#a3bffa",
            borderRadius: "6px",
            color: "#4a2c2a",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Back to Menu
        </Link>
      </nav>

      <main className={styles.menuList}>
        <h1 className={styles.title}>Order History</h1>

        {history.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No past orders.
          </p>
        ) : (
          history.map((order, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "2rem",
                padding: "1rem",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(74,44,42,0.1)",
              }}
            >
              <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
                Order #{idx + 1}
              </h2>
              {order.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.image && (
                    <Image
                      src={item.image.url}
                      alt={item.name_ja}
                      width={80}
                      height={80}
                      style={{ borderRadius: "8px" }}
                    />
                  )}
                  <p>
                    {item.name_ja} × {item.quantity} —{" "}
                    {item.price * (item.quantity || 1)}円
                  </p>
                </div>
              ))}
            </div>
          ))
        )}
      </main>
    </div>
  );
}
