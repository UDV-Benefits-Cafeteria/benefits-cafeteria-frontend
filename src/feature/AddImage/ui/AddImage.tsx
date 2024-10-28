import { ChangeEvent, type FC, useEffect, useState } from "react";

import emptyImage from "@shared/assets/images/Avatar.png";
import { Image } from "@shared/ui/Image/Image";
import { InputField } from "@shared/ui/Input/InputField";

import styles from "../styles/AddImage.module.scss";

type TAddImage = {};

export const AddImage: FC<TAddImage> = () => {
  const [image, setImage] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        srs={image ? image : emptyImage}
      />

      <InputField
        onChange={handleImageChange}
        placeholder={"Добавить фото"}
        type={"file"}
      />
    </div>
  );
};
