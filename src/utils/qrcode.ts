import QRCode from "qrcode";

interface Payload {
  userid: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  role: string;
}

export const genQR = async (
  userid: number,
  username: string,
  firstname: string,
  lastname: string,
  role: string
): Promise<string> => {
  try {
    const payload: Payload & { userUrl: string } = {
      userid,
      username,
      firstname,
      lastname,
      role,
      userUrl: `${process.env.WEB_URL}/userinfo/${userid}`
    };

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
