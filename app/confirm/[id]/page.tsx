// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";

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
// };

// const API_URL = "https://4aj9xibpc7.microcms.io/api/v1/menu";

// export default function ConfirmPage() {
//   const { id } = useParams(); // ← URLの[id]を取得
//   const router = useRouter();

//   const [item, setItem] = useState<MenuItem | null>(null);
//   const [quantity, setQuantity] = useState<number>(1);

//   useEffect(() => {
//     fetch(`${API_URL}/${id}`, {
//       headers: {
//         "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setItem(data));
//   }, [id]);

//   const addToCart = () => {
//     const saved = localStorage.getItem("cart");
//     const cart = saved ? JSON.parse(saved) : [];

//     const updated = [...cart, { ...item, quantity }];
//     localStorage.setItem("cart", JSON.stringify(updated));
//     router.push("/"); // ← トップページへ戻る
//   };

//   if (!item) return <p>Loading...</p>;

//   return (
//     <main style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
//       <h1>商品確認</h1>

//       {item.image && (
//         <Image
//           src={item.image.url}
//           alt={item.name}
//           width={item.image.width}
//           height={item.image.height}
//           style={{ borderRadius: "8px", marginBottom: "1rem" }}
//         />
//       )}

//       <h2>{item.name}</h2>
//       <p>{item.price}円</p>
//       {item.comment && <p>{item.comment}</p>}

//       <label>
//         数量：
//         <input
//           type="number"
//           min="1"
//           value={quantity}
//           onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
//           style={{ marginLeft: "1rem", width: "60px" }}
//         />
//       </label>

//       <div style={{ marginTop: "1.5rem" }}>
//         <button
//           onClick={addToCart}
//           style={{
//             padding: "0.5rem 1rem",
//             backgroundColor: "#2563eb",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             marginRight: "1rem",
//           }}
//         >
//           カートに追加
//         </button>
//         <button
//           onClick={() => router.push("/")}
//           style={{
//             padding: "0.5rem 1rem",
//             backgroundColor: "#ccc",
//             border: "none",
//             borderRadius: "4px",
//           }}
//         >
//           戻る
//         </button>
//       </div>
//     </main>
//   );
// }
