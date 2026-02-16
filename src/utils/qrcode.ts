import QRCode from "qrcode";

export const genQR = async (
  userid: number
): Promise<string> => {
  try {

    const userUrl = `${process.env.WEB_URL_TEST}/userinfo/${userid}`;

    const qrDataUrl = await QRCode.toDataURL(userUrl, {
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
