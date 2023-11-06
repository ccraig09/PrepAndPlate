import { useState, useEffect } from "react";

export function useGenerateImageUrl(imageId, imageType, size = "636x393") {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (imageId && imageType) {
      setImageUrl(
        `https://spoonacular.com/recipeImages/${imageId}-${size}.${imageType}`
      );
    }
  }, [imageId, imageType]);

  return imageUrl;
}
