import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct } from "../api/ProductApi";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../config/firebase";
import { Loader } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  productName: z.string().min(1, "name cannot be empty."),
  price: z.coerce.number(),
  SKU: z.string().min(1, "SKU cannot be empty."),
  description: z.string(),
  measurementUnit: z.string().min(1, "Measurement Unit cannot be empty."),
  size: z.coerce.number(),
  brand: z.string().min(1, "Brand cannot be empty."),
  category: z.object({
    level_1_name: z.string().min(1, "Level 1 Category cannot be empty."),
    level_2_name: z.string().min(1, "Level 2 Category cannot be empty."),
    level_3_name: z.string().min(1, "level 3 Category cannot be empty."),
  }),
});

//TODO: 1. extract API hook to individual pages
//2.Change button type to upload or delete based on the action

const AddProductForm = ({
  onSubmit,
  action,
  isLoading,
  defaultValues,
  img,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSave = (data) => {
    const formData = { ...data, images };
    console.log(formData);
    onSubmit(formData);
  };

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  console.log(images);

  useEffect(() => {
    setImages(img);
  }, [img]);

  const handleImageSubmit = (e) => {
    console.log(files);
    if (files.length > 0 && files.length + images.length < 6) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setImages(urls);
      });
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  return (
    <form onSubmit={handleSubmit(onSave)}>
      <input
        onChange={(e) => setFiles(e.target.files)}
        className="p-3 border border-gray-300 rounded w-full"
        type="file"
        id="images"
        accept="image/*"
        multiple
      />
      {errors.images && <span>{errors.images.message}</span>}
      <button type="button" onClick={handleImageSubmit}>
        Upload
      </button>
      {images && images.map((image) => <img src={image} />)}
      <input
        type="text"
        {...register("productName")}
        placeholder="Product name"
      />
      {errors.name && <span>{errors.name.message}</span>}

      <input type="number" {...register("price")} placeholder="Price" />
      {errors.price && <span>{errors.price.message}</span>}

      <input type="text" {...register("SKU")} placeholder="SKU" />
      {errors.SKU && <span>{errors.SKU.message}</span>}
      <input type="text" {...register("brand")} placeholder="Brand" />
      {errors.brand && <span>{errors.brand.message}</span>}

      <input
        type="text"
        {...register("description")}
        placeholder="Description"
      />
      {errors.description && <span>{errors.description.message}</span>}

      <input
        type="text"
        {...register("measurementUnit")}
        placeholder="Measurement Unit"
      />
      {errors.measurementUnit && <span>{errors.measurementUnit.message}</span>}

      <input
        type="number"
        {...register("size", { valueAsNumber: true })}
        placeholder="Size"
      />
      {errors.size && <span>{errors.size.message}</span>}

      <input
        type="text"
        {...register("category.level_1_name")}
        placeholder="Category Level 1"
      />
      {errors.category && errors.category.level_1_name && (
        <span>{errors.category.level_1_name.message}</span>
      )}

      <input
        type="text"
        {...register("category.level_2_name")}
        placeholder="Category Level 2"
      />
      {errors.category && errors.category.leve_2_name && (
        <span>{errors.category.leve_2_name.message}</span>
      )}

      <input
        type="text"
        {...register("category.level_3_name")}
        placeholder="Category Level 3"
      />
      {errors.category && errors.category.level_3_name && (
        <span>{errors.category.level_3_name.message}</span>
      )}
      <button type="submit">{isLoading ? <Loader /> : action}</button>
    </form>
  );
};

export default AddProductForm;
