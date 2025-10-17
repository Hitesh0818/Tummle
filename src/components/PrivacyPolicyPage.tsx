import { Button } from "./ui/button";
import { ArrowLeft, Shield, Database, Eye, Lock, UserCheck, Globe, Languages } from "lucide-react";

interface PrivacyPolicyPageProps {
  language: "de" | "en";
  onBack: () => void;
  onLanguageChange: (language: "de" | "en") => void;
  onLegalClick?: (page: "imprint" | "privacy" | "terms" | "cookies") => void;
}

const translations = {
  de: {
    title: "Site under maintenance",
    subtitle: "Informationen zum Datenschutz gemäß DSGVO",
    lastUpdated: "Letzte Aktualisierung: 1. Oktober 2024",
    
    overview: "Übersicht",
    overviewText: "Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten auf unserer Website.",
    
    controller: "Verantwortlicher",
    controllerText: "Verantwortlich für die Datenverarbeitung auf dieser Website ist:\n\nTummle GmbH\nMusterstraße 123\n12345 Berlin, Deutschland\nE-Mail: datenschutz@tummle.de\nTelefon: +49 (0) 30 123456789",
    
    dataCollected: "Welche Daten wir sammeln",
    dataCollectedText: "Wir sammeln verschiedene Arten von Informationen für verschiedene Zwecke, um unseren Service für Sie bereitzustellen und zu verbessern.",
    personalData: "Personenbezogene Daten",
    personalDataText: "Bei der Nutzung unseres Services können wir Sie bitten, uns bestimmte persönlich identifizierbare Informationen zur Verfügung zu stellen, die verwendet werden können, um Sie zu kontaktieren oder zu identifizieren.",
    
    usageData: "Nutzungsdaten",
    usageDataText: "Wir können auch Informationen sammeln, wie auf den Service zugegriffen wird (Nutzungsdaten). Diese Nutzungsdaten können Informationen wie die IP-Adresse Ihres Computers, Browsertyp, Browserversion, die Seiten unseres Services, die Sie besuchen, die Zeit und das Datum Ihres Besuchs, die auf diesen Seiten verbrachte Zeit, eindeutige Geräte-IDs und andere Diagnosedaten enthalten.",
    
    howWeUse: "Wie wir Ihre Daten verwenden",
    howWeUseText: "Tummle verwendet die gesammelten Daten für verschiedene Zwecke:",
    purposes: [
      "Um unseren Service bereitzustellen und zu warten",
      "Um Sie über Änderungen an unserem Service zu benachrichtigen",
      "Um Ihnen zu ermöglichen, an den interaktiven Funktionen unseres Services teilzunehmen, wenn Sie sich dafür entscheiden",
      "Um Kundenbetreuung zu bieten",
      "Um Analysedaten zu sammeln, damit wir unseren Service verbessern können",
      "Um die Nutzung unseres Services zu überwachen",
      "Um technische Probleme zu erkennen, zu verhindern und zu beheben"
    ],
    
    dataSharing: "Datenweitergabe",
    dataSharingText: "Wir geben Ihre persönlichen Daten nicht ohne Ihre Zustimmung an Dritte weiter, außer in den folgenden Fällen:",
    sharingCases: [
      "Zur Erfüllung gesetzlicher Verpflichtungen",
      "Zum Schutz und zur Verteidigung der Rechte oder des Eigentums von Tummle",
      "Zur Verhinderung oder Untersuchung möglicher Fehlverhalten im Zusammenhang mit dem Service",
      "Zum Schutz der persönlichen Sicherheit der Nutzer des Services oder der Öffentlichkeit"
    ],
    
    dataRetention: "Datenaufbewahrung",
    dataRetentionText: "Tummle wird Ihre persönlichen Daten nur so lange aufbewahren, wie es für die in dieser Datenschutzerklärung dargelegten Zwecke erforderlich ist. Wir werden Ihre persönlichen Daten auch aufbewahren und verwenden, soweit dies zur Erfüllung unserer rechtlichen Verpflichtungen erforderlich ist.",
    
    yourRights: "Ihre Rechte",
    yourRightsText: "Sie haben das Recht auf:",
    rights: [
      "Auskunft über Ihre gespeicherten Daten",
      "Berichtigung unrichtiger Daten",
      "Löschung Ihrer Daten",
      "Einschränkung der Datenverarbeitung",
      "Datenübertragbarkeit",
      "Widerspruch gegen die Datenverarbeitung"
    ],
    
    cookies: "Cookies",
    cookiesText: "Unsere Website verwendet Cookies, um Ihre Erfahrung zu verbessern. Sie können Ihre Browser-Einstellungen ändern, um Cookies abzulehnen. Beachten Sie, dass einige Teile unserer Website möglicherweise nicht ordnungsgemäß funktionieren, wenn Sie Cookies deaktivieren.",
    
    contact: "Kontakt",
    contactText: "Bei Fragen zu dieser Datenschutzerklärung wenden Sie sich bitte an uns unter datenschutz@tummle.de",
    
    backToHome: "Zurück zur Startseite"
  },
  en: {
    title: "Privacy Policy",
    subtitle: "Information about data protection according to GDPR",
    lastUpdated: "Last updated: October 1, 2024",
    
    overview: "Overview",
    overviewText: "We take the protection of your personal data very seriously. This privacy policy informs you about the nature, scope and purpose of processing personal data on our website.",
    
    controller: "Data Controller",
    controllerText: "The data controller for data processing on this website is:\n\nTummle GmbH\nMusterstraße 123\n12345 Berlin, Germany\nEmail: privacy@tummle.de\nPhone: +49 (0) 30 123456789",
    
    dataCollected: "What Data We Collect",
    dataCollectedText: "We collect different types of information for various purposes to provide and improve our service to you.",
    personalData: "Personal Data",
    personalDataText: "While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you.",
    
    usageData: "Usage Data",
    usageDataText: "We may also collect information how the service is accessed and used (Usage Data). This Usage Data may include information such as your computer's IP address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.",
    
    howWeUse: "How We Use Your Data",
    howWeUseText: "Tummle uses the collected data for various purposes:",
    purposes: [
      "To provide and maintain our service",
      "To notify you about changes to our service",
      "To allow you to participate in interactive features of our service when you choose to do so",
      "To provide customer support",
      "To gather analysis data so that we can improve our service",
      "To monitor the usage of our service",
      "To detect, prevent and address technical issues"
    ],
    
    dataSharing: "Data Sharing",
    dataSharingText: "We do not share your personal data with third parties without your consent, except in the following cases:",
    sharingCases: [
      "To comply with legal obligations",
      "To protect and defend the rights or property of Tummle",
      "To prevent or investigate possible wrongdoing in connection with the service",
      "To protect the personal safety of users of the service or the public"
    ],
    
    dataRetention: "Data Retention",
    dataRetentionText: "Tummle will retain your personal data only for as long as is necessary for the purposes set out in this privacy policy. We will also retain and use your personal data to the extent necessary to comply with our legal obligations.",
    
    yourRights: "Your Rights",
    yourRightsText: "You have the right to:",
    rights: [
      "Access to your stored data",
      "Rectification of incorrect data",
      "Deletion of your data",
      "Restriction of data processing",
      "Data portability",
      "Object to data processing"
    ],
    
    cookies: "Cookies",
    cookiesText: "Our website uses cookies to improve your experience. You can change your browser settings to reject cookies. Note that some parts of our website may not work properly if you disable cookies.",
    
    contact: "Contact",
    contactText: "If you have any questions about this privacy policy, please contact us at privacy@tummle.de",
    
    backToHome: "Back to Homepage"
  }
};

export function PrivacyPolicyPage({ language, onBack, onLanguageChange, onLegalClick }: PrivacyPolicyPageProps) {
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
            <p className="text-lg text-primary/70 mb-2">{t.subtitle}</p>
            <p className="text-sm text-primary/50">{t.lastUpdated}</p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-accent" />
                {t.overview}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 leading-relaxed">
                {t.overviewText}
              </p>
            </section>

            {/* Controller */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-secondary" />
                {t.controller}
              </h2>
              <div className="bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl p-6">
                {t.controllerText.split('\n').map((line, index) => (
                  <p key={index} className="text-primary/70 mb-1">
                    {line}
                  </p>
                ))}
              </div>
            </section>

            {/* Data Collected */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-accent" />
                {t.dataCollected}
              </h2>
              <p className="text-primary/70 mb-6 leading-relaxed">{t.dataCollectedText}</p>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-2">{t.personalData}</h3>
                  <p className="text-primary/70 leading-relaxed">{t.personalDataText}</p>
                </div>
                
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
                  <h3 className="font-bold text-primary mb-2">{t.usageData}</h3>
                  <p className="text-primary/70 leading-relaxed">{t.usageDataText}</p>
                </div>
              </div>
            </section>

            {/* How We Use */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-secondary" />
                {t.howWeUse}
              </h2>
              <p className="text-primary/70 mb-4 leading-relaxed">{t.howWeUseText}</p>
              <ul className="space-y-3">
                {t.purposes.map((purpose, index) => (
                  <li key={index} className="flex items-start gap-3 text-primary/70 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-lg p-4">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{purpose}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-accent" />
                {t.dataSharing}
              </h2>
              <p className="text-primary/70 mb-4 leading-relaxed">{t.dataSharingText}</p>
              <ul className="space-y-3">
                {t.sharingCases.map((case_, index) => (
                  <li key={index} className="flex items-start gap-3 text-primary/70 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-4">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{case_}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary" />
                {t.dataRetention}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 leading-relaxed">
                {t.dataRetentionText}
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-secondary" />
                {t.yourRights}
              </h2>
              <p className="text-primary/70 mb-4 leading-relaxed">{t.yourRightsText}</p>
              <ul className="space-y-3">
                {t.rights.map((right, index) => (
                  <li key={index} className="flex items-start gap-3 text-primary/70 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-lg p-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{right}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-accent" />
                {t.cookies}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-6 leading-relaxed">
                {t.cookiesText}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-secondary" />
                {t.contact}
              </h2>
              <p className="text-primary/70 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl p-6 leading-relaxed">
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