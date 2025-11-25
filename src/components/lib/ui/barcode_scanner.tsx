// "use client";

// import { Html5QrcodeScanner } from "html5-qrcode";
// import { useEffect } from "react";

// export default function BarcodeScanner() {
//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner(
//       "qr-reader",
//       {
//         fps: 10,
//         qrbox: { width: 350, height: 600 }, // Visible scanning box size
//       },
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         console.log("Barcode:", decodedText);

//         fetch("/api/barcode", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ code: decodedText }),
//         });

//         scanner.clear();
//       },
//       (error) => {}
//     );
//   }, []);

//   return (
//     <div className="flex justify-center mt-4">
//       <div id="qr-reader" className="w-full max-w-xs border-4 border-green-500 rounded-xl shadow-lg" />
//     </div>
//   );
// }
