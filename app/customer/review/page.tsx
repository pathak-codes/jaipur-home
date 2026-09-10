"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { useDemo } from "../../../lib/demoStore";
import { Avatar } from "../../../components/ui/Avatar";
import { StarIcon, CheckIcon } from "../../../components/ui/icons";

export default function ReviewPage() {
  const { t, lang } = useLanguage();
  const { state, dispatch } = useDemo();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    dispatch({ type: "ADD_REVIEW", rating, comment: review || undefined });
    setSubmitted(true);
    setTimeout(() => router.push("/customer"), 2000);
  }

  if (submitted) {
    return (
      <div className="p-5 max-w-lg mx-auto w-full flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--success)]/10 flex items-center justify-center mb-4">
          <CheckIcon className="w-10 h-10 text-[var(--success)]" />
        </div>
        <h1 className="text-xl font-bold text-[var(--success)]">{t("review_submitted")}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{t("thank_you")}</p>
      </div>
    );
  }

  const provider = state.matchedProvider;

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-[var(--foreground)]">{t("rate_experience")}</h1>
      </div>

      {provider && (
        <Card>
          <div className="p-4 flex items-center gap-4">
            <Avatar src={provider.photo} name={provider.name} size="lg" />
            <div>
              <p className="text-base font-semibold text-[var(--foreground)]">{provider.name}</p>
              <p className="text-sm text-[var(--muted)]">{provider.experienceYears} yrs {t("experience_years")}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="flex flex-col items-center gap-3 py-4">
        <p className="text-sm font-medium text-[var(--muted)]">
          {lang === "en" ? "Tap to rate" : "रेट करने के लिए टैप करें"}
        </p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <StarIcon
                className={`w-8 h-8 ${
                  star <= (hoverRating || rating) ? "text-[var(--primary)]" : "text-[var(--muted)]"
                }`}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-sm text-[var(--muted)]">
            {[lang === "en" ? "Poor" : "खराब", "Fair", "Good", "Very Good", lang === "en" ? "Excellent" : "उत्कृष्ट"][rating - 1]}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--foreground)] block mb-2">
          {t("write_review")}
        </label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          className="w-full px-3 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)] resize-none"
          placeholder={lang === "en" ? "Share your experience (optional)..." : "अपना अनुभव बाँटें (वैकल्पिक)..."}
        />
      </div>

      <Button size="lg" fullWidth onClick={handleSubmit} disabled={rating === 0}>
        {t("submit_review")}
      </Button>
    </div>
  );
}
