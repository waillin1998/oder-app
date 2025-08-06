// "use client";

// import { useEffect } from "react";
// import Link from "next/link";

// export default function ThankYouPage() {
//   useEffect(() => {
//     // Clear cart from localStorage
//     localStorage.removeItem("cart");
//   }, []);

//   return (
//     <main style={{ textAlign: "center", padding: "2rem" }}>
//       <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
//         Thank you for your order!
//       </h1>
//       <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
//         Your order has been received.
//       </p>
//       <Link
//         href="/"
//         style={{
//           padding: "0.75rem 1.5rem",
//           backgroundColor: "#10b981",
//           color: "#fff",
//           borderRadius: "6px",
//           textDecoration: "none",
//           fontSize: "1rem",
//         }}
//       >
//         Return to Menu
//       </Link>
//     </main>
//   );
// }

// "use client";

// import Link from "next/link";
// import styles from "./page..module.css";

// export default function ThankYouPage() {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>
//         ありがとうございました！またお越しください。
//       </h1>
//       <Link href="/" className={styles.backButton}>
//         メニューに戻る
//       </Link>
//     </div>
//   );
// }
