import QRCode from "qrcode";

interface Payload {
  id: number | string;
  username: string;
  role: string;
}

export const genQR = async (id: number | string, username: string, role: string): Promise<string> => {
  try {
    const payload: Payload = { id, username, role };

    const qrDataUrl = await QRCode.toDataURL(JSON.stringify(payload), {
      type: "image/png",
      width: 300,
      margin: 2,
      errorCorrectionLevel: "M",
    });

    return qrDataUrl;
  } catch (error) {
    console.error("QR generation error:", error);
    throw new Error("Failed to generate QR code");
  }
};