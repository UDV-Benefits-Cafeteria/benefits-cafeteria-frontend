import { ChangeEvent, type FC, useEffect, useState } from "react";

import { BENEFIT_PLACEHOLDER } from "@shared/assets/imageConsts";
import { Image } from "@shared/ui/Image/Image";
import { InputField } from "@shared/ui/Input/InputField";

import styles from "../styles/AddImage.module.scss";

type TAddImage = { imageUrl?: string; setImage: (value: File) => void };

export const AddImage: FC<TAddImage> = props => {
  const { imageUrl = BENEFIT_PLACEHOLDER, setImage } = props;
  const [imageView, setImageView] = useState<string>(imageUrl);

  useEffect(() => {
    setImageView(imageUrl);
  }, [imageUrl]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      setImage(file);

      reader.onloadend = () => {
        setImageView(reader.result as string);
      };

      reader.readAsDataURL(file.slice());
    }
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        srs={imageView || BENEFIT_PLACEHOLDER}
      />

      <InputField
        onChange={handleImageChange}
        placeholder={"Добавить фото"}
        type={"file"}
      />
    </div>
  );
};
