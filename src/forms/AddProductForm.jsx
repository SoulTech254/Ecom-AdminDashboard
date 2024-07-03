import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../config/firebase";
import { Upload } from "lucide-react";
import Loader from "@/components/Loader";
import { toast } from "sonner";

const formSchema = z.object({
  productName: z.string().min(1, "name cannot be empty."),
  price: z.coerce.number(),
  discountPrice: z.coerce.number(),
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

  console.log(files);
  console.log(images);

  useEffect(() => {
    setImages(img);
  }, [img]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    if (selectedFiles.length > 0) {
      handleImageSubmit(selectedFiles);
    }
  };

  const handleImageSubmit = async (selectedFiles) => {
    if (selectedFiles.length + images.length <= 5) {
      const promises = selectedFiles.map((file) => storeImage(file));
      const urls = await Promise.all(promises);
      setImages((prevImages) => [...prevImages, ...urls]);
      setFiles([]);
    } else {
      toast("You can only upload a maximum of 5 images.");
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
    <form
      onSubmit={handleSubmit(onSave)}
      className="min-h-screen bg-background flex flex-wrap gap-4 justify-center pt-4"
    >
      {/* First Column */}
      <div className="flex flex-col items-center bg-white m-1 pb-2 rounded-lg w-[350px] h-fit gap-2 border-2 border-slate-200">
        <h1 className="font-semibold text-2xl w-full mb-2 p-3 self-start border-b-2 border-slate-200">
          Product Image
        </h1>
        <input
          onChange={handleFileChange}
          className="p-3 w-full hidden"
          type="file"
          id="images"
          accept="image/*"
          multiple
        />
        {errors.images && <span>{errors.images.message}</span>}
        <div className="flex flex-wrap justify-center">
          {images &&
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                className="rounded-lg w-[120px] h-[120px] object-cover m-2"
                alt="Product"
              />
            ))}
        </div>
        <button
          type="button"
          onClick={() => document.getElementById("images").click()}
          className="flex flex-row justify-center bg-primary text-white p-2 rounded-lg m-4 focus:scale-95 hover:opacity-95"
        >
          <Upload className="h-6 w-5" />{" "}
          <span className="ml-2 capitalize">Add & Upload</span>
        </button>
      </div>

      {/* Second Column */}
      <div className="flex flex-col items-left bg-white m-1  rounded-lg w-[500px] h-fit border-2 border-slate-200">
        <h1 className="font-semibold text-2xl mb-2 p-3 w-full self-start border-b-2 border-slate-200">
          Product Details
        </h1>
        <div className="px-4 py-1 ">
          <label htmlFor="productName" className="block capitalize">
            Product name
          </label>
          <input
            id="productName"
            type="text"
            {...register("productName")}
            placeholder="Enter product name"
            className="w-1/2 border outline-none focus:outline-none p-2 rounded-md "
          />
          {errors.productName && (
            <span className="text-red-500 font-bold text-sm">
              {errors.productName.message}
            </span>
          )}
        </div>

        <div className="flex flex-row items-center justify-between bg-white rounded-lg gap-3 px-4 py-1">
          <div className="w-1/2">
            <label htmlFor="price" className="block capitalize">
              Price
            </label>
            <input
              id="price"
              type="number"
              {...register("price")}
              placeholder="Price"
              className="w-full border outline-none focus:outline-none p-2 rounded-md  no-arrows"
            />
            {errors.price && (
              <span className="text-red-500 font-bold text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
          <div className="w-1/2">
            <label htmlFor="discount" className="block capitalize">
              Discount
            </label>
            <input
              id="discount"
              type="number"
              {...register("discountPrice")}
              placeholder="Discount Price"
              className="w-full border outline-none focus:outline-none p-2 rounded-md  no-arrows"
            />
          </div>
        </div>

        <div className="flex flex-row w items-center justify-between gap-3 bg-white px-4 py-1">
          <div className="w-1/2">
            <label htmlFor="SKU" className="block capitalize">
              SKU (Stock Keeping Unit)
            </label>
            <input
              id="SKU"
              type="text"
              {...register("SKU")}
              placeholder="SKU"
              className="w-full border outline-none focus:outline-none p-2 rounded-md  "
            />
            {errors.SKU && (
              <span className="text-red-500 font-bold text-sm">
                {errors.SKU.message}
              </span>
            )}
          </div>
          <div className="w-1/2">
            <label htmlFor="brand" className="block">
              Brand
            </label>
            <input
              id="brand"
              type="text"
              {...register("brand")}
              placeholder="Brand"
              className="w-full border outline-none focus:outline-none p-2 rounded-md "
            />
            {errors.brand && (
              <span className="text-red-500 font-bold text-sm">
                {errors.brand.message}
              </span>
            )}
          </div>
        </div>

        <div className="items-left bg-white flex flex-col px-4 py-1">
          <label htmlFor="description" className="block capitalize">
            Description
          </label>
          <textarea
            id="description"
            type="text"
            rows={3}
            {...register("description")}
            placeholder="Description"
            className="w-full border outline-none focus:outline-none p-2 rounded-md  "
          ></textarea>
          {errors.description && (
            <span className="text-red-500 font-bold text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex flex-row items-center justify-between gap-3 px-4 py-1">
          <div className="w-1/2">
            <label htmlFor="size" className="block capitalize">
              Size
            </label>
            <input
              id="size"
              type="number"
              {...register("size")}
              placeholder="Size"
              className="w-full border outline-none focus:outline-none p-2 rounded-md  no-arrows"
            />
            {errors.size && (
              <span className="text-red-500 font-bold text-sm">
                {errors.size.message}
              </span>
            )}
          </div>
          <div className="w-1/2">
            <label htmlFor="measurementUnit" className="block">
              Measurement Unit
            </label>
            <input
              id="measurementUnit"
              type="text"
              {...register("measurementUnit")}
              placeholder="Measurement Unit"
              className="w-full border outline-none focus:outline-none p-2 rounded-md  no-arrows"
            />
            {errors.measurementUnit && (
              <span className="text-red-500 font-bold text-sm">
                {errors.measurementUnit.message}
              </span>
            )}
          </div>
        </div>

        <div className="px-4 py-1">
          <div className="text-left capitalize block text-[16px] ">
            Category
          </div>
          <div className="flex flex-row gap-3 items-left bg-white  justify-between ">
            <div className="w-1/3">
              <input
                type="text"
                {...register("category.level_1_name")}
                placeholder="Level 1"
                className="w-full rounded-md border p-2"
              />
              {errors.category && errors.category.level_1_name && (
                <span className="text-red-500 font-bold text-sm">
                  {errors.category.level_1_name.message}
                </span>
              )}
            </div>
            <div className="w-1/3">
              <input
                type="text"
                {...register("category.level_2_name")}
                placeholder="Level 2"
                className="w-full rounded-md border p-2"
              />
              {errors.category && errors.category.level_2_name && (
                <span className="text-red-500 font-bold text-sm">
                  {errors.category.level_2_name.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("category.level_3_name")}
                placeholder="Level 3"
                className="w-full rounded-md border p-2"
              />
              {errors.category && errors.category.level_3_name && (
                <span className="text-red-500 font-bold text-sm">
                  {errors.category.level_3_name.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-white p-3 rounded-lg m-4  block focus:scale-95 hover:opacity-95"
        >
          {isLoading ? <Loader /> : action}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
