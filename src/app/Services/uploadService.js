import { axiosInstance } from "@utils/Axios";

const convertBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const uploadImage = async (imageFile) => {
  const base64 = await convertBase64(imageFile);

  var url;
  await axiosInstance.post("services/uploadImage", { image: base64 }).then((res) => {
    url = res;
  });
  return { url };
};

// function uploadMultipleImages(images) {

//   axios
//     .post("http://localhost:5000/uploadMultipleImages", { images })
//     .then((res) => {
//       setUrl(res.data);
//       alert("Image uploaded Succesfully");
//     })
//     .then(() => setLoading(false))
// }
export { uploadImage };
