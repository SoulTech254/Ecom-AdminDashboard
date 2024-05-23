import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Name cannot be empty."),
  price: z
    .number()
    .int()
    .nonnegative({ message: "Price must be a positive integer" }),
  images: z
    .array(z.string())
    .min(2, { message: "At least two images are required" }),
  SKU: z.string().min(1, "SKU cannot be empty."),
  description: z.string(),
  measurementUnit: z.string().min(1, "Measurement Unit cannot be empty."),
  size: z
    .number()
    .int()
    .nonnegative({ message: "Size must be a positive integer" }),
  category: z.object({
    level1: z.string().min(1, "Level1 Category cannot be empty."),
    level2: z.string().min(1, "Level2 Category cannot be empty."),
    level3: z.string().min(1, "Level3 Category cannot be empty."),
  }),
});

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  return (
    <form>
      <input type="file" {...register("images.1")} placeholder="Image 1" />
      {errors.images && errors.images[1] && (
        <span>{errors.images[1].message}</span>
      )}
      <input type="file" {...register("images.2")} placeholder="Image 2" />
      {errors.images && errors.images[2] && (
        <span>{errors.images[2].message}</span>
      )}

      <input type="text" {...register("name")} placeholder="Product Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <input type="number" {...register("price")} placeholder="Price" />
      {errors.price && <span>{errors.price.message}</span>}

      <input type="text" {...register("SKU")} placeholder="SKU" />
      {errors.SKU && <span>{errors.SKU.message}</span>}

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

      <input type="number" {...register("size")} placeholder="Size" />
      {errors.size && <span>{errors.size.message}</span>}

      <input
        type="text"
        {...register("category.level1")}
        placeholder="Category Level 1"
      />
      {errors.category && errors.category.level1 && (
        <span>{errors.category.level1.message}</span>
      )}

      <input
        type="text"
        {...register("category.level2")}
        placeholder="Category Level 2"
      />
      {errors.category && errors.category.level2 && (
        <span>{errors.category.level2.message}</span>
      )}

      <input
        type="text"
        {...register("category.level3")}
        placeholder="Category Level 3"
      />
      {errors.category && errors.category.level3 && (
        <span>{errors.category.level3.message}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProductForm;
