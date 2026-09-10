"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "../../../components/ui/icons";
import { DEMO_SERVICES } from "../../../data/demo";
import { PlumbingIcon, ElectricalIcon, ACIcon, CleaningIcon, PaintingIcon } from "../../../components/ui/icons";

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  s1: PlumbingIcon,
  s2: ElectricalIcon,
  s3: ACIcon,
  s4: CleaningIcon,
  s5: PaintingIcon,
};

const STEPS = [
  { id: "personal", label: { en: "Personal Info", hi: "व्यक्तिगत जानकारी" } },
  { id: "phone", label: { en: "Phone + OTP", hi: "फोन + OTP" } },
  { id: "location", label: { en: "Location", hi: "स्थान" } },
  { id: "experience", label: { en: "Experience", hi: "अनुभव" } },
  { id: "skills", label: { en: "Services", hi: "सेवाएं" } },
  { id: "govtid", label: { en: "Government ID", hi: "सरकारी आईडी" } },
  { id: "qualifications", label: { en: "Qualifications", hi: "योग्यता" } },
  { id: "emergency", label: { en: "Emergency Contact", hi: "आपातकालीन संपर्क" } },
  { id: "review", label: { en: "Review", hi: "समीक्षा" } },
];

export default function ProviderRegisterPage() {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    city: "Jaipur",
    area: "",
    address: "",
    experience: "",
    govtIdType: "aadhaar",
    govtIdNumber: "",
    emergencyName: "",
    emergencyPhone: "",
  });

  function updateForm(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSendOtp() {
    setOtpSent(true);
  }

  function handleVerifyOtp() {
    if (form.otp.length === 4) {
      setOtpVerified(true);
    }
  }

  function toggleSkill(id: string) {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleSubmit() {
    router.push("/provider/verify");
  }

  const currentStep = STEPS[step];
  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="min-h-full flex flex-col bg-[var(--background)]">
      <header className="flex items-center px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <button onClick={() => step > 0 ? setStep(step - 1) : router.back()} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--primary)]/10">
          <ChevronLeftIcon className="w-5 h-5 text-[var(--foreground)]" />
        </button>
        <div className="flex-1 text-center pr-10">
          <p className="text-sm font-semibold text-[var(--foreground)]">{t("registration")}</p>
          <p className="text-xs text-[var(--muted)]">{t("step")} {step + 1} {t("of")} {STEPS.length}</p>
        </div>
      </header>

      <main className="flex-1 p-5 max-w-lg mx-auto w-full">
        <div className="flex gap-1.5 mb-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-colors ${
                i <= step ? "bg-[var(--primary)]" : "bg-[var(--border)]"
              }`}
            />
          ))}
        </div>

        {currentStep.id === "personal" && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">{lang === "en" ? "Personal Information" : "व्यक्तिगत जानकारी"}</h2>
              <p className="text-sm text-[var(--muted)] mt-1">{lang === "en" ? "Tell us about yourself" : "अपने बारे में बताएं"}</p>
            </div>
            <Input label={t("full_name")} value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="Ramesh Kumar" />
            <Input label={t("email")} type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="ramesh@email.com" />
          </div>
        )}

        {currentStep.id === "phone" && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">{lang === "en" ? "Phone Number" : "फोन नंबर"}</h2>
              <p className="text-sm text-[var(--muted)] mt-1">{lang === "en" ? "We'll send you an OTP" : "हम आपको OTP भेजेंगे"}</p>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input label={t("phone_number")} type="tel" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="9988776655" />
              </div>
              {!otpSent && (
                <div className="flex items-end">
                  <Button variant="secondary" onClick={handleSendOtp}>{t("send_otp")}</Button>
                </div>
              )}
            </div>
            {otpSent && !otpVerified && (
              <>
                <Input label={t("enter_otp")} value={form.otp} onChange={(e) => updateForm("otp", e.target.value.slice(0, 4))} placeholder="1234" maxLength={4} />
                <button onClick={handleVerifyOtp} className="text-xs text-[var(--primary)]">{t("resend_otp")}</button>
                {form.otp.length === 4 && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/20">
                    <CheckIcon className="w-4 h-4 text-[var(--success)]" />
                    <span className="text-sm text-[var(--success)]">{lang === "en" ? "OTP Verified (demo)" : "OTP सत्यापित (डेमो)"}</span>
                  </div>
                )}
              </>
            )}
            {otpVerified && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/20">
                <CheckIcon className="w-4 h-4 text-[var(--success)]" />
                <span className="text-sm text-[var(--success)]">{t("otp_verified")}</span>
              </div>
            )}
          </div>
        )}

        {currentStep.id === "location" && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">{lang === "en" ? "Your Location" : "आपका स्थान"}</h2>
              <p className="text-sm text-[var(--muted)] mt-1">{lang === "en" ? "Where do you operate?" : "आप कहाँ काम करते हैं?"}</p>
            </div>
            <Input label={t("city")} value={form.city} onChange={(e) => updateForm("city", e.target.value)} />
            <Input label={t("area")} value={form.area} onChange={(e) => updateForm("area", e.target.value)} placeholder={lang === "en" ? "Vaishali Nagar" : "वैशाली नगर"} />
            <Input label={t("full_address")} value={form.address} onChange={(e) => updateForm("address", e.target.value)} placeholder={lang === "en" ? "42, Street, Area" : "42, गली, क्षेत्र"} />
          </div>
        )}

        {currentStep.id === "experience" && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">{t("work_experience")}</h2>
              <p className="text-sm text-[var(--muted)] mt-1">{lang === "en" ? "How long have you been working?" : "आप कितने समय से काम कर रहे हैं?"}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["1-2", "3-5", "6-10", "10+"].map((yrs) => (
                <button
                  key={yrs}
                  onClick={() => updateForm("experience", yrs)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                    form.experience === yrs
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface)]"
                  }`}
                >
                  {yrs} {yrs === "10+" ? "yrs+" : "yrs"}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep.id === "skills" && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">{t("select_services")}</h2>
              <p className="text-sm text-[var(--muted)] mt-1">{lang === "en" ? "Choose the services you offer" : "वे सेवाएं चुनें जो आप प्रदान करते हैं"}</p>
            </div>
            <div className="flex flex-col gap-3">
              {DEMO_SERVICES.map((service) => {
                const IconComponent = SERVICE_ICONS[service.id] ?? PlumbingIcon;
                const selected = selectedSkills.includes(service.id);
                return (
                  <Card
                    key={service.id}
                    interactive
                    onClick={() => toggleSkill(service.id)}
                    className={selected ? "border-[var(--primary)] bg-[var(--primary)]/5" : ""}
                  >
                    <div className="p-4 flex items-center gap-4">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selected ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border)]"
                      }`}>
                        {selected && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>
                      <div className="w-8 h-8 text-[var(--foreground)]">
                        <IconComponent className="w-full h-full" />
                      </div>
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        {lang === "hi" ? service.name_hi : service.name_en}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {currentStep.id === "govtid" && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">{t("government_id")}</h2>
              <p className="text-sm text-[var(--muted)] mt-1">{lang === "en" ? "Required for verification" : "सत्यापन के लिए आवश्यक"}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["aadhaar", "pan"].map((type) => (
                <button
                  key={type}
                  onClick={() => updateForm("govtIdType", type)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                    form.govtIdType === type
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "border-[var(--border)] text-[var(--foreground)]"
                  }`}
                >
                  {type === "aadhaar" ? t("aadhaar") : t("pan")}
                </button>
              ))}
            </div>
            <Input label={t("id_number")} value={form.govtIdNumber} onChange={(e) => updateForm("govtIdNumber", e.target.value)} placeholder={form.govtIdType === "aadhaar" ? "XXXX XXXX XXXX" : "ABCDE1234F"} />
            <div className="p-4 rounded-xl border border-dashed border-[var(--primary)]/30 bg-[var(--primary)]/5 text-center">
              <p className="text-sm text-[var(--muted)]">{t("upload_id")}</p>
              <p className="text-xs text-[var(--muted)] mt-1">(DEMO — simulated upload)</p>
            </div>
          </div>
        )}

        {currentStep.id === "qualifications" && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">{t("qualifications")}</h2>
              <p className="text-sm text-[var(--muted)] mt-1">{lang === "en" ? "Optional certificates or training" : "वैकल्पिक प्रमाणपत्र या प्रशिक्षण"}</p>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-[var(--primary)]/30 bg-[var(--primary)]/5 text-center">
              <p className="text-sm text-[var(--muted)]">{t("upload_certificates")}</p>
              <p className="text-xs text-[var(--muted)] mt-1">(DEMO — simulated upload)</p>
            </div>
          </div>
        )}

        {currentStep.id === "emergency" && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">{t("emergency_contact")}</h2>
              <p className="text-sm text-[var(--muted)] mt-1">{lang === "en" ? "Someone we can contact if needed" : "कोई जिसे आवश्यकता पड़ने पर संपर्क किया जा सके"}</p>
            </div>
            <Input label={t("emergency_name")} value={form.emergencyName} onChange={(e) => updateForm("emergencyName", e.target.value)} placeholder="Sita Devi" />
            <Input label={t("emergency_phone")} type="tel" value={form.emergencyPhone} onChange={(e) => updateForm("emergencyPhone", e.target.value)} placeholder="9876543210" />
          </div>
        )}

        {currentStep.id === "review" && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">{t("review_submit")}</h2>
              <p className="text-sm text-[var(--muted)] mt-1">{lang === "en" ? "Confirm your information" : "अपनी जानकारी की पुष्टि करें"}</p>
            </div>
            <Card className="p-4">
              <div className="space-y-3">
                {[
                  { label: t("full_name"), value: form.name || "—" },
                  { label: t("email"), value: form.email || "—" },
                  { label: t("phone_number"), value: form.phone || "—" },
                  { label: t("city"), value: form.city || "—" },
                  { label: t("area"), value: form.area || "—" },
                  { label: t("work_experience"), value: form.experience ? `${form.experience} yrs` : "—" },
                  { label: t("skills"), value: selectedSkills.length > 0 ? selectedSkills.map(id => DEMO_SERVICES.find(s => s.id === id)?.name_en).join(", ") : "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-xs text-[var(--muted)]">{label}</span>
                    <span className="text-xs font-medium text-[var(--foreground)]">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)} className="flex-1 border-[var(--primary)]/20 text-[var(--primary)] hover:bg-[var(--primary)]/5">
              {t("back")}
            </Button>
          )}
          <Button
            onClick={() => isLastStep ? handleSubmit() : setStep(step + 1)}
            className="flex-1 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white shadow-md shadow-[var(--primary)]/20"
          >
            {isLastStep ? t("submit_verification") : t("next")}
            {!isLastStep && <ChevronRightIcon className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </main>
    </div>
  );
}
