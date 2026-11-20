import { useState } from 'react';

// Shows the meal photo, or a text fallback when it is missing or fails to load.
export default function MealImage({ meal, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!meal.image || failed) {
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={`No photo yet for ${meal.name}`}>
        Photo coming soon
      </div>
    );
  }

  return (
    <img
      className={className}
      src={meal.image}
      alt={meal.imageAlt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
