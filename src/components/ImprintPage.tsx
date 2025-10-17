import { Button } from "./ui/button";
import { ArrowLeft, Building, Mail, Phone, Globe, MapPin, Languages } from "lucide-react";

interface ImprintPageProps {
  language: "de" | "en";
  onBack: () => void;
  onLanguageChange: (language: "de" | "en") => void;
  onLegalClick?: (page: "imprint" | "privacy" | "terms" | "cookies") => void;
}

const translations = {
  de: {
    title: "Impressum",
    subtitle: "Angaben gemäß § 5 TMG",
    companyInfo: "Unternehmensangaben",
    companyName: "Tummle GmbH",
    address: "Musterstraße 123",
    cityPostal: "12345 Berlin, Deutschland",
    contact: "Kontakt",
    email: "info@tummle.de",
    phone: "+49 (0) 30 123456789",
    website: "www.tummle.de",
    managingDirector: "Geschäftsführung",
    directorName: "Max Mustermann",
    registration: "Handelsregister",
    registrationDetails: "Amtsgericht Berlin, HRB 123456B",
    vatId: "Umsatzsteuer-ID",
    vatNumber: "DE123456789",
    responsibleContent: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
    contentResponsible: "Max Mustermann\nMusterstraße 123\n12345 Berlin",
    disclaimer: "Haftungsausschluss",
    disclaimerText: "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.",
    copyright: "Urheberrecht",
    copyrightText: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.",
    backToHome: "Zurück zur Startseite"
  },
  en: {
    title: "Site Under maintenance",
    subtitle: "Information according to § 5 TMG (German Telemedia Act)",
    companyInfo: "Company Information",
    companyName: "Tummle GmbH",
    address: "Musterstraße 123",
    cityPostal: "12345 Berlin, Germany",
    contact: "Contact",
    email: "info@tummle.de",
    phone: "+49 (0) 30 123456789",
    website: "www.tummle.de",
    managingDirector: "Managing Director",
    directorName: "Max Mustermann",
    registration: "Commercial Register",
    registrationDetails: "Local Court Berlin, HRB 123456B",
    vatId: "VAT ID",
    vatNumber: "DE123456789",
    responsibleContent: "Responsible for content according to § 55 Abs. 2 RStV",
    contentResponsible: "Max Mustermann\nMusterstraße 123\n12345 Berlin",
    disclaimer: "Disclaimer",
    disclaimerText: "The contents of our pages have been created with the greatest care. However, we cannot guarantee the accuracy, completeness and timeliness of the content.",
    copyright: "Copyright",
    copyrightText: "The content and works created by the site operators on these pages are subject to German copyright law.",
    backToHome: "Back to Homepage"
  }
};

export function ImprintPage({ language, onBack, onLanguageChange, onLegalClick }: ImprintPageProps) {
  const t = translations[language];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-white via-primary/5 to-secondary/10 safe-area-bottom">
      {/* Header */}
      <header className="w-full sticky top-0 bg-white/95 backdrop-blur-xl border-b border-primary/10 z-50 shadow-lg safe-area-top">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between max-w-4xl">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-primary/5 transition-colors duration-300 min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">{t.backToHome}</span>
          </Button>
          
          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLanguageChange(language === "de" ? "en" : "de")}
            className="relative overflow-hidden group flex items-center gap-2 border-primary/20 hover:bg-primary/5 min-h-[44px] px-3 hover:border-primary/40 transition-all duration-500 hover:shadow-xl rounded-xl touch-manipulation"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Languages className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm uppercase font-medium relative z-10">
              {language === "de" ? "EN" : "DE"}
            </span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 lg:p-12">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-primary/70">{t.subtitle}</p>
          </div>

          {/* Company Information */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <Building className="w-6 h-6 text-accent" />
              {t.companyInfo}
            </h2>
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 space-y-2">
              <p className="font-medium text-primary">{t.companyName}</p>
              <div className="flex items-start gap-2 text-primary/70">
                <MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                <div>
                  <p>{t.address}</p>
                  <p>{t.cityPostal}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-accent" />
              {t.contact}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-2xl p-4 flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary/60">Email</p>
                  <p className="font-medium text-primary">{t.email}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-secondary/5 to-accent/5 rounded-2xl p-4 flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary/60">Telefon</p>
                  <p className="font-medium text-primary">{t.phone}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-4 flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary/60">Website</p>
                  <p className="font-medium text-primary">{t.website}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Information */}
          <div className="space-y-8">
            {/* Managing Director */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">{t.managingDirector}</h3>
              <p className="text-primary/70 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
                {t.directorName}
              </p>
            </section>

            {/* Registration */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">{t.registration}</h3>
              <p className="text-primary/70 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl p-4">
                {t.registrationDetails}
              </p>
            </section>

            {/* VAT ID */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">{t.vatId}</h3>
              <p className="text-primary/70 bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-4">
                {t.vatNumber}
              </p>
            </section>

            {/* Content Responsibility */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">{t.responsibleContent}</h3>
              <div className="text-primary/70 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
                {t.contentResponsible.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">{t.disclaimer}</h3>
              <p className="text-primary/70 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl p-4 leading-relaxed">
                {t.disclaimerText}
              </p>
            </section>

            {/* Copyright */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">{t.copyright}</h3>
              <p className="text-primary/70 bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-4 leading-relaxed">
                {t.copyrightText}
              </p>
            </section>
          </div>

          {/* Back Button */}
          <div className="text-center mt-8 sm:mt-12">
            <Button
              onClick={onBack}
              className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-8 py-3 rounded-2xl transition-all duration-500 shadow-xl hover:shadow-accent/30 transform hover:scale-105 flex items-center gap-2 mx-auto min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-5 h-5" />
              {t.backToHome}
            </Button>
          </div>

          {/* Legal Navigation */}
          {onLegalClick && (
            <div className="mt-8 sm:mt-12 pt-8 border-t border-primary/10">
              <h3 className="text-lg font-bold text-primary mb-4 text-center">
                {language === 'de' ? 'Weitere rechtliche Informationen' : 'Additional Legal Information'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => onLegalClick("privacy")}
                  className="h-12 text-sm border-primary/20 hover:bg-primary/5 touch-manipulation"
                >
                  {language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onLegalClick("terms")}
                  className="h-12 text-sm border-primary/20 hover:bg-primary/5 touch-manipulation"
                >
                  {language === 'de' ? 'AGB' : 'Terms & Conditions'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onLegalClick("cookies")}
                  className="h-12 text-sm border-primary/20 hover:bg-primary/5 touch-manipulation"
                >
                  {language === 'de' ? 'Cookie-Richtlinie' : 'Cookie Policy'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}