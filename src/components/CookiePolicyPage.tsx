import { Button } from "./ui/button";
import { ArrowLeft, Cookie, Settings, Eye, Database, Shield, Clock, Languages } from "lucide-react";

interface CookiePolicyPageProps {
  language: "de" | "en";
  onBack: () => void;
  onLanguageChange: (language: "de" | "en") => void;
  onLegalClick?: (page: "imprint" | "privacy" | "terms" | "cookies") => void;
}

const translations = {
  de: {
    title: "site under maintenance",
    subtitle: "Informationen über die Verwendung von Cookies auf unserer Website",
    lastUpdated: "Letzte Aktualisierung: 1. Oktober 2024",
    
    whatAreCookies: "Was sind Cookies?",
    whatAreCookiesText: "Cookies sind kleine Textdateien, die von Websites auf Ihrem Gerät (Computer, Tablet oder Mobiltelefon) gespeichert werden, wenn Sie diese besuchen. Sie helfen uns dabei, die Website ordnungsgemäß zu betreiben, sie sicherer zu machen, eine bessere Benutzererfahrung zu bieten und zu verstehen, wie die Website funktioniert und wo wir sie verbessern können.",
    
    typesOfCookies: "Arten von Cookies",
    typesOfCookiesText: "Wir verwenden verschiedene Arten von Cookies auf unserer Website:",
    
    essential: "Notwendige Cookies",
    essentialText: "Diese Cookies sind für das ordnungsgemäße Funktionieren unserer Website erforderlich. Sie ermöglichen grundlegende Funktionen wie Seitennavigation und Zugriff auf sichere Bereiche der Website.",
    essentialExamples: [
      "Sitzungs-IDs für die Anmeldung",
      "Sicherheits-Cookies für den Schutz vor Betrug",
      "Cookies für die Lastverteilung",
      "Sprachauswahl-Cookies"
    ],
    
    functional: "Funktionale Cookies",
    functionalText: "Diese Cookies ermöglichen es der Website, erweiterte Funktionalität und Personalisierung bereitzustellen. Sie können von uns oder von Drittanbietern gesetzt werden, deren Dienste wir zu unseren Seiten hinzugefügt haben.",
    functionalExamples: [
      "Benutzereinstellungen und Präferenzen",
      "Sprachauswahl",
      "Standortinformationen",
      "Formularausfüllungen"
    ],
    
    analytics: "Analyse-Cookies",
    analyticsText: "Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden. Dies hilft uns, die Funktionsweise unserer Website zu verbessern.",
    analyticsExamples: [
      "Besucherzahlen und Traffic-Quellen",
      "Beliebteste Seiten und Funktionen",
      "Verweildauer auf der Website",
      "Fehlerberichte und Performance-Metriken"
    ],
    
    marketing: "Marketing-Cookies",
    marketingText: "Diese Cookies werden verwendet, um Werbung für Sie und Ihre Interessen relevanter zu machen. Sie können auch verwendet werden, um die Anzahl der Anzeigen zu begrenzen und die Wirksamkeit von Werbekampagnen zu messen.",
    marketingExamples: [
      "Werbepräferenzen",
      "Social Media Integration",
      "Remarketing und Retargeting",
      "Kampagnen-Tracking"
    ],
    
    thirdParty: "Drittanbieter-Cookies",
    thirdPartyText: "Wir arbeiten mit vertrauenswürdigen Drittanbietern zusammen, die ebenfalls Cookies auf unserer Website setzen können:",
    thirdPartyList: [
      "Google Analytics - für Website-Analyse",
      "Google Maps - für Standortdienste",
      "Social Media Plugins - für Social Sharing",
      "Zahlungsdienstleister - für sichere Transaktionen"
    ],
    
    manageCookies: "Cookie-Einstellungen verwalten",
    manageCookiesText: "Sie haben die Kontrolle über Cookies und können diese verwalten:",
    manageOptions: [
      "Browser-Einstellungen: Die meisten Browser ermöglichen es Ihnen, Cookies zu blockieren oder zu löschen",
      "Cookie-Banner: Verwenden Sie unser Cookie-Banner, um Ihre Präferenzen festzulegen",
      "Datenschutz-Einstellungen: Besuchen Sie unsere Datenschutz-Einstellungen, um Ihre Auswahl zu ändern",
      "Drittanbieter-Tools: Besuchen Sie die Websites der Drittanbieter, um deren Cookies zu verwalten"
    ],
    
    disabling: "Cookies deaktivieren",
    disablingText: "Sie können Cookies in Ihrem Browser deaktivieren, aber beachten Sie, dass dies die Funktionalität unserer Website beeinträchtigen kann. Einige Bereiche der Website funktionieren möglicherweise nicht ordnungsgemäß, wenn Cookies deaktiviert sind.",
    
    retention: "Speicherdauer",
    retentionText: "Wir bewahren Cookies unterschiedlich lange auf:",
    retentionTypes: [
      "Sitzungs-Cookies: Werden gelöscht, wenn Sie Ihren Browser schließen",
      "Persistente Cookies: Bleiben für einen festgelegten Zeitraum gespeichert (bis zu 2 Jahre)",
      "Notwendige Cookies: Bleiben so lange gespeichert, wie sie für die Funktionalität erforderlich sind",
      "Marketing-Cookies: Werden in der Regel nach 30-90 Tagen gelöscht"
    ],
    
    updates: "Aktualisierungen dieser Richtlinie",
    updatesText: "Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um Änderungen in unseren Praktiken oder aus anderen betrieblichen, rechtlichen oder regulatorischen Gründen zu berücksichtigen. Überprüfen Sie diese Seite regelmäßig, um über unsere Cookie-Praktiken informiert zu bleiben.",
    
    contact: "Kontakt",
    contactText: "Bei Fragen zu unserer Cookie-Richtlinie wenden Sie sich bitte an uns unter cookies@tummle.de",
    
    backToHome: "Zurück zur Startseite"
  },
  en: {
    title: "Cookie Policy",
    subtitle: "Information about the use of cookies on our website",
    lastUpdated: "Last updated: October 1, 2024",
    
    whatAreCookies: "What are Cookies?",
    whatAreCookiesText: "Cookies are small text files that are stored by websites on your device (computer, tablet, or mobile phone) when you visit them. They help us operate the website properly, make it more secure, provide better user experience, and understand how the website performs and where it needs improvement.",
    
    typesOfCookies: "Types of Cookies",
    typesOfCookiesText: "We use different types of cookies on our website:",
    
    essential: "Essential Cookies",
    essentialText: "These cookies are necessary for the proper functioning of our website. They enable basic functions like page navigation and access to secure areas of the website.",
    essentialExamples: [
      "Session IDs for login",
      "Security cookies for fraud protection",
      "Load balancing cookies",
      "Language selection cookies"
    ],
    
    functional: "Functional Cookies",
    functionalText: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.",
    functionalExamples: [
      "User settings and preferences",
      "Language selection",
      "Location information",
      "Form auto-completion"
    ],
    
    analytics: "Analytics Cookies",
    analyticsText: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve how our website works.",
    analyticsExamples: [
      "Visitor counts and traffic sources",
      "Most popular pages and features",
      "Time spent on website",
      "Error reports and performance metrics"
    ],
    
    marketing: "Marketing Cookies",
    marketingText: "These cookies are used to make advertising more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.",
    marketingExamples: [
      "Advertising preferences",
      "Social media integration",
      "Remarketing and retargeting",
      "Campaign tracking"
    ],
    
    thirdParty: "Third-Party Cookies",
    thirdPartyText: "We work with trusted third-party providers who may also set cookies on our website:",
    thirdPartyList: [
      "Google Analytics - for website analysis",
      "Google Maps - for location services",
      "Social Media Plugins - for social sharing",
      "Payment Providers - for secure transactions"
    ],
    
    manageCookies: "Managing Cookie Settings",
    manageCookiesText: "You have control over cookies and can manage them:",
    manageOptions: [
      "Browser Settings: Most browsers allow you to block or delete cookies",
      "Cookie Banner: Use our cookie banner to set your preferences",
      "Privacy Settings: Visit our privacy settings to change your choices",
      "Third-party Tools: Visit third-party websites to manage their cookies"
    ],
    
    disabling: "Disabling Cookies",
    disablingText: "You can disable cookies in your browser, but please note that this may affect the functionality of our website. Some areas of the website may not work properly if cookies are disabled.",
    
    retention: "Retention Period",
    retentionText: "We keep cookies for different periods:",
    retentionTypes: [
      "Session cookies: Deleted when you close your browser",
      "Persistent cookies: Stored for a set period (up to 2 years)",
      "Essential cookies: Kept as long as needed for functionality",
      "Marketing cookies: Usually deleted after 30-90 days"
    ],
    
    updates: "Updates to this Policy",
    updatesText: "We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please check this page regularly to stay informed about our cookie practices.",
    
    contact: "Contact",
    contactText: "If you have any questions about our Cookie Policy, please contact us at cookies@tummle.de",
    
    backToHome: "Back to Homepage"
  }
};

export function CookiePolicyPage({ language, onBack, onLanguageChange, onLegalClick }: CookiePolicyPageProps) {
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
            <span className="hidden sm:inline">{t.backToHome}</span>
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
            <p className="text-lg text-primary/70 mb-2">{t.subtitle}</p>
            <p className="text-sm text-primary/50">{t.lastUpdated}</p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* What are Cookies */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Cookie className="w-6 h-6 text-accent" />
                {t.whatAreCookies}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 leading-relaxed">
                {t.whatAreCookiesText}
              </p>
            </section>

            {/* Types of Cookies */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-secondary" />
                {t.typesOfCookies}
              </h2>
              <p className="text-primary/70 mb-6 leading-relaxed">{t.typesOfCookiesText}</p>
              
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    {t.essential}
                  </h3>
                  <p className="text-primary/70 mb-4 leading-relaxed">{t.essentialText}</p>
                  <ul className="space-y-2">
                    {t.essentialExamples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2 text-primary/70">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Functional Cookies */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    {t.functional}
                  </h3>
                  <p className="text-primary/70 mb-4 leading-relaxed">{t.functionalText}</p>
                  <ul className="space-y-2">
                    {t.functionalExamples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2 text-primary/70">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-600" />
                    {t.analytics}
                  </h3>
                  <p className="text-primary/70 mb-4 leading-relaxed">{t.analyticsText}</p>
                  <ul className="space-y-2">
                    {t.analyticsExamples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2 text-primary/70">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5 text-orange-600" />
                    {t.marketing}
                  </h3>
                  <p className="text-primary/70 mb-4 leading-relaxed">{t.marketingText}</p>
                  <ul className="space-y-2">
                    {t.marketingExamples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2 text-primary/70">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Third Party */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-accent" />
                {t.thirdParty}
              </h2>
              <p className="text-primary/70 mb-4 leading-relaxed">{t.thirdPartyText}</p>
              <ul className="space-y-3">
                {t.thirdPartyList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-primary/70 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-4">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Manage Cookies */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-secondary" />
                {t.manageCookies}
              </h2>
              <p className="text-primary/70 mb-4 leading-relaxed">{t.manageCookiesText}</p>
              <ul className="space-y-3">
                {t.manageOptions.map((option, index) => (
                  <li key={index} className="flex items-start gap-3 text-primary/70 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-lg p-4">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{option}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Disabling */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                {t.disabling}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 leading-relaxed">
                {t.disablingText}
              </p>
            </section>

            {/* Retention */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-accent" />
                {t.retention}
              </h2>
              <p className="text-primary/70 mb-4 leading-relaxed">{t.retentionText}</p>
              <ul className="space-y-3">
                {t.retentionTypes.map((type, index) => (
                  <li key={index} className="flex items-start gap-3 text-primary/70 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-4">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{type}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Updates */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-secondary" />
                {t.updates}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl p-6 leading-relaxed">
                {t.updatesText}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Cookie className="w-6 h-6 text-primary" />
                {t.contact}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 leading-relaxed">
                {t.contactText}
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
                  onClick={() => onLegalClick("imprint")}
                  className="h-12 text-sm border-primary/20 hover:bg-primary/5 touch-manipulation"
                >
                  {language === 'de' ? 'Impressum' : 'Imprint'}
                </Button>
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
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}