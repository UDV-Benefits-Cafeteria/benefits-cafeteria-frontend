import { ChangeEvent, type FC, useState } from "react";

import { useAddImageMutation } from "@entity/User";
import {BENEFIT_PLACEHOLDER} from "@shared/assets/imageConsts"
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { Image } from "@shared/ui/Image/Image";
import { InputField } from "@shared/ui/Input/InputField";

import styles from "../styles/AddImage.module.scss";

type TAddImage = {};

export const AddImage: FC<TAddImage> = () => {
  const [addImage] = useAddImageMutation();
  const { id: userId, image_url: imageUrl } = useAppSelector(state => state.user.data!);
  const [image, setImage] = useState(imageUrl);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(file.slice());

      const a = await addImage({ id: userId, image: file });
    }
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        srs={BENEFIT_PLACEHOLDER}
      />

      <InputField
        disabled={true}
        onChange={handleImageChange}
        placeholder={"Добавить фото"}
        type={"file"}
      />
    </div>
  );
};
