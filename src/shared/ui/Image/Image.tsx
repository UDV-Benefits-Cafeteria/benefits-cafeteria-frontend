import { type FC } from "react";

type TImage = {
  srs: string;
  alt?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Image: FC<TImage> = props => {
  const { srs, alt = "" } = props;

  return (
    <img
      loading={"lazy"}
      alt={alt}
      src={srs}
      {...props}
    />
  );
};
