import axios from "axios";

export async function downloadImage(url: string) {
  console.log(url);
  try {
    const res = await axios.get(url, {
      responseType: "blob",
      headers: {
        Accept: "image/*",
      },
    });

    console.log("image:", res);
  } catch (err) {
    console.log("download image faild:", err);
  }
}
